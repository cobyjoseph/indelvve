import dgraph from 'dgraph-js';
// // const dgraph = require('dgraph-js');
// // const grpc = require('grpc');

// Create a client stub.
function newClientStub() {
	return new dgraph.DgraphClientStub('http://localhost:8080');
}

// Create a client.
function newClient(clientStub) {
	return new dgraph.DgraphClient(clientStub);
}

// Drop All - discard all data and start from a clean slate.
async function dropAll(dgraphClient) {
	await dgraphClient.alter({ dropAll: true });
}

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

// Create data using JSON.
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

// Query for data.
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
	const dataPoint = res.data;
	// const ppl = res.data;

	// Print results.
	// console.log(`Number of people named "Alice": ${ppl.all.length}`);
	// ppl.all.forEach((person) => console.log(person));
	return res;
}

async function main() {
	const dgraphClientStub = newClientStub();
	const dgraphClient = newClient(dgraphClientStub);
	// await dropAll(dgraphClient);
	// await setSchema(dgraphClient);
	// await createData(dgraphClient);
	await queryData(dgraphClient);
}

main()
	.then(() => {
		console.log('\nDONE!');
	})
	.catch((e) => {
		console.log('ERROR: ', e);
	});

// // const clientStub = new dgraph.DgraphClientStub(
// // 	// addr: optional, default: "localhost:9080"
// // 	'localhost:9080',
// // 	// credentials: optional, default: grpc.credentials.createInsecure()
// // 	grpc.credentials.createInsecure()
// // );
// // const dgraphClient = new dgraph.DgraphClient(clientStub);

// // export default dgraphClient;

// //-------ABOVE COMES FROM DGRAPH GRPC DOCS-----------------
// //-------BELOW COMES FROM THE FOLLOWING GITHUB IMPLREMENTATION-----
// // from https://github.com/comake/solid-dgraph/blob/a23539aaed33785b4131a27e9c066f1d2b2277c4/src/DgraphClient.ts
// //---------------------------------------

// import * as grpc from '@grpc/grpc-js';
// import dgraph, { Operation } from 'dgraph-js';

// //initiate client:-----------------------------------------
// const clientStub = new dgraph.DgraphClientStub(
// 	// addr: optional, default: "localhost:9080"
// 	'localhost:9080',
// 	// credentials: optional, default: grpc.credentials.createInsecure()
// 	grpc.credentials.createInsecure()
// );

// export const dgraphClient = new dgraph.DgraphClient(clientStub);

// //create variable to call upon schema alterations: ------------------------

// const schema = 'name: string @index(exact) .';
// export const op = new dgraph.Operation();
// op.setSchema(schema);
// await dgraphClient.alter(op);

// //create variable to call transactions: ------------------------

// const txn = dgraphClient.newTxn();
// try {
// 	// Do something here
// 	// ...
// } finally {
// 	await txn.discard();
// 	// ...
// }

// const res = await txn.queryWithVars(query, vars);

// //create variable to run mutations: ---------------------------

// const p = {
// 	name: 'Alice'
// };

// // Run mutation.
// const mu = new dgraph.Mutation();
// mu.setSetJson(p);
// await txn.mutate(mu);

// //create variable to run a query: ---------------------------

// const query = `query all($a: string) {
// 	all(func: eq(name, $a))
// 	{
// 	  name
// 	}
//   }`;
// const vars = { $a: 'Alice' };
// const resolve = await dgraphClient.newTxn().queryWithVars(query, vars);
// const ppl = res.getJson();

// // Print results.
// console.log(`Number of people named "Alice": ${ppl.all.length}`);
// ppl.all.forEach((person) => console.log(person.name));

// // export default dgraphClient;
