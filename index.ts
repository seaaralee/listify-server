import { createMergeableStore } from 'tinybase'; // buat store TinyBase
import { createDurableObjectStoragePersister } from 'tinybase/persisters/persister-durable-object-storage'; // persister untuk Durable Object storage
import { WsServerDurableObject } from 'tinybase/synchronizers/synchronizer-ws-server-durable-object'; // class DO TinyBase + WS

/* ======================================================
   DURABLE OBJECT: TinyBase Database + WebSocket Server
   ====================================================== */
export class GroceriesDurableObject extends WsServerDurableObject {
    private store: any; // menyimpan instance TinyBase store
    private persister: any; // menyimpan persister DO

    constructor(ctx: DurableObjectState, env: any) {
        super(ctx, env); // panggil konstruktor parent

        this.store = createMergeableStore(); // inisialisasi store
        this.persister = createDurableObjectStoragePersister(this.store, this.ctx.storage); // buat persister

        // Load data dulu
        this.init(); // mulai load dan autosave
    }

    private async init() {
        await this.persister.load(); // load dulu dari storage
        this.persister.startAutoSave(); // mulai autosave
    }

    createPersister() {
        return this.persister; // expose persister
    }

    async fetch(request: Request): Promise<Response> {
        const url = new URL(request.url); // parse URL

        // Endpoint baru untuk mengambil data mentah (JSON) dari Store ini
        if (url.pathname.endsWith('/index-data')) {
            await this.persister.load();
            const tables = this.store.getTables();
            const values = this.store.getValues();
            return new Response(JSON.stringify({ tables, values }), {
                headers: { 'content-type': 'application/json' },
            });
        }

        if (url.pathname.endsWith('/debug')) {
            await this.persister.load(); // pastikan data ter-load
            const tables = this.store.getTables(); // ambil semua tabel

            // ambil tabel/tumpukan yang mungkin ada
            const lists = (tables["lists"] ?? {}); 
            const products = (tables["products"] ?? {}); 
            const values = (tables["values"] ?? {}); 

            // usersMap: kumpulkan userId yang kita temukan
            const usersMap: Record<string, { userId: string; emailOrNick: string }> = {};

            // 1. Kumpulkan User dari Products Collaborators (jika ada)
            if ((products as any).collaborators && typeof (products as any).collaborators === 'object') {
                for (const userId of Object.keys((products as any).collaborators)) {
                    usersMap[userId] = { userId, emailOrNick: ((products as any).collaborators[userId] as any)?.nickname ?? '-' };
                }
            }

            // 2. Kumpulkan User dari Products createdBy
            for (const [prodId, prod] of Object.entries(products)) {
                if (prodId === 'collaborators') continue; 
                const createdBy = (prod as any).createdBy ?? null; 
                if (createdBy && !usersMap[createdBy]) {
                    usersMap[createdBy] = { userId: createdBy, emailOrNick: '-' };
                }
            }

            // 3. Kumpulkan User dari tabel users eksplisit (jika ada)
            if (tables['users']) {
                for (const [uId, uRow] of Object.entries(tables['users'] as any)) {
                    usersMap[uId] = { userId: uId, emailOrNick: (uRow as any).email ?? (uRow as any).nickname ?? '-' };
                }
            }
            
            // BUILD shoppingLists
            const shoppingLists: Array<{ listId: string; userId: string; name: string; createdAt?: any; updatedAt?: any; collaborators?: any }> = [];

            // --- Logika Parsing Data List dari lists table (menggunakan valuesCopy) ---
            for (const [listId, listRow] of Object.entries(lists)) {
                let listMetadata: any = {};
                let listCollaborators: any = {};
                let listName = '-';
                let listOwner = 'unknown';

                try {
                    if ((listRow as any).valuesCopy) {
                        const parsedCopy = JSON.parse((listRow as any).valuesCopy);
                        
                        listMetadata = parsedCopy.values || {};
                        listCollaborators = parsedCopy.tables?.collaborators || {};
                    }
                } catch (e) {
                    // Fallback jika parsing valuesCopy gagal
                    listMetadata = listRow; 
                    listCollaborators = (listRow as any).collaborators || {};
                }

                // Ambil data yang diperlukan
                listName = listMetadata.name ?? (listRow as any).name ?? '-';
                listOwner = listMetadata.createdBy ?? listMetadata.userId ?? Object.keys(listCollaborators)[0] ?? 'unknown';

                // Daftarkan collaborators dari list ini ke usersMap
                for (const [collabId, collabData] of Object.entries(listCollaborators)) {
                    if (!usersMap[collabId]) {
                        usersMap[collabId] = { userId: collabId, emailOrNick: (collabData as any).nickname ?? '-' };
                    }
                }

                if (listOwner && !usersMap[listOwner]) usersMap[listOwner] = { userId: listOwner, emailOrNick: '-' };

                shoppingLists.push({
                    listId,
                    userId: listOwner,
                    name: listName,
                    createdAt: listMetadata.createdAt ?? (listRow as any).createdAt ?? null,
                    updatedAt: listMetadata.updatedAt ?? (listRow as any).updatedAt ?? null,
                    collaborators: listCollaborators
                });
            }

            // --- Logika BUILD shoppingLists dari values (jika ada) ---
            for (const [vId, vRow] of Object.entries(values)) {
                const listId = (vRow as any).listId ?? (vRow as any).id ?? null;
                if (listId && !shoppingLists.find(l => l.listId === listId)) {
                    const owner = (vRow as any).createdBy ?? (vRow as any).userId ?? Object.keys((vRow as any).collaborators ?? {})[0] ?? 'unknown';
                    if (owner && !usersMap[owner]) usersMap[owner] = { userId: owner, emailOrNick: '-' };
                    shoppingLists.push({
                        listId,
                        userId: owner,
                        name: (vRow as any).name ?? '-',
                        createdAt: (vRow as any).createdAt ?? null,
                        updatedAt: (vRow as any).updatedAt ?? null,
                        collaborators: (vRow as any).collaborators ?? {}
                    });
                }
            }
            
            // --- Logika BUILD items dari products ---
            const items: Array<{ itemId: string; listId: string | null; name: string; isPurchased: boolean; createdBy?: string; createdAt?: any; updatedAt?: any; quantity?: any; units?: any; notes?: any; category?: any }> = [];

            const ownerToFirstListId: Record<string, string> = {};
            for (const l of shoppingLists) {
                if (l.userId && !ownerToFirstListId[l.userId]) ownerToFirstListId[l.userId] = l.listId;
            }
            const valuesFallbackListId = (values as any).listId ?? null;

            for (const [itemId, itemRow] of Object.entries(products)) {
                if (itemId === 'collaborators') continue; 

                let listId = (itemRow as any).listId ?? (itemRow as any).shoppingListId ?? null;
                if (!listId && valuesFallbackListId) listId = valuesFallbackListId;
                const createdBy = (itemRow as any).createdBy ?? null;
                if (!listId && createdBy && ownerToFirstListId[createdBy]) {
                    listId = ownerToFirstListId[createdBy];
                }

                if (createdBy && !usersMap[createdBy]) usersMap[createdBy] = { userId: createdBy, emailOrNick: '-' };

                items.push({
                    itemId,
                    listId,
                    name: (itemRow as any).name ?? (itemRow as any).title ?? '-',
                    isPurchased: !!(itemRow as any).isPurchased,
                    createdBy,
                    createdAt: (itemRow as any).createdAt ?? null,
                    updatedAt: (itemRow as any).updatedAt ?? null,
                    quantity: (itemRow as any).quantity ?? null,
                    units: (itemRow as any).units ?? null,
                    notes: (itemRow as any).notes ?? '',
                    category: (itemRow as any).category ?? ''
                });
            }

            /* ======================================================
               RENDER HTML
               ====================================================== */
            let html = `
            <html>
                <head>
                    <title>Debug TinyBase - Tables</title>
                    <style>
                        body { font-family: system-ui; padding: 20px; line-height: 1.4; }
                        table { border-collapse: collapse; width: 100%; margin-bottom: 24px; }
                        td, th { border: 1px solid #ddd; padding: 8px; vertical-align: top; }
                        th { background: #f6f6f6; text-align: left; }
                        caption { font-weight: bold; margin-bottom: 6px; text-align: left; }
                        pre { white-space: pre-wrap; margin: 0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <h1>📦 TinyBase Debug View (Tabel)</h1>
            `;

            // TABEL ShoppingList
            html += `<table aria-label="ShoppingList"><caption>ShoppingList</caption><thead><tr><th>listId</th><th>userId (owner)</th><th>name</th><th>collaborators</th><th>createdAt / updatedAt</th></tr></thead><tbody>`;
            if (shoppingLists.length === 0) {
                html += `<tr><td colspan="5"><em>kosong</em></td></tr>`;
            } else {
                for (const l of shoppingLists) {
                    const collabText = l.collaborators && Object.keys(l.collaborators).length > 0
                        ? `<pre>${JSON.stringify(l.collaborators, null, 2)}</pre>`
                        : `<em>-</em>`;
                    html += `
                    <tr>
                      <td>${l.listId}</td>
                      <td>${l.userId}</td>
                      <td>${l.name}</td>
                      <td>${collabText}</td>
                      <td>${l.createdAt ?? '-'}<br/>${l.updatedAt ?? '-'}</td>
                    </tr>`;
                }
            }
            html += `</tbody></table>`;

            // TABEL Items (gabungan products)
            html += `<table aria-label="Items"><caption>Items (Products)</caption><thead><tr><th>itemId</th><th>listId</th><th>name</th><th>isPurchased</th><th>createdBy</th><th>qty / units</th><th>notes / category</th></tr></thead><tbody>`;
            if (items.length === 0) {
                html += `<tr><td colspan="7"><em>kosong</em></td></tr>`;
            } else {
                for (const it of items) {
                    html += `
                    <tr>
                      <td>${it.itemId}</td>
                      <td>${it.listId ?? ''}</td>
                      <td>${it.name}</td>
                      <td>${it.isPurchased}</td>
                      <td>${it.createdBy ?? '-'}</td>
                      <td>${it.quantity ?? '-'} ${it.units ?? ''}</td>
                      <td><pre>${JSON.stringify({ notes: it.notes, category: it.category }, null, 2)}</pre></td>
                    </tr>`;
                }
            }
            html += `</tbody></table>`;

            // TABEL Users
            html += `<table aria-label="Users"><caption>Users</caption><thead><tr><th>userId</th><th>email / nickname</th></tr></thead><tbody>`;
            const usersArr = Object.values(usersMap);
            if (usersArr.length === 0) {
                html += `<tr><td colspan="2"><em>kosong</em></td></tr>`;
            } else {
                for (const u of usersArr) {
                    html += `
                    <tr>
                      <td>${u.userId}</td>
                      <td>${u.emailOrNick}</td>
                    </tr>`;
                }
            }
            html += `</tbody></table>`;

            // RAW Tables
            const tableNames = Object.keys(tables || {});
            for (const name of tableNames) {
                const rows = (tables as any)[name];
                const entries = Object.entries(rows ?? {});
                html += `<h3>Raw Table: ${name}</h3><table><thead><tr><th>ID</th><th>Data</th></tr></thead><tbody>`;
                if (entries.length === 0) {
                    html += `<tr><td colspan="2"><em>kosong</em></td></tr>`;
                } else {
                    for (const [id, value] of entries) {
                        html += `
                        <tr>
                          <td>${id}</td>
                          <td><pre>${JSON.stringify(value, null, 2)}</pre></td>
                        </tr>`;
                    }
                }
                htmlHtml += `</tbody></table>`;
            }

            html += `</body></html>`;
            return new Response(html, {
                headers: { 'content-type': 'text/html; charset=utf-8' },
            });
        }

        return super.fetch(request);
    }
}

