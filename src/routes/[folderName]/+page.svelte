<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Collection from '$lib/components/Collection.svelte';
	import type { PageData } from './$types';
	import ChildTags from '$lib/components/ChildTags.svelte';
	import Sort from '$lib/components/Sort.svelte';

	export let data: PageData;
	console.log(data.data);

	let childTags: String;
</script>

<div class="flex  justify-center">
	<Navbar />

	<div class=" mx-4  grid h-full  md:w-3/4 md:max-w-[620px] ">
		<SearchBar />

		<div class="flex">
			<div
				class="text-white font-semibold bg-secondary text-[26px] pt-[2px] pb-[4.5px] px-3 inline mt-4 rounded-md"
			>
				# {data.keyName}
			</div>
		</div>

		<Sort />

		<div class="text-red-400 mt-4">
			{#each data.data.queryTag[0].childTag as i}
				{#if i.name}
					<ChildTags childTagName={i.name} />
				{/if}
			{/each}
		</div>
	</div>
</div>
