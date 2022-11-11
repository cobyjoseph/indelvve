// const dgraph = require('dgraph-js');
// const grpc = require('grpc');

// const clientStub = new dgraph.DgraphClientStub(
// 	// addr: optional, default: "localhost:9080"
// 	'localhost:9080',
// 	// credentials: optional, default: grpc.credentials.createInsecure()
// 	grpc.credentials.createInsecure()
// );
// const dgraphClient = new dgraph.DgraphClient(clientStub);

// export default dgraphClient;



//-------ABOVE COMES FROM DGRAPH GRPC DOCS-----------------
//-------BELOW COMES FROM THE FOLLOWING GITHUB IMPLREMENTATION-----
// from https://github.com/comake/solid-dgraph/blob/a23539aaed33785b4131a27e9c066f1d2b2277c4/src/DgraphClient.ts 
//---------------------------------------

import * as grpc from '@grpc/grpc-js';
import dgraph, { Operation } from 'dgraph-js';

const clientStub = new dgraph.DgraphClientStub(
	// addr: optional, default: "localhost:9080"
	'localhost:9080',
	// credentials: optional, default: grpc.credentials.createInsecure()
	grpc.credentials.createInsecure()
);
export const dgraphClient = new dgraph.DgraphClient(clientStub);

// export default dgraphClient;