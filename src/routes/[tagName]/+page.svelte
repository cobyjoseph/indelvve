<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Collection from '$lib/components/Collection.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data.tagName);
	// console.log('logging queried page data on +page.svelte:', data.data.queryTag[0].name);
	$: extractedData = data.data.queryTag;
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

		<div>
			<!-- This totally works. It takes the text directly from the url. because that's what params is. and I returned params and called it tagName. So it tagName is part of the page data -->
			{data.tagName}
		</div>

		<div class="text-green-400">
			{extractedData[0].name}
		</div>

		<div class="text-red-400">
			{#each extractedData as i}
				<li>
					<a href="/{i.name}">
						{i.name}
					</a>
				</li>
			{/each}
		</div>

		<div class="text-white">testing</div>
	</div>
</div>
