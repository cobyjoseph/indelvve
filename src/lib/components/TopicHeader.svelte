<script lang="ts">
	import AddCollectionBtn from '$lib/components/AddCollectionBtn.svelte';
	import SortButtonDark from '$lib/components/SortButtonDark.svelte';
</script>

<div class=" flex gap-2">
	<!-- <svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-8 w-8 stroke-primary stroke-2"
		fill="none"
		viewBox="0 0 24 24"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
		/>
	</svg>

	<h1 class="font-fugaz text-3xl text-primary ">Urban design</h1> -->

	<div class="grid grid-cols-1 place-items-center">
		<SortButtonDark />
	</div>

	<AddCollectionBtn addText="collection" />
</div>
