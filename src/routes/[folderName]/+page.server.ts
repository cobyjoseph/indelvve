import type { Actions } from './$types';
import axios from 'axios';
import { SECRET_API_URL, SECRET_X_AUTH } from '$env/static/private';
import { v4 as uuid } from 'uuid';

const createPostMutation = `mutation MyMutation($content: String! = "", $xid: String! = "") {
	addPost(input: {xid: $xid, content: $content}) {
		post {
			xid
		} 
	}
  }
`;

export const actions: Actions = {
	postAction: async ({ request }) => {
		const form = await request.formData();
		const content = form.get('content');
		const xid = uuid();

		// const content = form.get('contentInput');
		// const xid = form.get('xidInput');
		console.log('from +page.server.ts', form, 'content:', content, 'xid:', xid);

		try {
			const response = await fetch(SECRET_API_URL, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					'X-Auth-Token': SECRET_X_AUTH
				},
				body: JSON.stringify({
					//maybe change query to mutation. Not sure if this is supposed to hit something in dgraph
					query: createPostMutation,
					variables: {
						content,
						xid
					}
				})
			});
			const result = await response.json();
			console.log(result);
			// returning it makes it available elsewhere in the app?
			return {
				result,
				success: true
			};
			//this let's me do if success: true ...
		} catch (error) {
			console.log(error);
			return {
				success: false
			};
		}
	}
};

// export const actions: Actions = {
// 	postAction: async ({ request }) => {
// 		const form = await request.formData();

// 		const content = form.get('contentInput');
// 		const xid = form.get('xidInput');
// 		console.log('from +page.server.ts', form, 'content:', content, 'xid:', xid);

// 		const res = await axios.post(
// 			SECRET_API_KEY,
// 			{
// 				query: `
// 			mutation MyMutation($content: String = "", $xid: String = "", $upsert: Boolean = false) {
// 				addPost(input: {xid: $xid, content: $content})
// 			  }
// 		  `,
// 				variables: {
// 					content: content,
// 					xid: xid
// 				}
// 			},
// 			{
// 				headers: {
// 					'content-type': 'application/json',
// 					'X-Auth-Token': SECRET_X_AUTH
// 				}
// 			}
// 		);
// 		return new Response(JSON.parse(JSON.stringify(res)));
// 	}
// };

// export const actions: Actions = {
// 	postAction: async ({ request }) => {
// 		const form = await request.formData();

// 		const content = form.get('contentInput');
// 		const xid = form.get('xidInput');
// 		console.log('log content from +page.server.ts', form, content, xid);

// 		await axios.post(`http://localhost:5173/api/getPosts`, { content, xid });

// 		return {
// 			content: content,
// 			xid: xid
// 		};

// 	}
// };

// export const regUser = async (username, password) => {
//     return await axios.post(API_KEY, {
//         query: `mutation MyMutation($name: String, $password: String) {
//             insert_users(objects: {name: $name, password: $password}) {
//               returning {
//                 name
//               }
//             }
//           }`,
//         variables: {
//           name: username,
//           password: password
//         }
//       }, {
//           headers: {
//             'content-type': 'application/json',
//             'x-hasura-admin-secret': ADMIN_SECRET
//           }
//         })
// }

// see dgraph example here https://discuss.dgraph.io/t/is-there-an-example-of-uploading-a-graphql-schema-with-post-using-node-request-or-axios-instead-of-curl/14400
