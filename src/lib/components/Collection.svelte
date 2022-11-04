<script lang="ts">
	import Card from '$lib/components/Card.svelte';
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
	import DisplayQuill from '$lib/quill/DisplayQuill.svelte';
	import QuillInput from '$lib/quill/QuillInput.svelte';
	import PostHeader from './PostHeader.svelte';

	export let any;
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
		{#each any as i, index (i.id)}
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

{#each [any[currentCard]] as i (i.id)}
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
		<div />
		<Card>
			<span slot="topPost">
				<div class="m-2">
					<PostHeader upvotes={i.postUpvotesAggregate.count} />
				</div>
				<DisplayQuill deltaDataOutput={i.content} />
			</span>
		</Card>
	</div>
{/each}

<style>
	/* .boxShadow {
		box-shadow: -8px 8px 0 0 #33385a;
	} */
</style>
