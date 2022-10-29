export async function load({ fetch, params }) {
	// when you don't specify the fetch method, the default is a get request. that's what happens here. get request to our api
	const res = await fetch(`/api/getPosts?slug=${params.folderName}`);
	const data = await res.json();
	console.log('from +page.ts', data);

	return {
		data,
		keyName: params.folderName
	};
}

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
