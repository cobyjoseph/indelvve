import { json } from 'stream/consumers';
import { prisma } from '../utils/prisma';
import type { Actions, PageServerLoad } from './$types';

// LOAD DATA ----------------------------------------------------------
export const load: PageServerLoad = async () => {
	const post = await prisma.post.findMany({});

	return { post };
};

//---------------------------------------------------------------------

//CREATE NEW POST -----------------------------------------------------
// export const actions: Actions = {
// 	actionNameOne: async ({ request }) => {
// 		const form = await request.formData();
// 		const inputValue = form.get('formName');

// 		await prisma.post.create({
// 			data: {
// 				content: inputValue,
// 				upvoted_number: 34
// 			}
// 		});
// 	}
// };

export const actions: Actions = {
	actionNameTwo: async ({ request }) => {
		const form = await request.formData();
		const inputVar = form.get('inputField');

		await prisma.post.create({
			data: {
				newContent: inputVar,
				upvoted_number: 34
			}
		});
	}
};

// export const data = async () => {
// 	const data = await prisma.post.findFirst({
// 		where: {
// 			id: 1
// 		}
// 	});
// 	return {
// 		body: { data }
// 	};
// };

// export const actions: Actions = {
// 	default: async function funcToAccessAction({ request, locals }) {}
// 	const form_data =
// };

// export const actions: Actions = {
// 	default: async ({request}) => {
// 		const form = await request.formData();
// 		const enteredPost = String(form.get('inputText'));
// 	}

// 	await prisma.post.create({
// 		data: {
// 			content: enteredPost,

// 		}
// 	})
// };

// // this is all formData properties, getting form data is generall html method. I can look up formData generally to understand this better.
// export async function createPost(request: Request) {
// 	//But the point seems to be that I access formData (from wherever this function is being called) using request, then I get form data and turn it into a variable called form.
// 	const form = await request.formData();
// 	// and then I get attributes from the correct form by using the form name, and from the correct input by using enteredPost (which was bound to that input field). then I need to transform it into the correct data type to match my schema.
// 	const enteredPost = String(form.get('createPost'));

// 	// and then I use the data values and keys that I just established up there and assign them to my prisma schema.
// 	await prisma.post.create({
// 		data: {
// 			content: enteredPost,
// 			upvoted_number: 40
// 		}
// 	});
// }
