<script lang="ts">
	import Card from '$lib/Card.svelte';
	import CollectionHeader from '$lib/CollectionHeader.svelte';
	import { fade, fly, scale, slide } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import {
		circIn,
		expoIn,
		expoOut,
		quartIn,
		quintIn,
		quintInOut,
		quintOut,
		sineInOut
	} from 'svelte/easing';
	import { sineIn, sineOut } from 'svelte/easing';

	import PostHeaderDark from '$lib/PostHeaderDark.svelte';
	import SortButtonLight from '$lib/SortButtonLight.svelte';

	import { postsStore } from './stores/postsStore';
	import AddCollectionBtnLight from '$lib/AddCollectionBtnLight.svelte';
	import PostInputField from '$lib/PostInputField.svelte';

	$: direction = 'right';
	$: currentCard = 0;

	let collectionHeight: number;

	let showInputContent: boolean = false;

	// Getting the data from the postsStore the long way so that I can access it's array lnngth
	let posts: any[];
	postsStore.subscribe((i) => {
		posts = i;
	});

	function nextCard() {
		direction = 'right';
		currentCard = (currentCard + 1) % posts.length;
	}

	function prevCard() {
		direction = 'left';
		if (currentCard != 0) {
			currentCard = (currentCard - 1) % posts.length;
		} else {
			currentCard = posts.length - 1;
		}
	}

	function togglePostInput() {
		showInputContent = !showInputContent;
	}
</script>

<div class="relative">
	<div class="boxShadow mt-4 mb-2   bg-boxBackground">
		<div class="px-5 pt-3">
			<CollectionHeader />
		</div>

		<div class="mx-1 overflow-hidden rounded-sm px-3  pt-2 pb-[0.5px] md:mx-3">
			<!-- Sort and add content group -->
			<div class="flex gap-3">
				<SortButtonLight />
				<button on:click={togglePostInput}>
					<AddCollectionBtnLight addText="content" />
				</button>
			</div>

			{#if showInputContent}
				<div transition:slide={{ duration: 300, easing: quintInOut }}><PostInputField /></div>
			{/if}

			{#each [posts[currentCard]] as post (post.id)}
				<div
					in:fly={{
						delay: 0,
						duration: direction === 'right' ? 300 : 300,
						x: direction === 'right' ? 100 : -100,
						easing: sineIn
					}}
					out:fly={{
						duration: 400,
						x: direction === 'right' ? -100 : 100,
						easing: sineOut
					}}
					animate:flip={{
						delay: 200,
						easing: quintOut
					}}
					class="mt-3 mb-4 "
				>
					<Card>
						<span slot="topPost">
							<div class="pt-2">
								<PostHeaderDark
									upvotes=130
									authorName="Nicolas Bloom"
									timeSince=34
									dOrMin="d"
								/>

								<div class="px-6 text-mainText ">
									{post.text}
								</div>
								<div class="mt-2 pb-2">
									<img src={post.src} alt="" />
								</div>
							</div>
						</span>

						<span slot="bottomPost">
							<div class="py-2">
								<PostHeaderDark
									upvotes=130
									authorName="Nicolas Bloom"
									timeSince=34
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
			{/each}

			<!-- Button group and nav dots group-->
			<div class="mb-3 flex transform justify-between ">
				<!-- Button left  -->
				<button on:click={prevCard}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-[26px] w-[26px] justify-center stroke-black stroke-[3px]"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
					</svg>
				</button>

				<!-- Nav dots group -->
				<div class="mx-12 flex h-[26px] items-center justify-center gap-1.5 ">
					{#each posts as post (post.id)}
						{#if currentCard + 1 === post.id}
							<div class="h-[15px] w-[15px]  rounded-sm bg-secondary" />
						{:else}
							<div class="h-[15px] w-[15px] rounded-sm bg-white" />
						{/if}
					{/each}
				</div>

				<!-- Button right -->
				<button on:click={nextCard}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-[26px] w-[26px] justify-center stroke-black stroke-[3px]"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>
		</div>
	</div>
</div>

<!-- current count: {currentCard}
prev count: {lastCard}
{direction} -->
<style>
	.boxShadow {
		box-shadow: -8px 8px 0 0 #8ebaf8;
	}
</style>
