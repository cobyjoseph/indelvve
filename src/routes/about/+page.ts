// export const load = ({ fetch }) => {
	
//     const fetchTags = async () => {
// 		const res = await fetch('/api/getPosts');
// 		const data = await res.json();
// 		return data.tag;
// 	};

// 	return {
// 		tag: fetchTags()
// 	};
// };

export async function load({ fetch }) {
	const res = await fetch('/api/getPosts');
	const data = await res.json();

	console.log(data);

	return {
		data
	};
}
