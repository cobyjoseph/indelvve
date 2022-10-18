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
	import QuillInput from '../utils/Quill/DisplayQuill.svelte';
	// import { count } from 'console';

	export let data: PageData;
	// console.log(data.count);

	let postCount = data.post?.length;

	let editor;
	let quillDelta;
	let deltaData;
	let showTestInputContent: boolean = true;

	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, 'blockquote', 'link', 'image', 'video'],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'bullet' }, { list: 'ordered' }],
		[{ align: [] }],
		['clean']
	];

	let quill = null;

	onMount(async () => {
		const { default: Quill } = await import('quill');

		quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
			},
			// theme: 'snow',
			placeholder: 'Post here...'
		});

		quill.on('text-change', function () {
			quillDelta = quill.getContents();
		});
	});
</script>

<div transition:slide={{ duration: 300, easing: quintInOut }} />

<QuillInput />

<div>test to see if source control works don't know why this is here?</div>
<div class=" bg-green-500">i would have thought above would be gone on revert</div>


<div class="flex flex-grow justify-center">
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

	.ql-editor h1 {
		font-size: 32px;
	}
</style>