/* ======================================================
   Worker Entry - Debug View (dengan perbaikan formatting)
   ====================================================== */
export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext) {
    const url = new URL(request.url);
    const upgrade = request.headers.get("Upgrade");

    // Utility: pad number
    const pad = (n: number) => String(n).padStart(2, "0");

    // Utility: format ISO -> YYYY/MM/DD GMT+7 (only date part as requested)
    function formatToYMD_GMT7(iso?: string | null) {
      if (!iso) return "-";
      const ms = Date.parse(iso);
      if (isNaN(ms)) return "-";
      // Add 7 hours (in ms) to get GMT+7 date
      const d = new Date(ms + 7 * 3600 * 1000);
      const y = d.getUTCFullYear();
      const m = pad(d.getUTCMonth() + 1);
      const dd = pad(d.getUTCDate());
      return `${y}/${m}/${dd} GMT+7`;
    }

    // Utility: pretty-print top-level object with blank line between entries
    function prettyPrintTopLevel(obj: Record<string, any>) {
      const keys = Object.keys(obj);
      if (keys.length === 0) return "{\n\n}";
      const parts = keys.map((k) => {
        const v = obj[k];
        const vStr = JSON.stringify(v, null, 2);
        // Indent vStr by two spaces for nicer top-level representation
        const indented = vStr
          .split("\n")
          .map((line) => "  " + line)
          .join("\n");
        return `  "${k}": ${indented.replace(/^  /, "")}`; // top-level key line keep normal
      });
      // Join with comma + blank line between top-level members
      return `{\n${parts.join(",\n\n")}\n}`;
    }

    // =======================================================
    // GLOBAL DEBUG VIEW (Endpoint: /debug)
    // =======================================================
    if (url.pathname === "/debug") {
      const INDEX_STORE_ID = "main";
      const indexObj = env.GroceriesDurableObjects.get(
        env.GroceriesDurableObjects.idFromName(INDEX_STORE_ID)
      );

      const indexResponse = await indexObj.fetch(
        new Request(url.origin + "/main/index-data")
      );

      if (!indexResponse.ok) {
        return new Response(
          "❌ Gagal mengambil List Index dari Store 'main'.",
          { status: 500 }
        );
      }

      const indexData = await indexResponse.json();
      const listsTable = indexData.tables?.lists || {};
      const listIds = Object.keys(listsTable);

      // collectors
      const allUsersMap: Record<string, { userId: string; nickname: string }> =
        {};
      const allShoppingLists: Array<any> = [];
      const allItems: Array<any> = [];
      const allRawTables: {
        users: Record<string, any>;
        shoppinglist: Record<string, any>;
        items: Record<string, any>;
      } = { users: {}, shoppinglist: {}, items: {} };

      // Iterate each list id from index
      for (const listId of listIds) {
        // skip internal stores
        if (listId.startsWith("shoppingListsStore-")) continue;

        const listObj = env.GroceriesDurableObjects.get(
          env.GroceriesDurableObjects.idFromName(listId)
        );

        const listResponse = await listObj.fetch(
          new Request(url.origin + `/${listId}/index-data`)
        );

        if (!listResponse.ok) continue;

        const listData = await listResponse.json();

        // Parse valuesCopy from index (metadata)
        const rawString = listsTable[listId]?.valuesCopy || "{}";
        let parsedMetadata: any = {};
        try {
          parsedMetadata = JSON.parse(rawString);
        } catch (e) {
          parsedMetadata = {};
        }

        // Extract collaborators & products from parsed metadata (valuesCopy)
        const collaborators = parsedMetadata?.tables?.collaborators || {};
        const products = parsedMetadata?.tables?.products || {};
        const listName = parsedMetadata?.values?.name ?? "Tanpa Nama";
        const ownerId = Object.keys(collaborators)[0] || "unknown";

        // Save shopping list metadata
        allShoppingLists.push({
          listId,
          name: listName,
          ownerId,
          collaborators,
          createdAt: parsedMetadata?.values?.createdAt,
          updatedAt: parsedMetadata?.values?.updatedAt,
        });

        // Build users map from collaborators (nickname + id)
        for (const [uid, data] of Object.entries(collaborators)) {
          if (!allUsersMap[uid]) {
            allUsersMap[uid] = {
              userId: uid,
              nickname: (data as any).nickname ?? "Unknown",
            };
          }
          // Save raw per-user as-is (will pretty-print later)
          allRawTables.users[uid] = data;
        }

        // Collect items (flattened)
        for (const [itemId, item] of Object.entries(products)) {
          // ensure fields exist
          const it = item as any;
          allItems.push({
            listId,
            listName,
            itemId,
            name: it.name ?? "",
            isPurchased: it.isPurchased ?? false,
            createdBy: it.createdBy ?? "-",
            quantity: it.quantity ?? "-",
            units: it.units ?? "",
            notes: it.notes ?? "",
            category: it.category ?? "",
            createdAt: it.createdAt,
            updatedAt: it.updatedAt,
          });
        }

        // Save parsed raw shoppinglist and items for "Raw JSON"
        allRawTables.shoppinglist[listId] = parsedMetadata;
        allRawTables.items[listId] = products;
      } // end for listIds

      // =======================================================
      // RENDER HTML (with requested layout & formatting)
      // =======================================================
      const style = `
        body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; padding: 18px; color: #111; }
        h1 { border-bottom: 2px solid #e6e6e6; padding-bottom: 8px; margin-bottom: 14px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 18px; }
        th, td { border: 1px solid #e8e8e8; padding: 8px 10px; vertical-align: top; }
        th { background: #fbfbfb; text-align: left; font-weight: 700; }
        tr:nth-child(even) td { background: #fbfcfd; }
        pre { background: #f7f7f8; padding: 10px; border-radius: 6px; overflow-x: auto; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace; font-size: 13px; margin:0;}
        .section { margin-top: 18px; margin-bottom: 8px; }
        .muted { color: #666; font-size: 13px; }
      `;

      let htmlBody = `<h1>📊 GLOBAL DEBUG TINYBASE</h1>`;

      // ====== USERS ======
      htmlBody += `<div class="section"><h2>USERS</h2></div>`;
      htmlBody += `
        <table aria-label="Users">
          <thead><tr><th>User ID</th><th>Nickname</th></tr></thead>
          <tbody>
      `;

      const usersArr = Object.values(allUsersMap);
      if (!usersArr.length) {
        htmlBody += `<tr><td colspan="2" class="muted"><em>kosong</em></td></tr>`;
      } else {
        for (const u of usersArr) {
          htmlBody += `<tr><td>${u.userId}</td><td>${u.nickname}</td></tr>`;
        }
      }
      htmlBody += `</tbody></table>`;

      // ====== SHOPPING LIST ======
      htmlBody += `<div class="section"><h2>SHOPPING LIST</h2></div>`;
      htmlBody += `
        <table aria-label="ShoppingList">
          <thead>
            <tr>
              <th>List ID</th>
              <th>Nama</th>
              <th>Owner</th>
              <th>Collaborators</th>
              <th>Created / Updated</th>
            </tr>
          </thead>
          <tbody>
      `;

      if (!allShoppingLists.length) {
        htmlBody += `<tr><td colspan="5" class="muted"><em>kosong</em></td></tr>`;
      } else {
        for (const l of allShoppingLists) {
          const ownerNick = allUsersMap[l.ownerId]?.nickname ?? l.ownerId;
          const ownerDisplay = `${ownerNick} (${l.ownerId})`;

          const collabIds = Object.keys(l.collaborators || {});
          const collabsDisplay =
            collabIds.length === 0
              ? "-"
              : collabIds
                  .map((id) => allUsersMap[id]?.nickname ?? id)
                  .join(", ");

          const createdFmt = formatToYMD_GMT7(l.createdAt);
          const updatedFmt = formatToYMD_GMT7(l.updatedAt);

          htmlBody += `
            <tr>
              <td>${l.listId}</td>
              <td><strong>${l.name}</strong></td>
              <td>${ownerDisplay}</td>
              <td>${collabsDisplay}</td>
              <td>${createdFmt}<br/>${updatedFmt}</td>
            </tr>
          `;
        }
      }

      htmlBody += `</tbody></table>`;

      // ====== ITEMS PER LIST ======
      htmlBody += `<div class="section"><h2>ITEMS PER LIST</h2></div>`;

      // Group items by listId (and also find listName and owner for each group)
      const grouped: Record<
        string,
        { listName: string; ownerId: string; items: any[] }
      > = {};

      for (const l of allShoppingLists) {
        grouped[l.listId] = { listName: l.name, ownerId: l.ownerId, items: [] };
      }
      for (const it of allItems) {
        if (!grouped[it.listId]) {
          grouped[it.listId] = { listName: it.listName ?? it.listId, ownerId: "unknown", items: [] };
        }
        grouped[it.listId].items.push(it);
      }

      // Render each group; for each group we will rowspan owner/listId cells
      for (const listId of Object.keys(grouped)) {
        const grp = grouped[listId];
        const items = grp.items;
        if (!items || items.length === 0) {
          // still show header: list name
          htmlBody += `<h3>${grp.listName} (${listId}) — <span class="muted">no items</span></h3>`;
          continue;
        }

        htmlBody += `<h3>${grp.listName}</h3>`;
        htmlBody += `
          <table aria-label="Items-${listId}">
            <thead>
              <tr>
                <th>Owner</th>
                <th>List ID</th>
                <th>Item ID</th>
                <th>Name</th>
                <th>Purchased</th>
                <th>Qty / Units</th>
                <th>Notes / Category</th>
              </tr>
            </thead>
            <tbody>
        `;

        const ownerNick = allUsersMap[grp.ownerId]?.nickname ?? grp.ownerId;
        const ownerDisplay = `${ownerNick} (${grp.ownerId})`;

        for (let i = 0; i < items.length; i++) {
          const it = items[i];
          const purchased =
            it.isPurchased === true || it.isPurchased === "true" ? "✅" : "❌";

          const notesCategoryObj = {
            notes: it.notes ?? "",
            category: it.category ?? "",
          };
          const notesCategoryCompact = JSON.stringify(notesCategoryObj);

          htmlBody += `<tr>`;

          // Owner + List ID columns with rowspan on first row only
          if (i === 0) {
            htmlBody += `<td rowspan="${items.length}">${ownerDisplay}</td>`;
            htmlBody += `<td rowspan="${items.length}">${listId}</td>`;
          }

          htmlBody += `
              <td>${it.itemId}</td>
              <td><strong>${it.name}</strong></td>
              <td>${purchased}</td>
              <td>${it.quantity ?? "-"} ${it.units ?? ""}</td>
              <td><pre style="margin:0;">${notesCategoryCompact}</pre></td>
          </tr>`;
        }

        htmlBody += `</tbody></table>`;
      }

      // ====== RAW PARSED JSON (prettified, with blank line between top-level entries) ======
      htmlBody += `<div class="section"><h2>RAW PARSED JSON</h2></div>`;

      // Users raw: allRawTables.users is object keyed by uid
      htmlBody += `<h3>Users</h3><pre>${prettyPrintTopLevel(
        allRawTables.users
      )}</pre>`;

      // Shoppinglists raw: allRawTables.shoppinglist keyed by listId
      htmlBody += `<h3>Shopping Lists</h3><pre>${prettyPrintTopLevel(
        allRawTables.shoppinglist
      )}</pre>`;

      // Items raw: allRawTables.items keyed by listId
      htmlBody += `<h3>Items</h3><pre>${prettyPrintTopLevel(
        allRawTables.items
      )}</pre>`;

      const finalHtml = `<!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Debug TinyBase - Global View</title>
            <style>${style}</style>
          </head>
          <body>
            ${htmlBody}
          </body>
        </html>`;

      return new Response(finalHtml, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    } // end if /debug

    // =======================================================
    // ROUTING STANDAR (WS & Individual Debug)
    // =======================================================
    const pathSegments = url.pathname.split("/").filter(Boolean);
    let storeId = "main";

    if (pathSegments.length > 0) {
      const last = pathSegments.at(-1);
      storeId =
        last === "index-data" || last === "debug"
          ? pathSegments.at(-2) ?? "main"
          : last;
    }

    const id = env.GroceriesDurableObjects.idFromName(storeId);
    const obj = env.GroceriesDurableObjects.get(id);

    if (url.pathname.endsWith("/debug") || url.pathname.endsWith("/index-data")) {
      return obj.fetch(request);
    }

    if (upgrade?.toLowerCase() === "websocket") {
      return obj.fetch(request);
    }

    return new Response("TinyBase WebSocket server running...", {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
};
