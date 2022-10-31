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
	let postCount: Number;

	$: direction = 'right';
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

		<!-- NAV CAROUSEL BAR BROUGHT IN FROM COLLECTION COMPONENT ------------------------>

		<div class="mt-2 flex transform justify-between ">
			<!-- Button left  -->
			<button on:click={prevCard}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-[26px] w-[26px] justify-center stroke-white stroke-[3px]"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
			</button>

			<!-- Nav dots group -->
			<div class="mx-12 flex h-[26px] items-center justify-center gap-1.5 ">
				{#each data.data.queryTag[0].childTag[0].childPosts as i, index (i.xid)}
					{#if currentCard === index}
						<div class="h-[18px] w-[18px]  rounded-sm bg-secondary" />
					{:else}
						<div class="h-[15px] w-[15px] rounded-sm bg-white" />
					{/if}
				{/each}
			</div>

			<!-- Button right -->
			<button on:click={nextCard}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-[26px] w-[26px] justify-center stroke-white stroke-[3px]"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>

		<!-- ---------------------------------------------------------------------------- -->

		<!-- <div class="text-orange-400">
			Rendering one instance of DisplayQuill with manual delta data entered and in the Card format:
			<Card>
				<span slot="topPost">
					<DisplayQuill
					deltaDataOutput={'{"ops":[{"insert":"and another "},{"attributes":{"bold":true},"insert":"maps-post-2"},{"insert":"\\n"}]}'}
					/>
				</span>
			</Card>
		</div> -->

		<!-- <div class="text-indigo-500 mt-4">
			just pure content without display quill:
			{#if extractedQueryTag.childTag[0].childPosts[0].content}
				{#each data.data.queryTag[0].childTag[0].childPosts as i, index}
					<div class="text-white">
						{i.content}
					</div>
				{/each}
			{/if}
		</div> -->

		<div class="text-green-500 mt-4">
			Display quill area:
			<Card>
				<span slot="topPost">
					{#each data.data.queryTag[0].childTag[0].childPosts as i, index}
						<div class="text-pink-300 p-2 outline-dashed m-2">
							rendering displayQuill in an each block with i.content:
							<DisplayQuill deltaDataOutput={i.content} />
						</div>
						<!-- <div class="text-blue-400  outline-dashed p-2 m-2">
							rendering displayQuill in the same each block but with manually inserting the delta
							data for one instance:
							<DisplayQuill
								deltaDataOutput={'{"ops":[{"insert":"and another "},{"attributes":{"bold":true},"insert":"maps-post-2"},{"insert":"\\n"}]}'}
							/>
						</div> -->
					{/each}
				</span>
			</Card>
		</div>

		<!-- <div class="text-red-500 mt-5">
			Collection component within an each block:
			{#each extractedQueryTag.childTag[0].childPosts as i}
				<Collection any={i.content} postCount={navBarLength} />
			{/each}
		</div> -->
	</div>
</div>
