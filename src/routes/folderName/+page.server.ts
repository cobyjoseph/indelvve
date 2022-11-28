// import type { Actions } from './$types';
// import { SECRET_API_URL, SECRET_X_AUTH } from '$env/static/private';
// import { v4 as uuid } from 'uuid';

// //// FOR DGRAPH CLOUD ONLY BELOW -----------------------------------------------------------
// //----------------------------------------------------------------------------------------
// //----------------------------------------------------------------------------------------
// //----------------------------------------------------------------------------------------
// //----------------------------------------------------------------------------------------
// //----------------------------------------------------------------------------------------
// //----------------------------------------------------------------------------------------
// const createPostMutation = `mutation MyMutation($content: String! = "", $xid: String! = "") {
// 	addPost(input: {xid: $xid, content: $content, votes: 0}) {
// 		post {
// 			xid
// 		} 
// 	}
//   }
// `;

// const addUpvoteMutation = `mutation MyMutation($xid: String = "", $currentPostXID: String = "") {
// 	addUpvote(input: {xid: $xid, upvotedPost: {xid: $currentPostXID}}) {
// 	  numUids
// 	}
//   }
// `;

// export const actions: Actions = {
// 	postAction: async ({ request }) => {
// 		const form = await request.formData();
// 		const content = form.get('content');
// 		const xid = uuid();

// 		// const content = form.get('contentInput');
// 		// const xid = form.get('xidInput');
// 		console.log('from +page.server.ts', form, 'content:', content, 'xid:', xid);

// 		try {
// 			const response = await fetch(SECRET_API_URL, {
// 				method: 'POST',
// 				headers: {
// 					'content-type': 'application/json',
// 					'X-Auth-Token': SECRET_X_AUTH
// 				},
// 				body: JSON.stringify({
// 					//maybe change query to mutation. Not sure if this is supposed to hit something in dgraph
// 					query: createPostMutation,
// 					variables: {
// 						content,
// 						xid
// 					}
// 				})
// 			});
// 			const result = await response.json();
// 			console.log(result);
// 			// returning it makes it available elsewhere in the app?
// 			return {
// 				result,
// 				success: true
// 			};
// 			//this let's me do if success: true ...
// 		} catch (error) {
// 			console.log(error);
// 			return {
// 				success: false
// 			};
// 		}
// 	},
// 	addUpvoteAction: async ({ request }) => {
// 		const form = await request.formData();
// 		console.log('logging formData in addUpvoteAction', form);
// 		// const content = form.get('content');
// 		const currentPostXID = form.get('currentPostXID');
// 		const xid = uuid();
// 		console.log('logging currentPostXID', currentPostXID);

// 		// const content = form.get('contentInput');
// 		// const xid = form.get('xidInput');
// 		// console.log('from +page.server.ts', form, 'content:', content, 'xid:', xid);

// 		try {
// 			const response = await fetch(SECRET_API_URL, {
// 				method: 'POST',
// 				headers: {
// 					'content-type': 'application/json',
// 					'X-Auth-Token': SECRET_X_AUTH
// 				},
// 				body: JSON.stringify({
// 					//maybe change query to mutation. Not sure if this is supposed to hit something in dgraph
// 					query: addUpvoteMutation,
// 					variables: {
// 						currentPostXID,
// 						xid
// 					}
// 				})
// 			});
// 			const result = await response.json();
// 			console.log(result);
// 			// returning it makes it available elsewhere in the app?
// 			return {
// 				result,
// 				success: true
// 			};
// 			//this let's me do if success: true ...
// 		} catch (error) {
// 			console.log(error);
// 			return {
// 				success: false
// 			};
// 		}
// 	}
// };
