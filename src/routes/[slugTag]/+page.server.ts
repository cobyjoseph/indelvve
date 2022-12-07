import type { Actions } from '@sveltejs/kit';
import dgraph, { Txn } from 'dgraph-js-http';
import 'formdata-polyfill';

//---------------------------------------------------------------------------------------------------------------------

// Create a client stub.
function newClientStub() {
	return new dgraph.DgraphClientStub('http://localhost:8080');
}

// Create a client.
function newClient(clientStub) {
	return new dgraph.DgraphClient(clientStub);
}

//---------------------------------------------------------------------------------------------------------------------

export const actions: Actions = {
	newPostAction: async ({ request }) => {
		const form = await request.formData();

		const content = form.get('testInput');

		const tagArray = form.getAll('tagArray');
		const tagArraySplit = tagArray[0].split(',');
		console.log('tagArraysplit:', tagArraySplit);

		async function createData(dgraphClient) {
			// Create a new transaction.
			const txn = dgraphClient.newTxn();
			try {
				const p = `
					upsert {
						query {
							q(func: eq(Tag.name, "testTag")) {
								v as uid
							}
						}

						mutation {
							set {
								uid(v) <Tag.name> "${tagArraySplit[0]}" .
								_:node1 <Post.content> "${content}" .
							}
						}
					}`;

				// const p = `
				// 		_:node1 <Tag.name> "${tagArraySplit[0]}" .
				// 		_:node2 <Post.content> "${content}" .
				// 	`;

				const res = await dgraphClient.newTxn().query(p);
				const assigned = await txn.mutate({ setNquads: p });

				await txn.commit(res);
				await txn.commit(assigned);
			} finally {
				await txn.discard();
			}
		}
		async function main() {
			const dgraphClientStub = newClientStub();
			const dgraphClient = newClient(dgraphClientStub);

			await createData(dgraphClient);
		}

		await main();
	}
};
