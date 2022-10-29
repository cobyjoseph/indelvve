import { SECRET_API_KEY, SECRET_X_AUTH } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import fetch from 'node-fetch';

// export const POST:RequestHandler =

export const GET: RequestHandler = async ({ request, url }) => {
	const slug = url.searchParams.get('slug');
	console.log('slug:', slug);

	async function fetchGraphQL(operationsDoc, operationName, variables) {
		const result = await fetch(SECRET_API_KEY, {
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
