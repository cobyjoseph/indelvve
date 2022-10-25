<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Collection from '$lib/components/Collection.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	console.log('data on +page.svelte', data);

	// console.log('logging queried page data on +page.svelte:', data.data.queryTag[0].name);
	$: extractedTagData = data.data.queryTag;
	$: extractedPersonData = data.data.queryPerson;
	// console.log('logging extractedData,', data.data.queryTag);
	// let tagName = JSON.stringify(data);
	// parsedData = JSON.parse(data);

	//read tihs about fixing parsing data

	// console.log('logging data from client (page.svelte)', data);
</script>

<div class="flex flex-grow justify-center">
	<Navbar />

	<div class=" relative mx-4 mb-6 grid h-full grid-cols-1 md:w-3/4 md:max-w-[620px] ">
		<SearchBar />

		<div class="text-white">
			data extracted from url: {data.personName}
		</div>

		<div class="text-pink-500">
			<!-- This totally works. It takes the text directly from the url. because that's what params is. and I returned params and called it tagName. So it tagName is part of the page data -->
			data extracted queryPerson:
			{extractedPersonData[0].name}
		</div>

		<div class="text-green-400">
			data extracted queryTag: {extractedTagData[0].name}
		</div>

		<div class="text-white mt-4">
			here I show the properties of the person who's name (or xid?) matches the url parameter. In
			the end this would be the tags that are marked as related/child tags. To do that I need to
			query the data from the database and filter for where the xid or name is the same as params,
			and then return the properties of that person in a query. and then return that query here.
		</div>

		<div class="text-red-400 mt-4">
			{#each extractedPersonData as i}
				<li>
					<a href="/{i.name}">
						{i.name}
					</a>
				</li>
			{/each}
		</div>
	</div>
</div>
