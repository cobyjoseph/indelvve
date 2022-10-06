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

	// import EditorJS from '@editorjs/editorjs';

	// defineCustomElements();
	// let referenceVar;
	// let styloElement;
	// styloElement = referenceVar;

	export let data: PageData;

	let editor;

	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, 'blockquote', 'link', 'image', 'video'],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'bullet' }, { list: 'ordered' }],
		[{ align: [] }],
		['clean']
	];

	function collectFormInput() {
		{
			content = JSON.stringify(editor.innerHTML);
			// quill.root.innerHTML = innerText;
			// console.log(innerText);
			// FOR SOME REASON I CAN'T ACCESS THE QUILL OBJECT AND ITS PROPERTIES HERE, BUT I CAN WITHIN ON ONMOUNT.
			// let content = quill.getContents();
			// let justHtml = editor.innerHTML;
			// console.log(content);

			// console.log(justHtml);
		}
	}

	let content;
	let htmlContent;
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
			let content = quill.getContents();
			let htmlContent = quill.root.innerHTML;
			console.log(content);
			console.log(htmlContent);
		});
	});

	// let form;
	// let justHtmlContent;
	// let justHtml;

	// let parsedContent = JSON.parse(content);

	// let justHTMLContent = document.getElementById('justHTML');
	// editor.on('text-change', function () {
	// 	let justHTML = editor.root.innerHTML;
	// 	justHTMLContent = justHTML;
	// });

	// import { createEditor } from 'svelte-editorjs';
	// /* Uncomment and things break */
	// import Header from '@editorjs/header';
	// const { editor, data2, isReady } = createEditor({ tools: { Header } });
	// const { editor, data2, isReady } = createEditor();

	// $: {
	// 	if (isReady) {
	// 		console.log('Saved data:', $data);
	// 	}
	// }

	//NEXT STEPS
	// CHECK HOW THE SVELTE QUILL BINDINGS WORK
	// 1, GET LIVE BIDNING TO WORK
	//2 THEN FIGURE OU HOW TO BIND IT TO ON SUBMIT RATHER THAN ON TEXT CHANGE
</script>

<div class="bg-white">
	<!-- {content}
	{justHtmlContent}
	<div>inner text: {innerText}</div> -->
	{content}
	{htmlContent}
</div>

<div bind:this={content} />

<!-- <div class="editor" use:editor />
<button on:click={() => $editor.clear()}>Clear contents</button>
<button on:click={() => $editor.save()}>Save contents</button> -->

<!-- upload the data -----------------------------------------  -->
<!-- <div bind:this={referenceVar} contenteditable="true" class="mt-10">
	<form class="bg-blue-400" method="POST" action="?/actionNameOne" use:enhance>
		<textarea class="m-5 bg-slate-400" id="same" name="formName" bind:value={inputValue} />
		<stylo-editor bind:this={styloElement} id="same" />
		<input class="bg-slate-200 m-3" type="text" name="formName" bind:value={inputValue} /> -->
<!-- <button type="submit">Submit</button>
	</form>
</div> -->

<!-- --------------------------------------- ------------------------>

<form
	class="bg-purple-200"
	method="POST"
	action="?/actionNameTwo"
	use:enhance
	on:submit={collectFormInput}
>
	<textarea class=" bg-teal-400 m-3" style="display:none" name="inputField" />
	<div bind:this={editor} />

	<button type="submit" class="bg-red-300 hover:bg-red-600">Submit</button>
</form>

<!-- ^THIS ABOVE HAS ALWAYS JUST BEEN SENDING THE DATA FROM THE INPUT FIELD. NEVER FROM THE DIV EDITOR FIELD. 
	THAT'S WHY I WOULD SUBMIT DATA AND THE NEWCONTENT FIELD WOULD BE "", 
	BECAUSE THE INPUT FIELD WAS BLANK SO THERE WAS NO DATA. 
	Making the id the same doesn't change that or seem to do anything at all.  

Doesn't seem to be any need to bind the input field to anything, that doesn't connect it to the data being uploaded. 
That is done through the name field which is picked up on the back end.  
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

<!-- ---------------EVERYTHING ABOVE IS JUST EXPERIMENTING WITH PASSING DATA------------------------------------- -->

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

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
