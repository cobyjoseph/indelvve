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

export const GET: RequestHandler = async ({ url }) => {
	const slug = url.searchParams.get('slug');

	async function queryData(dgraphClient) {
		// const query = `query all($a: string) {
		// 	all(func: eq(name, $a)) {
		// 		uid
		// 		name
		// 		age
		// 	}
		// }`;

		const query = `query qTagsAndPosts($slug: string) {
			queryTag(func: eq(Tag.name, $slug)) {
			  Tag.name
			  Tag.childTag{
					  Tag.name
					  Tag.childPosts {
							Post.content
				  }
				}
			}
		  }
		`;

		const vars = { $slug: slug };
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

//Schema
// use @reverse .
