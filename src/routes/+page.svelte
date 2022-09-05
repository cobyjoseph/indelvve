<!-- TODO eventually:
- prerender data on the server side -->
<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import SearchBar from '$lib/SearchBar.svelte';
	import TopicHeader from '$lib/TopicHeader.svelte';
	import Collection from '$lib/Collection.svelte';
	import { postsStore } from '../lib/stores/postsStore';
	import { append, each, onMount } from 'svelte/internal';
	import Topic from '$lib/Topic.svelte';
	import { isOverlayOpen } from '../lib/stores/LoginStore';
	import LoginOverlay from '$lib/LoginOverlay.svelte';
	import CreatePost from '$lib/CreatePost.svelte';
	import type { PageServerData } from './$types';

	let testPost;
	let showSignup = false;

	let enteredPost = '';
	export let data: PageServerData;
	import type { PostType } from '../types/types';
	export let postArr: PostType[] = [];

	// export const load: Load = async ({ fetch }) => {
	// 	const res = await fetch('/todos.json');

	// 	if (res.ok) {
	// 		const todos = await res.json();

	// 		return {
	// 			props: { todos }
	// 		};
	// 	}

	// 	const { message } = await res.json();

	// 	return {
	// 		error: new Error(message)
	// 	};
	// };
</script>

<!-- <form action="/api" method="post">
	<input type="text" name="createPost" bind:value={enteredPost} />
	<button type="submit">Submit</button>
</form> -->

{#each postArr as p (p.id)}
	<li>
		{p.data.post.upvoted_number}
	</li>
{/each}

{data.post.upvoted_number}

<div class="flex flex-grow justify-center ">
	<Navbar />

	<div class=" relative mx-4 mb-6 grid h-full grid-cols-1 md:w-3/4 md:max-w-[620px] ">
		<SearchBar />

		<!-- <CreatePost /> -->
		{#if $isOverlayOpen}
			<LoginOverlay />
		{/if}

		<Topic />
		<TopicHeader />

		<Collection {$postsStore} />
		<Collection {$postsStore} />
	</div>
</div>
