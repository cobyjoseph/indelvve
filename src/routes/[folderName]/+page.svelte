<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Collection from '$lib/components/Collection.svelte';
	import type { PageData } from './$types';
	import ChildTags from '$lib/components/ChildTags.svelte';
	import Sort from '$lib/components/Sort.svelte';
	import DisplayQuill from '$lib/quill/DisplayQuill.svelte';
	import Card from '$lib/components/Card.svelte';

	export let data: PageData;
	console.log(data.data);

	let extractedQueryTag = data.data.queryTag[0];

	let navBarLength = data.data.queryTag[0].childTag[0].childPosts.length;
	console.log('childPosts', data.data.queryTag[0].childTag[0].childPosts);
	console.log('navBarLength', navBarLength);
	console.log(
		'extractedQueryTag.childTag[0].childPosts:',
		extractedQueryTag.childTag[0].childPosts
	);

	let childTags: String;
</script>

<div class="flex  justify-center">
	<Navbar />

	<div class=" mx-4  grid h-full  md:w-3/4 md:max-w-[620px] ">
		<SearchBar />

		{navBarLength}

		<div class="flex">
			<div
				class="text-white font-semibold bg-secondary text-[26px] pt-[2px] pb-[4.5px] px-3 inline mt-4 rounded-md"
			>
				# {data.keyName}
			</div>
		</div>

		<Sort />

		<div class="text-red-400 mt-4">
			{#each extractedQueryTag.childTag as i}
				{#if i.name}
					<ChildTags childTagName={i.name} />
				{/if}
			{/each}
		</div>

		{#each data.data.queryTag[0].childTag[0].childPosts as i, index}
			<div class="text-white">
				{i.content}
			</div>
		{/each}

		<!-- <div>
			<Card>
				<span slot="topPost">
					<DisplayQuill deltaDataOutput={extractedQueryTag.childTag[0].childPosts[0].content} />
				</span>
			</Card>
		</div> -->

		<Card>
			<span slot="topPost">
				<DisplayQuill
					deltaDataOutput={'{"ops":[{"insert":"back to "},{"attributes":{"bold":true},"insert":"maps-post-3"},{"insert":"\\n"}]}'}
				/>
			</span>
		</Card>

		<!-- <Collection any={extractedQueryTag.childTag[0].childPosts} postCount={navBarLength} /> -->

		<!-- {#each extractedQueryTag.childTag[0].childPosts as i}
			{#if i.content}
				<Collection any={i.content} postCount={navBarLength} />
				{i.content}
			{/if}
		{/each} -->
	</div>
</div>
