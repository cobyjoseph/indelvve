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
	// import { isOverlayOpen } from '../lib/stores/LoginStore';
	import LoginOverlay from '$lib/LoginOverlay.svelte';
	import CreatePost from '$lib/CreatePost.svelte';
	import type { PageServerData } from './$types';
	import type { PostType } from '../types/types';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import EditorJS from '@editorjs/editorjs';

	let testPost;
	let showSignup = false;

	export let inputValue = '';
	export let data: PageData;

	console.log(data);

	// let editor;
	// export let input;

	// export let toolbarOptions = [
	// 	[{ header: 1 }, { header: 2 }, 'blockquote', 'link', 'image', 'video'],
	// 	['bold', 'italic', 'underline', 'strike'],
	// 	[{ list: 'ordered' }, { list: 'ordered' }],
	// 	[{ align: [] }],
	// 	['clean']
	// ];

	// onMount(async () => {
	// 	const { default: Quill } = await import('quill');

	// 	let quill = new Quill(editor, {
	// 		modules: {
	// 			toolbar: toolbarOptions
	// 		},
	// 		theme: 'snow',
	// 		placeholder: 'Post here...'
	// 	});
	// });

	import { createEditor } from 'svelte-editorjs';
	/* Uncomment and things break */
	import Header from '@editorjs/header';
	const { editor, data2, isReady } = createEditor({ tools: { Header } });
	const { editor, data2, isReady } = createEditor();

	$: {
		if (isReady) {
			console.log('Saved data:', $data);
		}
	}
</script>

<div class="editor" use:editor />
<button on:click={() => $editor.clear()}>Clear contents</button>
<button on:click={() => $editor.save()}>Save contents</button>

<!-- upload the data -----------------------------------------  -->

<form class="bg-blue-400" method="POST" action="?/actionNameOne" use:enhance>
	<input class="bg-slate-200 m-3" type="text" name="formName" bind:value={inputValue} />
	<button type="submit">Submit</button>
</form>

<!-- --------------------------------------- ------------------------>

<!-- <form class="bg-purple-200" method="POST" action="?/actionNameTwo" use:enhance>
	<div class="editor-wrapper">
		<textarea id="x" class="bg-teal-400 m-3" name="inputField" />
		<div id="x" bind:this={editor} />
	</div>
	<button type="submit" class="bg-red-300 hover:bg-red-600">Submit</button>
</form> -->

<!-- THIS HAS ALWAYS JUST BEEN SENDING THE DATA FROM THE INPUT FIELD. NEVER FROM THE DIV EDITOR FIELD. THAT'S WHY I WOULD SUBMIT DATA AND THE NEWCONTENT FIELD WOULD BE "", BECAUSE THE INPUT FIELD WAS BLANK SO THERE WAS NO DATA. Making the id the same doesn't change that or seem to do anything at all.  

Doesn't seem to be any need to bind the input field to anything, that doesn't connect it to the data being uploaded. That is done through the name field which is picked up on the back end.  
-->

<!-- display the data--------------------------------------------- -->
<div class=" min-h-[50px] bg-red-400 p-2">
	{#each data.post as p (p.id)}
		<div class="h-8 bg-green-300 m-3">
			{p.upvoted_number}
			{p.content}
			{p.newContent}
		</div>
	{/each}
</div>
<!-- ------------------------------------------------------------- -->

<div class="flex flex-grow justify-center ">
	<Navbar />

	<div class=" relative mx-4 mb-6 grid h-full grid-cols-1 md:w-3/4 md:max-w-[620px] ">
		<SearchBar />

		<!-- <CreatePost /> -->
		<!-- {#if $isOverlayOpen}
			<LoginOverlay />
		{/if} -->

		<Topic />
		<TopicHeader />

		<Collection {$postsStore} />
		<Collection {$postsStore} />
	</div>
</div>

<!-- <style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style> -->
