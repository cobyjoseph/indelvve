<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Collection from '$lib/components/Collection.svelte';
	import type { PageData } from './$types';
	import ChildTags from '$lib/components/ChildTags.svelte';
	import Sort from '$lib/components/Sort.svelte';

	export let data: PageData;
	let form;

	let extractedData = Object.values(data);
	console.log('extractedData:', extractedData);

	$: navBarLength = data.data.queryTag[0]['Tag.childTag'][0]['Tag.childPosts'].length;

	console.log('data', data);

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

<!-- NEXT step - recreate the childTags object piece by piece. Then do the same for collection. Something in there is causing the issue -->

<div class="text-white">
	data.slugName: {data.slugName}
	<div>
		{data.data.queryTag[0]['Tag.childTag'][0]['Tag.childPosts']}
	</div>
	<!-- {#each data.data.queryTag[0]['Tag.childTag'] as i}
		{i['Tag.name']}
	{/each} -->

	<!-- <ChildTags childTagName={extractedData[1].queryTag[0]['Tag.childTag'][0]['Tag.name']} /> -->

	<!-- i.queryTag[0]['Tag.childTag']['Tag.name'] -->

	<!-- {#each data.data.queryTag[0]['Tag.childTag'] as i, index}
		<ChildTags childTagName={i['Tag.name']} />
	{/each} -->

	<div class="text-white outline outline-2 outline-green-500">
		trying to render post here:

		<!-- {#each data.data.queryTag[0]['Tag.childTag'] as i, index}
			{i['Tag.childPosts']}
		{/each} -->
	</div>
</div>

<div class="flex  justify-center">
	<Navbar />

	<div class=" mx-4  grid h-full  md:w-3/4 md:max-w-[620px] overflow-hidden ">
		<SearchBar />

		<div class="flex">
			<div
				class="text-white font-semibold bg-secondary text-[26px] pt-[2px] pb-[4.5px] px-3 inline mt-4 rounded-md"
			>
				# {data.slugName}
			</div>
		</div>

		<Sort />

		<div class="text-red-400 ">
			{#each data.data.queryTag[0]['Tag.childTag'] as i, index}
				{#if i['Tag.name']}
					<ChildTags childTagName={i['Tag.name']} />
					{#each [data.data.queryTag[0]['Tag.childTag']] as inner, innerIndex}
						<Collection
							any={data.data.queryTag[0]['Tag.childTag'][innerIndex]['Tag.childPosts']}
							postCount={navBarLength}
						/>
					{/each}
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
