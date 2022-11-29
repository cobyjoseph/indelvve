<!-- <script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Collection from '$lib/components/Collection.svelte';
	import type { PageData } from './$types';
	import ChildTags from '$lib/components/ChildTags.svelte';
	import Sort from '$lib/components/Sort.svelte';

	export let data: PageData;
	let form;

	console.log('data', data);

	$: navBarLength = data.data.queryTag[0].childTag[0].childPosts.length;
	$: currentCard = 0;

	function nextCard() {
		direction = 'right';
		currentCard = (currentCard + 1) % postCount;
	}

	function prevCard() {
		direction = 'left';
		if (currentCard != 0) {
			currentCard = (currentCard - 1) % postCount;
		} else {
			currentCard = postCount - 1;
		}
	}
</script>

<div class="flex  justify-center">
	<Navbar />

	<div class=" mx-4  grid h-full  md:w-3/4 md:max-w-[620px] overflow-hidden ">
		<SearchBar />

		<div class="flex">
			<div
				class="text-white font-semibold bg-secondary text-[26px] pt-[2px] pb-[4.5px] px-3 inline mt-4 rounded-md"
			>
				# {data.keyName}
			</div>
		</div>

		<Sort />

		<div class="text-red-400 ">
			{#each data.data.queryTag[0].childTag as i, index (i.id)}
				{#if i.name}
					<ChildTags childTagName={i.name} />
					<Collection
						any={data.data.queryTag[0].childTag[index].childPosts}
						postCount={navBarLength}
					/>
				{/if}
			{/each}
		</div>
	</div>
</div>

<!--this let's me get the response immediately from submitting the form. This could be a pop up showing successful submission/validation.  -->
<!-- <div class="bg-white">
	{#if form?.result}
		show this if form works
		<pre>{JSON.stringify(form.result.votes)}</pre>
	{/if}
</div> -->

<!-- {#each data.data.queryTag[0].childTag as i, index (i.id)}
	{#if i.name}
		<ChildTags childTagName={i.name} />
		<Collection any={data.data.queryTag[0].childTag[index].childPosts} postCount={navBarLength} />
	{/if}
{/each} -->
-->
