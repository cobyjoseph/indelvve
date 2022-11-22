import dgraph from 'dgraph-js-http';
import type { RequestHandler } from '@sveltejs/kit';

// // const dgraph = require('dgraph-js');
// // const grpc = require('grpc');

//MAYBE I ACTUALLY NEED FETCHES ON BOTH SIDES.
// ONE FETCH TO GET THE DATA FROM DGRAPH TO THE SERVER
// ANOTHER FETCH TO GET IT FROM SERVER.TS TO +PAGE.TS - EG FROM THE SERVER TO BE ACCESSIBLE BY THE CLIENT

// Create a client stub.
function newClientStub() {
	return new dgraph.DgraphClientStub('http://localhost:8080');
}

// Create a client.
function newClient(clientStub) {
	return new dgraph.DgraphClient(clientStub);
}

export const GET: RequestHandler = async () => {
	async function queryData(dgraphClient) {
		// Run query.
		const query = `query all($a: string) {
			all(func: eq(name, $a)) {
				uid
				name
				age
				married
				loc
				dob
				friend {
					name
					age
				}
				school {
					name
				}
			}
		}`;
		const vars = { $a: 'Alice' };
		const res = await dgraphClient.newTxn().queryWithVars(query, vars);
		const ppl = res.data;

		// Print results.
		console.log(`Number of people named "Alice": ${ppl.all.length}`);
		ppl.all.forEach((person) => console.log(person));

		return queryData;
	}

	async function createData(dgraphClient) {
		// Create a new transaction.
		const txn = dgraphClient.newTxn();
		try {
			// Create data.
			const p = {
				name: 'Alice',
				age: 26,
				married: true,
				loc: {
					type: 'Point',
					coordinates: [1.1, 2]
				},
				dob: new Date(1980, 1, 1, 23, 0, 0, 0),
				friend: [
					{
						name: 'Bob',
						age: 24
					},
					{
						name: 'Charlie',
						age: 29
					}
				],
				school: [
					{
						name: 'Crown Public School'
					}
				]
			};

			// Run mutation.
			const assigned = await txn.mutate({ setJson: p });

			// Commit transaction.
			await txn.commit();

			// Get uid of the outermost object (person named "Alice").
			// Assigned#getUidsMap() returns a map from blank node names to uids.
			// For a json mutation, blank node names "blank-0", "blank-1", ... are used
			// for all the created nodes.
			console.log(`Created person named "Alice" with uid = ${assigned.data.uids['blank-0']}\n`);

			console.log('All created nodes (map from blank node names to uids):');
			Object.keys(assigned.data.uids).forEach((key) =>
				console.log(`${key} => ${assigned.data.uids[key]}`)
			);
			console.log();
		} finally {
			// Clean up. Calling this after txn.commit() is a no-op
			// and hence safe.
			await txn.discard();
		}
	}

	async function main() {
		const dgraphClientStub = newClientStub();
		const dgraphClient = newClient(dgraphClientStub);
		// await dropAll(dgraphClient);
		// await setSchema(dgraphClient);
		await createData(dgraphClient);
		await queryData(dgraphClient);
	}

	//FOR SOME REASON ADDING AWAIT BEFORE MAIN HERE BREAKS IT, EVEN THOUGH THAT SEEMS LIKE WHAT I DID IN THE GETPOSTS +SERVER.TS
	const result = main()
		.then(() => {
			console.log('\nDONE!');
			console.log('logging queryData', queryData);
		})
		.catch((e) => {
			console.log('ERROR: ', e);
		});

	return new Response(JSON.stringify(result));
};
