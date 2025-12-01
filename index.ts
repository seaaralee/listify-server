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

	/* ======================================================
	   DEBUG HTML (ditampilkan dalam bentuk tabel HTML)
	   - gabungkan lists + values menjadi ShoppingList
	   - gabungkan products menjadi Items
	   - isi listId item dengan fallback: item.listId -> values.listId -> infer dari createdBy
	   - hapus ShareList (pakai collaborators di ShoppingList)
	   ====================================================== */
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url); // parse URL

		if (url.pathname === '/debug') {
			await this.persister.load(); // pastikan data ter-load
			const tables = this.store.getTables(); // ambil semua tabel

			// ambil tabel/tumpukan yang mungkin ada
			const lists = (tables["lists"] ?? {}); // tabel lists (bila ada)
			const products = (tables["products"] ?? {}); // tabel products (items)
			const values = (tables["values"] ?? {}); // kadang metadata list ada di sini

			// usersMap: kumpulkan userId yang kita temukan (dari createdBy & collaborators)
			const usersMap: Record<string, { userId: string; emailOrNick: string }> = {};

			// jika products memiliki node collaborators di root, daftarkan usernya
			if ((products as any).collaborators && typeof (products as any).collaborators === 'object') {
				for (const userId of Object.keys((products as any).collaborators)) {
					usersMap[userId] = { userId, emailOrNick: ((products as any).collaborators[userId] as any)?.nickname ?? '-' };
				}
			}

			// dari products ambil createdBy untuk register user (email belum tersedia di data)
			for (const [prodId, prod] of Object.entries(products)) {
				if (prodId === 'collaborators') continue; // skip node collaborators
				const createdBy = (prod as any).createdBy ?? null; // creator id kalau ada
				if (createdBy && !usersMap[createdBy]) {
					usersMap[createdBy] = { userId: createdBy, emailOrNick: '-' };
				}
			}

			// juga cek apakah ada tabel users eksplisit (kalau ada, masukkan email)
			if (tables['users']) {
				for (const [uId, uRow] of Object.entries(tables['users'] as any)) {
					usersMap[uId] = { userId: uId, emailOrNick: (uRow as any).email ?? (uRow as any).nickname ?? '-' };
				}
			}

			// BUILD shoppingLists:
			// - ambil dari lists (jika ada)
			// - ambil juga entri dari values (kadang metadata list disimpan di values)
			const shoppingLists: Array<{ listId: string; userId: string; name: string; createdAt?: any; updatedAt?: any; collaborators?: any }> = [];

			// dari lists table langsung
			for (const [listId, listRow] of Object.entries(lists)) {
				// owner bisa ada di beberapa field, fallback ke collaborator pertama jika perlu
				const owner = (listRow as any).createdBy ?? (listRow as any).userId ?? (listRow as any).owner ?? Object.keys((listRow as any).collaborators ?? {})[0] ?? 'unknown';
				const name = (listRow as any).name ?? (listRow as any).title ?? '-';
				// register user owner jika belum ada
				if (owner && !usersMap[owner]) usersMap[owner] = { userId: owner, emailOrNick: '-' };
				shoppingLists.push({
					listId,
					userId: owner,
					name,
					createdAt: (listRow as any).createdAt ?? null,
					updatedAt: (listRow as any).updatedAt ?? null,
					collaborators: (listRow as any).collaborators ?? {}
				});
			}

			// dari values: seringkali values menyimpan metadata list (contoh payloadmu)
			for (const [vId, vRow] of Object.entries(values)) {
				// jika ada listId di values, jadikan list
				const listId = (vRow as any).listId ?? (vRow as any).id ?? null;
				if (listId) {
					// jika sudah ada list dengan id yang sama, skip
					if (!shoppingLists.find(l => l.listId === listId)) {
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
			}

			// Jika setelah ini shoppingLists kosong tapi values sendiri punya info (bisa bikin entri tunggal)
			// (contoh datamu punya values yang mewakili 1 list)
			if (shoppingLists.length === 0 && typeof values === 'object' && Object.keys(values).length > 0) {
				// coba ambil listId langsung dari values root jika values bukan tabel keyed
				// (beberapa struktur menyimpan values sebagai satu object bukan map)
				const maybeListId = (values as any).listId ?? null;
				if (maybeListId) {
					const owner = (values as any).createdBy ?? (values as any).userId ?? Object.keys((values as any).collaborators ?? {})[0] ?? 'unknown';
					if (owner && !usersMap[owner]) usersMap[owner] = { userId: owner, emailOrNick: '-' };
					shoppingLists.push({
						listId: maybeListId,
						userId: owner,
						name: (values as any).name ?? '-',
						createdAt: (values as any).createdAt ?? null,
						updatedAt: (values as any).updatedAt ?? null,
						collaborators: (values as any).collaborators ?? {}
					});
				}
			}

			// BUILD items dari products (gabungkan product -> item)
			const items: Array<{ itemId: string; listId: string | null; name: string; isPurchased: boolean; createdBy?: string; createdAt?: any; updatedAt?: any; quantity?: any; units?: any; notes?: any; category?: any }> = [];

			// helper: map owner -> first listId (dipakai untuk infer jika item tidak punya listId)
			const ownerToFirstListId: Record<string, string> = {};
			for (const l of shoppingLists) {
				if (l.userId && !ownerToFirstListId[l.userId]) ownerToFirstListId[l.userId] = l.listId;
			}
			// fallback listId dari values kalau ada (satu list global)
			const valuesFallbackListId = (values as any).listId ?? null;

			for (const [itemId, itemRow] of Object.entries(products)) {
				if (itemId === 'collaborators') continue; // skip root collaborators node

				// ambil kandidat listId dengan beberapa fallback
				let listId = (itemRow as any).listId ?? (itemRow as any).shoppingListId ?? null;
				// jika tidak ada, coba fallback ke values.listId
				if (!listId && valuesFallbackListId) listId = valuesFallbackListId;
				// jika masih tidak ada, coba infer berdasarkan createdBy -> ambil first list milik owner
				const createdBy = (itemRow as any).createdBy ?? null;
				if (!listId && createdBy && ownerToFirstListId[createdBy]) {
					listId = ownerToFirstListId[createdBy];
				}
				// jika masih null, tetap null (tampilkan kosong di tabel)

				// register creator ke usersMap jika perlu
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
			   RENDER HTML - tampilkan tabel ShoppingList, Items, Users
			   (ShareList dihapus sesuai permintaan)
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

			// TABEL Users (userId, email/nickname)
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

			// tambahkan juga tampilan raw tables di bawah untuk referensi (agar aman)
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
				html += `</tbody></table>`;
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
   Worker Entry
   ====================================================== */
export default {
	async fetch(request: Request, env: any, ctx: ExecutionContext) {
		const url = new URL(request.url);
		const upgrade = request.headers.get('Upgrade');

		const id = env.GroceriesDurableObjects.idFromName('main');
		const obj = env.GroceriesDurableObjects.get(id);

		if (url.pathname === '/debug') {
			return obj.fetch(request);
		}
		if (upgrade?.toLowerCase() === 'websocket') {
			return obj.fetch(request);
		}

		return new Response("TinyBase WebSocket server is running on DO 'main'!", {
			headers: { 'content-type': 'text/plain' },
		});
	},
};