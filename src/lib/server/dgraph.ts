// // const dgraph = require('dgraph-js');
// // const grpc = require('grpc');

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
