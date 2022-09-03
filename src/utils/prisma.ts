import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function createPost(request: Request) {
	const form = await request.formData();
	const enteredPost = String(form.get('postName'));

	// you can get the user from the session
	await prisma.post.create({
		data: {
			content: enteredPost,
			upvoted_number: 40
		}
	});
}
