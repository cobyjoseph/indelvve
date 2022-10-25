//this is post request to database
//set this up for node-fetch
import fetch from 'node-fetch';

export const GET = async ({ params }) => {
	console.log('logging params from the +server.ts page', params);
	function fetchGraphQL(operationsDoc, operationName, variables) {
		return fetch('https://blue-surf-640086.us-east-1.aws.cloud.dgraph.io/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Auth-Token':
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJzL3Byb3h5IiwiZHVpZCI6IjB4NzNmZGQ5MjYiLCJleHAiOjE2NjY0MTQ2MzIsImlzcyI6InMvYXBpIn0.J2XNg_PF4P45jfrEqQ06VlrwmOTDHkm7Fj5AlH1lZP8'
			},
			body: JSON.stringify({
				query: operationsDoc,
				variables: variables,
				operationName: operationName
			})
		}).then((result) => result.json());
	}

	const operationsDoc = `
  query MyQuery {
    queryTag {
    	name
    }
	queryPerson {
		name
	}
  }
`;

	function fetchMyQuery() {
		return fetchGraphQL(operationsDoc, 'MyQuery', {});
	}

	const result = await fetchMyQuery()
		.then(({ data, errors }) => {
			if (errors) {
				// handle those errors like a pro
				console.error(errors);
			}
			return data;
			console.log(data);
		})
		.catch((error) => {
			// handle errors from fetch itself
			console.error(error);
		});

	return new Response(JSON.stringify(result));
};

// export async function fetchGraphQL(operationsDoc, operationName, variables) {
// const result = await fetch('https://blue-surf-640086.us-east-1.aws.cloud.dgraph.io/graphql', {
// 	method: 'POST',
// 	headers: {
// 		'Content-Type': 'application/json',
// 		'X-Auth-Token':
// 			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJzL3Byb3h5IiwiZHVpZCI6IjB4NzNmZGQ5MjYiLCJleHAiOjE2NjYzOTE5NjIsImlzcyI6InMvYXBpIn0.cqY4dhIyu0nyrqHFlGW1MWQXJn6FyqJqV0OMEW5YLW8'
// 	},
// 	body: JSON.stringify({
// 		query: operationsDoc,
// 		variables: variables,
// 		operationName: operationName
// 	})
// });

// 	// return await result.json();
// 	return { test: 'hi' };
// }

// const operationsDoc = `
//   query MyQuery {
//     queryTag {
//       name
//     }
//   }
// `;

// function fetchMyQuery() {
// 	return fetchGraphQL(operationsDoc, 'MyQuery', {});
// }

// async function startFetchMyQuery() {
// 	const { errors, data } = await fetchMyQuery();

// 	if (errors) {
// 		// handle those errors like a pro
// 		console.error(errors);
// 	}

// 	// do something great with this precious data
// 	console.log('logging form within +server.ts in api/getPosts folder', data);
// }

// startFetchMyQuery();

// OLD NOTES BELOW ------------------------------------------------------------------

// use standard fetch request or axios to query data, not urql. urql is for front end requests.
// graphql language is not the same as the way that dgrpah uses. urql is for the server, not the database, and we want to query the database.
// we can use trpc to connect from client to server, and then at server we query database.
//if use dql you need http or grpc.
// resolvers are for going between client and server. graphql is used for querying apis. that's where resolvers are needed. when graphql is actually the querying language for the database, we don't need resolvers
// axios lets you do http request from

// import Axios from 'axios';
// import { gql } from '@urql/svelte'; //install seperate gql package without urql

// const query = ` query AllPeople {
//             queryPerson {
//                 name
//                 id
//                 content
//             }
//         }
//     `;

// we are making an http post rquest - look up fetch syntax for http post request. look at how to fetch request for post. axios is just a wrapper
// const options = {
//     headers: {
//         "content-type": "application/json",
//         "x-auth-token": "dgraph-api-key"
//     }
// }

// const {data} = axios.post(url-of-graph-ql-endpoint, {query}, options)

// we send a post request to /getPosts server.ts file from the client
