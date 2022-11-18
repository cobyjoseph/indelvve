import { SECRET_API_URL, SECRET_X_AUTH } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import fetch from 'node-fetch';

export const GET: RequestHandler = async ({ url }) => {
	const slug = url.searchParams.get('slug');
	console.log('slug:', slug);

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
//---------------------------------------
//-----------------------------------------
//------------------------------------------
// Separate POST function for uplaoding content ------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------

// export const POST: RequestHandler = async ({ request }) => {
// 	console.log(request.body);
// 	async function fetchGraphQL(operationsDoc, operationName, variables) {
// 		const result = await fetch(SECRET_API_URL, {
// 			method: 'POST',
// 			headers: {
// 				'x-sveltekit-action': 'true',
// 				'Content-Type': 'application/json',
// 				'X-Auth-Token': SECRET_X_AUTH
// 			},
// 			body: JSON.stringify({
// 				query: operationsDoc,
// 				variables: variables,
// 				operationName: operationName
// 			})
// 		});

// 		return await result.json();
// 	}

// 	const operationsDoc = `
// 	mutation MyMutation($content: String = "", $xid: String = "", $upsert: Boolean = false) {
// 		addPost(input: {xid: $xid, content: $content})
// 	  }
//   `;

// 	// try doing it directly form the page.server

// 	function postMutation() {
// 		console.log('from postMutation:', content);
// 		return fetchGraphQL(operationsDoc, null, { content, xid });
// 	}

// 	//give UUIDs to the data

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

// function executeMyMutation(content, xid, upsert) {
// 	return fetchGraphQL(operationsDoc, 'MyMutation', {
// 		content: content,
// 		xid: xid,
// 		upsert: upsert
// 	});
// }

// const postResult = await executeMyMutation(content, xid, upsert)
// 	.then(({ data, errors }) => {
// 		if (errors) {
// 			// handle those errors like a pro
// 			console.error(errors);
// 		}
// 		return data;
// 		console.log(data);
// 	})
// 	.catch((error) => {
// 		// handle errors from fetch itself
// 		console.error(error);
// 	});

// return new Response(JSON.stringify(postResult));

// async function startExecuteMyMutation(content, xid, upsert) {
// 	const { errors, data } = await executeMyMutation(content, xid, upsert);

// 	if (errors) {
// 		// handle those errors like a pro
// 		console.error(errors);
// 	}

// 	// do something great with this precious data
// 	console.log(data);
// }

// // startExecuteMyMutation(content, xid, upsert);
