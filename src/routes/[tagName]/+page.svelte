<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import SearchBar from '$lib/SearchBar.svelte';

	import type { PageData } from './$types';



	export let data: PageData;
	console.log(data);

</script>

<!-- {#each $showTags.data.queryTag as tag}
	<li>
		{tag.name}
	</li>
{/each}

<div class="peer relative text-2xl font-semibold text-white  z-20 max-w-fit py-[3px]  ">
	{tag.name}
</div> -->

<div class="flex flex-grow justify-center">
	<Navbar />

	<div class=" relative mx-4 mb-6 grid h-full grid-cols-1 md:w-3/4 md:max-w-[620px] ">
		<SearchBar />
	</div>
</div>
