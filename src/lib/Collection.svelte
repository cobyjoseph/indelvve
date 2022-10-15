<script lang="ts">
	import Card from '$lib/Card.svelte';
	import CollectionHeader from '$lib/CollectionHeader.svelte';
	import { fade, fly, scale, slide } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import {
		sineIn,
		sineOut,
		circIn,
		expoIn,
		expoOut,
		quartIn,
		quintIn,
		quintInOut,
		quintOut,
		sineInOut
	} from 'svelte/easing';
	import PostHeaderDark from '$lib/PostHeaderDark.svelte';
	import DisplayQuill from '../utils/Quill/DisplayQuill.svelte';
	import AddCollectionBtnLight from './AddCollectionBtnLight.svelte';
	import QuillInput from '../utils/Quill/QuillInput.svelte';

	export let posts;
	export let postCount: Number;
	let showInputContent: boolean = false;

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

	function togglePostInput() {
		showInputContent = !showInputContent;
	}
</script>

<button on:click={togglePostInput}>
	<AddCollectionBtnLight addText="content" />
</button>

{#if showInputContent}
	<div transition:slide={{ duration: 300, easing: quintInOut }} />
	<div>
		<QuillInput />
	</div>
{/if}

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
		{#each posts as post, i (post.id)}
			{#if currentCard === i}
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

{#each [posts[currentCard]] as post (post.id)}
	<div
		class="pt-2"
		in:fly={{
			delay: 0,
			duration: direction === 'right' ? 300 : 300,
			x: direction === 'right' ? 100 : -100,
			easing: sineIn
		}}
		out:fly={{
			duration: 600,
			x: direction === 'right' ? -100 : 100,
			easing: sineOut
		}}
		animate:flip={{
			delay: 0,
			easing: quintOut
		}}
	>
		<div class="boxShadow">
			<Card>
				<span slot="topPost">
					<PostHeaderDark upvotes="130" authorName="Nicolas Bloom" timeSince="34" dOrMin="d" />
					<DisplayQuill deltaDataOutput={post.content} />
				</span>
			</Card>
		</div>
	</div>
{/each}

<!-- <div class="relative">
	<div class="mt-4 rounded-sm  bg-white bg-opacity-5 ">
		<div class="px-6 pt-3">
			<CollectionHeader />
		</div> -->

<!-- <div class=" overflow-hidden rounded-sm px-3  pt-2 pb-[0.5px] md:mx-3"> -->
<!-- Sort and add content group -->
<!-- <div class="flex gap-3 ml-0.5">
				<SortButtonLight />
				<button on:click={togglePostInput}>
					<AddCollectionBtnLight addText="content" />
				</button>
			</div> -->

<!-- {#if showInputContent}
				<div transition:slide={{ duration: 300, easing: quintInOut }} />
			{/if} -->

<!-- {#each [posts[currentCard]] as post (post.id)}
				<div
					in:fly={{
						delay: 0,
						duration: direction === 'right' ? 300 : 300,
						x: direction === 'right' ? 100 : -100,
						easing: sineIn
					}}
					out:fly={{
						duration: 600,
						x: direction === 'right' ? -100 : 100,
						easing: sineOut
					}}
					animate:flip={{
						delay: 0,
						easing: quintOut
					}}
					class="mt-3 mb-4 "
				>
					<Card>
						<span slot="topPost">
							<div class="pt-2">
								<PostHeaderDark
									upvotes="130"
									authorName="Nicolas Bloom"
									timeSince="34"
									dOrMin="d"
								/>

								<div class="px-6 text-white ">
									{post.text}
								</div>
								<div class="mt-2 ">
									<img src={post.src} alt="" />
								</div>
							</div>
						</span>

						<span slot="bottomPost">
							<div class="py-1">
								<PostHeaderDark
									upvotes="130"
									authorName="Nicolas Bloom"
									timeSince="34"
									dOrMin="d"
								/>
								<div class="px-6">
									{post.text}
								</div>
								<div class="mt-2 opacity-0">
									<img src={post.src} alt="" />
								</div>
							</div>
						</span>
					</Card>
				</div>
			{/each} -->

<!-- Button group and nav dots group-->
<!-- <div class="mb-3 mt-5 flex transform justify-between ">
				Button left  -->
<!-- <button on:click={prevCard}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-[26px] w-[26px] justify-center stroke-white stroke-[3px]"
		fill="none"
		viewBox="0 0 24 24"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
	</svg>
</button> -->

<!-- Nav dots group -->
<!-- <div class="mx-12 flex h-[26px] items-center justify-center gap-1.5 ">
					{#each OutputArray as OA (OA.id)}
						{#if currentCard + 1 === OA.id}
							<div class="h-[15px] w-[15px]  rounded-sm bg-secondary" />
						{:else}
							<div class="h-[15px] w-[15px] rounded-sm bg-white" />
						{/if}
					{/each}
				</div> -->

<!-- Button right -->
<!-- <button on:click={nextCard}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-[26px] w-[26px] justify-center stroke-white stroke-[3px]"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
					</svg>
				</button> -->
<!-- </div>
		</div>
	</div>
</div> -->

<!-- current count: {currentCard}
prev count: {lastCard}
{direction} -->
<style>
	.boxShadow {
		box-shadow: -8px 8px 0 0 #33385a;
	}
</style>
