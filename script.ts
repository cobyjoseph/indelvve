import { PrismaClient } from '@prisma/client';
import { data } from 'autoprefixer';
const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.create({
		data: {
			email: 'test@test.com',
			first_name: 'bob',
			last_name: 'jones',
			username: 'bjones'
		},
	})
	console.log(user);
}

//this is boilerplate to disconnect from prisma client when done. See minute 11:30 here https://www.youtube.com/watch?v=RebA5J-rlwg and look at prisma docs https://www.prisma.io/docs/getting-started/quickstart
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
