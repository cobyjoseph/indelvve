import { SECRET_API_URL, SECRET_X_AUTH } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';

// export const GET: RequestHandler = async () => {
// 	async function fetchDql(dqlQuery, operationName, variables) {
// 		const resultDql = await fetch('http://localhost:8080', {
// 			method: 'POST',
// 			headers: {},
// 			body: JSON.stringify({
// 				query: dqlQuery,
// 				variables: variables,
// 				operationName: operationName
// 			})
// 		});
// 		return await resultDql.json;
// 	}

// 	const dqlQuery = `
// 		{
// 			fetchTest(func: eq(name, "Coby1")){
// 				uid
// 				name
// 				age
// 		}
// 	}
// 	`;

// 	function fetchDqlQuery() {
// 		return fetchDql(dqlQuery, null, { slug });
// 	}

// 	//give UUIDs to the data

// 	const resultDql = await fetchDqlQuery()
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

// 	return new Response(JSON.stringify(resultDql));
// };
//------------------------------------------------------------------------------

//!!!!!
//MAYBE THIS GET FUNCTION IS ONLY NEEDED SO I CAN USE THE URL QUERY. I AM STILL ULTIMATELY USING LOAD AND FETCH FUNCTIONS WHEN I CALL THIS FUNCTION IN +PAGE.TS!!
//!!!
export const GET: RequestHandler = async ({ url }) => {
	const slug = url.searchParams.get('slug');

	async function fetchGraphQL(operationsDoc, operationName, variables) {
		const result = await fetch(SECRET_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Auth-Token': SECRET_X_AUTH
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
	query MyQuery($slug: String, $numUpvotes: PostOrderable = xid) {
	  queryTag(filter: {name: {eq: $slug}}) {
		name
		id
		childTag {
		  name
		  id
		  childPosts(order: {asc: $numUpvotes}) {
			id
			xid
			content
			date
			postUpvotesAggregate {
				count
			  }
		  }
		}
	  }
	}
  `;

	function fetchMyQuery() {
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
		})
		.catch((error) => {
			// handle errors from fetch itself
			console.error(error);
		});

	return new Response(JSON.stringify(result));
};
