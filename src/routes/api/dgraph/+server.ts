import dgraph from 'dgraph-js-http';
import type { RequestHandler } from '@sveltejs/kit';

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

export const GET: RequestHandler = async () => {
	async function queryData(dgraphClient) {
		// Run query.
		const query = `query all($a: string) {
			all(func: eq(name, $a)) {
				uid
				name
				age
			}
		}`;

		const vars = { $a: 'Coby1' };
		const res = await dgraphClient.newTxn().queryWithVars(query, vars);

		return await res.data;
	}

	async function main() {
		const dgraphClientStub = newClientStub();
		const dgraphClient = newClient(dgraphClientStub);

		const res = await queryData(dgraphClient);

		console.log('log res within main()', res);

		return { res };
	}

	const result = (await main()).res;

	return new Response(JSON.stringify(result));
};
