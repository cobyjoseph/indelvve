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
	import PostHeader from './PostHeader.svelte';
	import QuillInput from '$lib/quill/QuillInput.svelte';

	export let posts;
	// export let any;
	export let postCount: Number;

	let showInputContent: boolean = false;
	let showComments: boolean = false;
	let showInput: boolean = true;

	let inputText = '';
	let submittedText = '';

	$: direction = 'right';
	$: currentCard = 0;

	console.log('plain text demo', posts.plainTextDemoOnly);

	function handleSubmit() {
		submittedText = inputText;
		showInput = !showInput;
	}

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
		{#each posts as i, index (i.id)}
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
		<Card>
			<span slot="topPost">
				<PostHeader
					upvotes={post.upvoted_number}
					authorName={post.postAuthorDemoOnly}
					timeSince={post.timeSinceDemoOnly}
					dOrMin={post.unitSinceDemoOnly}
				/>
				<!-- <DisplayQuill deltaDataOutput={post.content} /> -->
				<div class="text-white px-7 py-3 flex flex-col ">
					<div>
						{post.plainTextDemoOnly}
					</div>
					<img class="pt-3 pb-1" src={post.seperateImageDemoOnly} alt="" />
					<div>
						<svg
							on:click={() => (showComments = !showComments)}
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-5 h-5 mt-3 hover-fill {showComments ? 'click-fill' : ''}"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
							/>
						</svg>
					</div>
					{#if showComments}
						{#if showInput}
							<div
								transition:slide={{ duration: 300, easing: quintInOut }}
								class="flex w-full py-3 gap-4"
							>
								<input
									bind:value={inputText}
									class="flex flex-grow bg-opacity-10 text-white rounded-md px-4 py-[0.15rem] bg-white"
									placeholder="Add comment here"
								/>
								<div
									on:click={handleSubmit}
									class="hover:cursor-pointer text-white flex font-semibold bg-secondary hover:bg-third text-[14px]  px-3 items-center rounded-md"
								>
									Submit
								</div>
							</div>
						{/if}

						{#if submittedText}
							<div
								transition:slide={{ duration: 300, easing: quintInOut }}
								class="text-white flex flex-col flex-grow bg-opacity-10  rounded-md px-4 py-2 mt-3 mb-1 bg-white gap-2 "
							>
								<div class=" italic flex gap-5">
									<div class="flex gap-[0.3rem] mr-8">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-[23px] w-[23px] fill-transparent stroke-white stroke-1 hover:fill-white"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
											/>
										</svg>
										<div class="flex">0</div>
									</div>

									<div class="mr-8 flex gap-[0.3rem] items-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class=" h-[19px] w-[19px] place-self-center stroke-white stroke-1"
											fill="none"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
											/>
										</svg>
										<div class="">Coby Joseph</div>
									</div>

									<div class="mr-8 flex gap-[0.3rem] items-center">
										<div>just now</div>
									</div>
								</div>
								<div class="pb-1">
									{submittedText}
								</div>
							</div>
						{/if}
					{/if}
				</div>
			</span>
		</Card>
	</div>
{/each}

<!-- THE COMMENTED OUT CODE BEFORE WAS WHAT I WAS USING FOR DGRAPH, GOT RID OF IT WHEN i WENT BACK TO USING PRISMA AND POSTGRES FOR THE PURPOSE SOF THE PORTFOLIO DEMO -->

<!-- {#each [any[currentCard]] as i (i.id)}
	<div
		class="pt-2 "
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
		<Card>
			<span slot="topPost">
				<div class="m-2">
					<!-- <PostHeader upvotes={i.postUpvotesAggregate.count} currentPostXID={i.xid} /> -->

<!-- </div>
				<DisplayQuill deltaDataOutput={i['Post.content']} />
			</span>
		</Card>
	</div>
{/each} -->
<style>
	.hover-fill:hover {
		fill: white;
		cursor: pointer;
	}

	.click-fill {
		fill: white;
	}
</style>
