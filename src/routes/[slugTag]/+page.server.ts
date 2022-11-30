import dgraph from 'dgraph-js-http';

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
	} finally {
		// Clean up. Calling this after txn.commit() is a no-op
		// and hence safe.
		await txn.discard();
	}
}
