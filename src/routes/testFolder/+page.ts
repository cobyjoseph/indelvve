export async function load({ fetch }) {
	// when you don't specify the fetch method, the default is a get request. that's what happens here. get request to our api
	const any = await fetch(`/api/dgraph`);

	const data = await any.json();
	console.log('log data from +page.ts', data);

	return {
		data
	};
}
