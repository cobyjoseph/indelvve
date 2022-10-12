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
	import AddCollectionBtnLight from '$lib/AddCollectionBtnLight.svelte';
	import { slide } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';

	export let data: PageData;
	console.log(data.post);

	let postCount = data.post?.length;
	//THIS ISN'T WORKING BELOW BECAUSE THERE IS NOT JUST ONE ID FOR THE POST DATA FIELD. IT WORKED FOR LENGHT BECAUSE THERE IS ONE LENGHT. BUT FOR THE ID TO WORK I THINK I NEED TO LOOP THROUGH THEM ALL. NOT SURE EXACTLY.
	// dont think I need this though
	// let id = data.post.id;

	let editor;
	let quillDelta;
	let deltaData;
	let showInputContent: boolean = false;

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
		});

		quill.setContents(JSON.parse(deltaData));
	});

	function togglePostInput() {
		showInputContent = !showInputContent;
		console.log(showInputContent);
	}
</script>

<button on:click={togglePostInput}>
	<AddCollectionBtnLight addText="content" />
</button>

{#if showInputContent}
	<div transition:slide={{ duration: 300, easing: quintInOut }} />
{/if}

<form class="bg-purple-200 " method="POST" action="?/actionName" use:enhance>
	<textarea
		class=" bg-teal-400 m-3"
		style="display:none"
		name="inputField"
		bind:value={quillDeltaDerived}
	/>
	<div bind:this={editor} />

	<button type="submit" class="bg-red-300 hover:bg-red-600">Submit</button>
</form>

<div class="flex flex-grow justify-center ">
	<Navbar />

	<div class=" relative mx-4 mb-6 grid h-full grid-cols-1 md:w-3/4 md:max-w-[620px] ">
		<SearchBar />

		<Topic />
		<TopicHeader />

		<Collection posts={data.post} {postCount} />
		<Collection posts={data.post} {postCount} />
	</div>
</div>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
