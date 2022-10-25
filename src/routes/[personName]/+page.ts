// export async function load({ fetch, params }) {
// 	console.log('this is my param', params);

// 	const fetchTag = async () => {
// 		const res = await fetch('/api/getPosts');
// 		const data = await res.json();
// 		return data;
// 		console.log('logging at page.ts', data);
// 	};

// 	return {
// 		tagName: fetchTag(params)
// 	};
// }

export async function load({ fetch, params }) {
	console.log('this is my params', params);
	console.log('this is my params.tagName', params.personName);

	const res = await fetch(`/api/getPosts`);
	const data = await res.json();

	return {
		data,
		personName: params.personName
	};
}
