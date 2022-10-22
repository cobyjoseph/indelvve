<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
	console.log('logging data from client (page.svelte)', data);
</script>

{JSON.stringify(data)}

<div class="flex flex-grow justify-center">
	<Navbar />

	<div class=" relative mx-4 mb-6 grid h-full grid-cols-1 md:w-3/4 md:max-w-[620px] ">
		<SearchBar />

		<div class="text-white">testing</div>
	</div>
</div>
