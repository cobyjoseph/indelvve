export async function load({ fetch, params }) {
	// when you don't specify the fetch method, the default is a get request. that's what happens here. get request to our api
	const res = await fetch(`/api/getPosts?slug=${params.folderName}`);
	const data = await res.json();

	return {
		data,
		keyName: params.folderName
	};
}
