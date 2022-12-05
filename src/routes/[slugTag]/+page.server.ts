import type { Actions } from '@sveltejs/kit';
import dgraph from 'dgraph-js-http';
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
		//Maybe convert the delta data into plain text here. This is where it's actually collected, I think.
		const content = form.get('testInput');
		// const firstTag = form.get('tagArray.0');
		const tagArray = form.getAll('tagArray');
		console.log('tagArray', tagArray);
		// const dataArray = Array.from(form.entries());
		// console.log('dataArray', dataArray);
		// console.log('formAction output', tagArray);

		// do multiple variables and assign them to the first, second, third, etc of array.

		async function createData(dgraphClient) {
			// Create a new transaction.
			const txn = dgraphClient.newTxn();
			try {
				// Create data.
				const p = `
				_:node1 <Post.content> "${content}" .
				_:node2 <Tag.name> "${tagArray[0]}" .
				`;

				// Run mutation.
				const assigned = await txn.mutate({ setNquads: p });

				// Commit transaction.
				await txn.commit(assigned);
			} finally {
				// Clean up. Calling this after txn.commit() is a no-op
				// and hence safe.
				await txn.discard();
			}
		}
		async function main() {
			const dgraphClientStub = newClientStub();
			const dgraphClient = newClient(dgraphClientStub);

			await createData(dgraphClient);

			// console.log('log res within main()', res);

			// return { res };
		}

		await main();
		// const result = (await main()).res;
		// return new Response(JSON.stringify(result));
	}
};
