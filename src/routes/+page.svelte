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
	import type { PostType } from '../types/types';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { defineCustomElements } from '@papyrs/stylo/dist/loader';
	import '@papyrs/stylo';
	import { createEmptyElement } from '@papyrs/stylo';

	defineCustomElements();

	let testPost;
	let showSignup = false;

	export let inputValue = '';
	export let data: PageData;
</script>

<form class="bg-blue-400" method="POST" action="?/actionNameOne" use:enhance>
	<input class="bg-slate-400 m-3" type="text" name="formName" bind:value={inputValue} />
	<button type="submit">Submit</button>
</form>

<div class="m-2">
	<stylo-editor />
	<article contenteditable="true" />
</div>

<div class=" min-h-[50px] bg-red-400 p-2">
	{#each data.post as p (p.id)}
		<div class="h-8 bg-green-300 m-3">
			{p.upvoted_number}
			{p.content}
		</div>
	{/each}
</div>

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
