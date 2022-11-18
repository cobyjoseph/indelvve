export async function load({ fetch, params }) {
	// when you don't specify the fetch method, the default is a get request. that's what happens here. get request to our api
	const res = await fetch(`/api/getPosts?slug=${params.folderName}`);
	const data = await res.json();

	return {
		data,
		keyName: params.folderName
	};
}

//I TIHNK THIS IS BASICALLY AN INTERMEDIATE PAGE THAT TAKES THE DATA FROM OUR GENERIC +SERVER.TS FILE AND COLLECTS IT TO USE IN THIS +PAGE.SVELTE FILE.
// HOWEVER IF WE GET THE DATA DIRECTLY IN THE +PAGE.SERVER.TS NEXT TO THE +PAGE.SVELTE PAGE THEN WE DON'T NEED THIS INTERMEDIATE FILE TO BRING IN THE DATA, IT'S ALREADY ACCESSIBLE TO THE SIBLING +PAGE.SVELTE THROUGH PAGEDATA
