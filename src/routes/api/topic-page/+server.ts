import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();


// export async function createPost(request: Request) {
// 	const form = await request.formData();
// 	const enteredPost = String(form.get('createPost'));

// 	// you can get the user from the session
// 	await prisma.post.create({
// 		data: {
// 			content: enteredPost,
// 			upvoted_number: 40
// 		}
// 	});
// }

// // export const GET = () => {
// // 	return new Response('Welcome to my API');
// // };

// // export async function load({ fetch }) {
// // 	const response = await fetch
// }
let item = 'banana';


// we want to access an API, we don't want to have a whole page for this, or wait for that page to laod.

export function GET() {
	return {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		},
		body: { item }
	};
}
