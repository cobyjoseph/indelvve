import type { Actions } from './$types';
import { SECRET_API_URL, SECRET_X_AUTH } from '$env/static/private';
import { v4 as uuid } from 'uuid';
import type { PageServerLoad } from './$types';
import dgraph from 'dgraph-js';

// look here next- this seems helpful https://github.com/LauraVZuluaga/truoraJL/blob/19dd8b783f3e31684ddae95da8a08d0a8fd7fe2c/bd/dgraphdb.go

// Create a client stub.
function newClientStub() {
	return new dgraph.DgraphClientStub('http://localhost:8080');
}

// Create a client.
function newClient(clientStub) {
	return new dgraph.DgraphClient(clientStub);
}

export const load: PageServerLoad = async () => {
	async function queryData(dgraphClient) {
		// Run query.
		const query = `{
			fetchTest(func: eq(name, "Coby1")){
				uid
				name
				age
		  }
		}`;
		// const vars = { $a: 'Alice' };
		const res = await dgraphClient.newTxn().queryWithVars(query);
		// const ppl = res.data;

		// // Print results.
		// console.log(`Number of people named "Alice": ${ppl.all.length}`);
		// ppl.all.forEach((person) => console.log(person));
	}

	async function main() {
		const dgraphClientStub = newClientStub();
		const dgraphClient = newClient(dgraphClientStub);
		// await dropAll(dgraphClient);
		// await setSchema(dgraphClient);
		// await createData(dgraphClient);
		await queryData(dgraphClient);
	}

	// DO I NEED TO RETURN DATA HERE? WHERE DOES the term data come from? Is that prebuilt?

	const result = await main()
		.then(({ data }) => {
			console.log('\nDONE!');
			return data;
		})
		.catch((e) => {
			console.log('ERROR: ', e);
		});
	return new Response(JSON.stringify(result));
};

// Query for data.

// Drop All - discard all data and start from a clean slate.
// async function dropAll(dgraphClient) {
// 	await dgraphClient.alter({ dropAll: true });
// }

// Set schema.
// async function setSchema(dgraphClient) {
// 	const schema = `
//         name: string @index(exact) .
//         age: int .
//         married: bool .
//         loc: geo .
//         dob: datetime .
//     `;
// 	await dgraphClient.alter({ schema: schema });
// }

// // Create data using JSON.
// async function createData(dgraphClient) {
// 	// Create a new transaction.
// 	const txn = dgraphClient.newTxn();
// 	try {
// 		// Create data.
// 		const p = {
// 			name: 'Alice',
// 			age: 26,
// 			married: true,
// 			loc: {
// 				type: 'Point',
// 				coordinates: [1.1, 2]
// 			},
// 			dob: new Date(1980, 1, 1, 23, 0, 0, 0),
// 			friend: [
// 				{
// 					name: 'Bob',
// 					age: 24
// 				},
// 				{
// 					name: 'Charlie',
// 					age: 29
// 				}
// 			],
// 			school: [
// 				{
// 					name: 'Crown Public School'
// 				}
// 			]
// 		};

// 		// Run mutation.
// 		const assigned = await txn.mutate({ setJson: p });

// 		// Commit transaction.
// 		await txn.commit();

// 		// Get uid of the outermost object (person named "Alice").
// 		// Assigned#getUidsMap() returns a map from blank node names to uids.
// 		// For a json mutation, blank node names "blank-0", "blank-1", ... are used
// 		// for all the created nodes.
// 		console.log(`Created person named "Alice" with uid = ${assigned.data.uids['blank-0']}\n`);

// 		console.log('All created nodes (map from blank node names to uids):');
// 		Object.keys(assigned.data.uids).forEach((key) =>
// 			console.log(`${key} => ${assigned.data.uids[key]}`)
// 		);
// 		console.log();
// 	} finally {
// 		// Clean up. Calling this after txn.commit() is a no-op
// 		// and hence safe.
// 		await txn.discard();
// 	}
// }

//// FOR DGRAPH CLOUD ONLY BELOW -----------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
const createPostMutation = `mutation MyMutation($content: String! = "", $xid: String! = "") {
	addPost(input: {xid: $xid, content: $content, votes: 0}) {
		post {
			xid
		} 
	}
  }
`;

const addUpvoteMutation = `mutation MyMutation($xid: String = "", $currentPostXID: String = "") {
	addUpvote(input: {xid: $xid, upvotedPost: {xid: $currentPostXID}}) {
	  numUids
	}
  }
`;

export const actions: Actions = {
	postAction: async ({ request }) => {
		const form = await request.formData();
		const content = form.get('content');
		const xid = uuid();

		// const content = form.get('contentInput');
		// const xid = form.get('xidInput');
		console.log('from +page.server.ts', form, 'content:', content, 'xid:', xid);

		try {
			const response = await fetch(SECRET_API_URL, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					'X-Auth-Token': SECRET_X_AUTH
				},
				body: JSON.stringify({
					//maybe change query to mutation. Not sure if this is supposed to hit something in dgraph
					query: createPostMutation,
					variables: {
						content,
						xid
					}
				})
			});
			const result = await response.json();
			console.log(result);
			// returning it makes it available elsewhere in the app?
			return {
				result,
				success: true
			};
			//this let's me do if success: true ...
		} catch (error) {
			console.log(error);
			return {
				success: false
			};
		}
	},
	addUpvoteAction: async ({ request }) => {
		const form = await request.formData();
		console.log('logging formData in addUpvoteAction', form);
		// const content = form.get('content');
		const currentPostXID = form.get('currentPostXID');
		const xid = uuid();
		console.log('logging currentPostXID', currentPostXID);

		// const content = form.get('contentInput');
		// const xid = form.get('xidInput');
		// console.log('from +page.server.ts', form, 'content:', content, 'xid:', xid);

		try {
			const response = await fetch(SECRET_API_URL, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					'X-Auth-Token': SECRET_X_AUTH
				},
				body: JSON.stringify({
					//maybe change query to mutation. Not sure if this is supposed to hit something in dgraph
					query: addUpvoteMutation,
					variables: {
						currentPostXID,
						xid
					}
				})
			});
			const result = await response.json();
			console.log(result);
			// returning it makes it available elsewhere in the app?
			return {
				result,
				success: true
			};
			//this let's me do if success: true ...
		} catch (error) {
			console.log(error);
			return {
				success: false
			};
		}
	}
};
