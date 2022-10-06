import { writable } from 'svelte/store';

// THIS DATA IS JUST FOR TESTING. DOES NOT RELATE TO MY DATA SCHEMA IN PRISMA

export const postsStore = writable([
	{
		id: 1,
		text: 'FIRST post text FIRST post textFIRST post textFIRST post textFIRST post textFIRST post textFIRST post textFIRST post textFIRST post textFIRST post textFIRST post textFIRST post text',
		src: 'https://www.statista.com/graphic/1/1122987/change-in-remote-work-trends-after-covid-in-usa.jpg'
	},
	{
		id: 2,
		text: 'SECOND post text SECOND post textSECOND post textSECOND post textSECOND post textSECOND post textSECOND post textSECOND post textSECOND post textSECOND post textSECOND post text',
		src: ''
	}
]);