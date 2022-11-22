export async function load({ fetch }) {
	// when you don't specify the fetch method, the default is a get request. that's what happens here. get request to our api
	const res = await fetch(`/api/dgraph`);
	const data = await res.json();
	// console.log('data from +page.ts', data);
	// console.log('res.body from +page.ts', res.body);
	// console.log('res.data', res.data);

	return {
		data
	};
}
