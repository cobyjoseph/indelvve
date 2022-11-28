// export async function load({ fetch, params }) {
// 	// when you don't specify the fetch method, the default is a get request. that's what happens here. get request to our api
// 	const res = await fetch(`/api/getPosts?slug=${params.folderName}`);
// 	const data = await res.json();
// 	// console.log('data from folderName +page.ts', data);

// 	return {
// 		data,
// 		keyName: params.folderName
// 	};
// }

// //I TIHNK THIS IS BASICALLY AN INTERMEDIATE PAGE THAT TAKES THE DATA FROM OUR GENERIC +SERVER.TS FILE AND COLLECTS IT TO USE IN THIS +PAGE.SVELTE FILE.
// // HOWEVER IF WE GET THE DATA DIRECTLY IN THE +PAGE.SERVER.TS NEXT TO THE +PAGE.SVELTE PAGE THEN WE DON'T NEED THIS INTERMEDIATE FILE TO BRING IN THE DATA, IT'S ALREADY ACCESSIBLE TO THE SIBLING +PAGE.SVELTE THROUGH PAGEDATA
// // ALTHOUGH THAT MAY ONLY WORK FOR FORM ACTIONS WHICH ARE SUBMITTING DATA TO THE SERVER, MAYBE NOT FOR LOADING DATA?
// // BUT IT PROBABLY WORKS WITH A LOAD FUNCTION IN THE PAGE.SERVER.TS FILE. COME BACK TO THIS AND TRY IT THAT WAY AFTER
