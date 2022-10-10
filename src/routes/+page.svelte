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
	import QuillOutput from '$lib/QuillOutput.svelte';

	// import EditorJS from '@editorjs/editorjs';

	// defineCustomElements();
	// let referenceVar;
	// let styloElement;
	// styloElement = referenceVar;

	export let data: PageData;
	console.log(data.post);

	let editor;
	let quillDelta;
	let deltaData;

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

		quill.on('text-change', function () {
			quillDelta = quill.getContents();
			console.log(quillDelta);
		});
		deltaData = data.post[1].newContent;
		// JSON.stringify(
		// THIS DATA BELOW DOESN'T WORK WITH THE CURRENT SET UP. NOT SURE WHY, SINCE IT SEEMS TO ALSO BE DELTA DATA, WHICH IS THE SAME AS WHAT DATA.POST[1].NEWCONTENT IS, AND THAT WORKS
		// FOUND THE ANSWER, IT DOES WORK IF YOU JSON.STRINGIFY THE DELTA OBJECT. BUT FOR SOME REASON I DON'T HAVE TO JSON.STRINGIFY THE DATA.POST[1].NEWCONTENTS
		// {
		// 	ops: [
		// 		{ insert: 'test delta ' },
		// 		{ attributes: { bold: true }, insert: 'data' },
		// 		{ insert: '\n' }
		// 	]
		// });
		quill.setContents(JSON.parse(deltaData));
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

<QuillEditor />
<QuillOutput OutputArray={data.post} />

<form class="bg-purple-200 " method="POST" action="?/actionNameTwo" use:enhance>
	<textarea
		class=" bg-teal-400 m-3"
		style="display:none"
		name="inputField"
		bind:value={quillDeltaDerived}
	/>
	<div bind:this={editor} />

	<button type="submit" class="bg-red-300 hover:bg-red-600">Submit</button>
</form>

<div class=" min-h-[100px] bg-red-400 p-2 editor-wrapper">
	{#each data.post as p (p.id)}
		<div class="h-8 bg-green-300 m-3">
			{p.newContent}
		</div>
	{/each}
</div>

<!-- <QuillEditor  /> -->

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
