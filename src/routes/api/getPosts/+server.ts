import fetch from 'node-fetch';

// export const GET = async ({ params }) => {
// 	console.log('logging params from the +server.ts page', params);
// 	function fetchGraphQL(operationsDoc, operationName, variables) {
// 		return fetch('https://blue-surf-640086.us-east-1.aws.cloud.dgraph.io/graphql', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'X-Auth-Token':
// 					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJzL3Byb3h5IiwiZHVpZCI6IjB4NzNmZGQ5MjYiLCJleHAiOjE2NjY0MTQ2MzIsImlzcyI6InMvYXBpIn0.J2XNg_PF4P45jfrEqQ06VlrwmOTDHkm7Fj5AlH1lZP8'
// 			},
// 			body: JSON.stringify({
// 				query: operationsDoc,
// 				variables: variables,
// 				operationName: operationName
// 			})
// 		}).then((result) => result.json());
// 	}

// 	const operationsDoc = `
//   query MyQuery {
//     queryTag {
//     	name
//     }
// 	queryPerson {
// 		name
// 	}
//   }
// `;

// 	function fetchMyQuery() {
// 		return fetchGraphQL(operationsDoc, 'MyQuery', {});
// 	}

// 	const result = await fetchMyQuery()
// 		.then(({ data, errors }) => {
// 			if (errors) {
// 				// handle those errors like a pro
// 				console.error(errors);
// 			}
// 			return data;
// 			console.log(data);
// 		})
// 		.catch((error) => {
// 			// handle errors from fetch itself
// 			console.error(error);
// 		});

// 	return new Response(JSON.stringify(result));
// };

//--------------------------------------------------------------
// somehow I need to get access to the $slug variable so I can access it on page.ts. BUT actually I also need to set it here so that the right query gets performed. I need to somehow bring in the url parameter from the page.ts param into here so that the query gets updated correctly?

//query dgrpah function 

//the url.search

export const GET = async ({ request, url }) => {
	const slug = url.searchParams.get('slug');
	console.log('slug:', slug);
	// console.log('slug:', slug);
	// const slug = params;
	async function fetchGraphQL(operationsDoc, operationName, variables) {
		const result = await fetch('https://blue-surf-640086.us-east-1.aws.cloud.dgraph.io/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				//need to put X-auth into secret file. .env file and then call upon it here. also put the blue-surf string in the env
				'X-Auth-Token':
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJzL3Byb3h5IiwiZHVpZCI6IjB4NzNmZGQ5MjYiLCJleHAiOjE2NjY3Mjg2NTUsImlzcyI6InMvYXBpIn0.uRlMcR348jJTfkKQRXkzmafyLmtfbOa6dDd5cIepH9s'
			},
			body: JSON.stringify({
				query: operationsDoc,
				variables: variables,
				operationName: operationName
			})
		});

		return await result.json();
	}

	const operationsDoc = `
	query MyQuery($slug: String) {
		queryTag(filter: {name: {eq: $slug}}) {
		  name
			childTag {
			name
		  }
		}
	  }
	`;

	function fetchMyQuery() {
		console.log('from fetchMyQuery:', slug);
		return fetchGraphQL(operationsDoc, null, { slug });
	}

//give UUIDs to the data

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


//set up a separate export post function 
