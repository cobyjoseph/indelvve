import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function createPost(request: Request) {
	const form = await request.formData();
	const post = String(form.get('post'));

	await prisma.post.create({
		data: {
			content: createPost,
			upvoted_number: 34
		}
	});
}

// // this is all formData properties, getting form data is generall html method. I can look up formData generally to understand this better.
// export async function createPost(request: Request) {
// 	//But the point seems to be that I access formData (from wherever this function is being called) using request, then I get form data and turn it into a variable called form.
// 	const form = await request.formData();
// 	// and then I get attributes from the correct form by using the form name, and from the correct input by using enteredPost (which was bound to that input field). then I need to transform it into the correct data type to match my schema.
// 	const enteredPost = String(form.get('postName'));

// 	// and then I use the data values and keys that I just established up there and assign them to my prisma schema.
// 	await prisma.post.create({
// 		data: {
// 			content: enteredPost,
// 			upvoted_number: 40
// 		}
// 	});
// }
