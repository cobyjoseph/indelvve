<!-- TODO eventually:
- prerender data on the server side -->
<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import SearchBar from '$lib/SearchBar.svelte';
	import TopicHeader from '$lib/TopicHeader.svelte';
	import Collection from '$lib/Collection.svelte';
	import { postsStore } from '../lib/stores/postsStore';
	import { onMount } from 'svelte/internal';
	import Topic from '$lib/Topic.svelte';

	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import QuillEditor from '../lib/QuillEditor.svelte';

	// import EditorJS from '@editorjs/editorjs';

	// defineCustomElements();
	// let referenceVar;
	// let styloElement;
	// styloElement = referenceVar;

	export let data: PageData;

	let editor;
	let quillDelta;

	$: quillDeltaDerived = JSON.stringify(quillDelta);

	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, 'blockquote', 'link', 'image', 'video'],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'bullet' }, { list: 'ordered' }],
		[{ align: [] }],
		['clean']
	];

	onMount(async () => {
		const { default: Quill } = await import('quill');

		let quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
			},
			theme: 'snow',
			placeholder: 'Post here...'
		});
		// quill.root.innerHTML = innerText;
		// console.log(innerText);

		quill.on('text-change', function () {
			// let contents = JSON.parse(JSON.stringify(quill.getContents()));
			quillDelta = quill.getContents();
			console.log(quillDelta);
		});
	});

	// function collectFormInput() {
	// 	quillDelta = JSON.stringify(editor.innerHTML);
	// }
</script>

<div class="bg-white">
	Quill Delta stringify: {JSON.stringify(quillDelta)}
</div>
<div class="bg-white">
	Quill Delta not stringified: {quillDelta}
</div>
<div class="bg-white">
	Quill Delta derived stringified: {quillDeltaDerived}
</div>

<form class="bg-purple-200 " method="POST" action="?/actionNameTwo" use:enhance>
	<textarea
		class=" bg-teal-400 m-3"
		style="display:none"
		id="editor"
		name="inputField"
		bind:value={quillDeltaDerived}
	/>
	<div bind:this={editor} id="editor" />

	<button type="submit" class="bg-red-300 hover:bg-red-600">Submit</button>
</form>

<div class=" min-h-[50px] bg-red-400 p-2">
	{#each data.post as p (p.id)}
		<div class="h-8 bg-green-300 m-3">
			{p.upvoted_number}
			{p.content}
			{p.newContent}
		</div>
	{/each}
</div>

<QuillEditor />

<div class="flex flex-grow justify-center ">
	<Navbar />

	<div class=" relative mx-4 mb-6 grid h-full grid-cols-1 md:w-3/4 md:max-w-[620px] ">
		<SearchBar />

		<Topic />
		<TopicHeader />

		<Collection {$postsStore} />
		<Collection {$postsStore} />
	</div>
</div>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
