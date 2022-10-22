<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import TopicHeader from '$lib/components/TopicHeader.svelte';
	import Collection from '$lib/components/Collection.svelte';
	import { onMount } from 'svelte/internal';
	import Topic from '$lib/components/Topic.svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import AddCollectionBtnLight from '$lib/components/AddCollectionBtnLight.svelte';
	import { slide } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import QuillInput from '$lib/quill/DisplayQuill.svelte';
	import trpcClient from '$lib/client/trpcClient';

	export let data: PageData;
	// console.log(data);

	let postCount = data.post?.length;

	//use trpc to query getPosts folder or make fetch request from here.
</script>

<!-- --------------------------------------------------------- -->
<div class="text-white font-bold">Experimental area:</div>

<div class="w-full h-1 bg-white mt-5" />

<!-- ------------------------------------------------------- -->

<QuillInput />

<div class="flex flex-grow justify-center">
	<Navbar />

	<div class=" relative mx-4 mb-6 grid h-full grid-cols-1 md:w-3/4 md:max-w-[620px] ">
		<SearchBar />

		<Topic />
		<TopicHeader />

		<Collection any={data.post} {postCount} />
	</div>
</div>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';

	.ql-editor h1 {
		font-size: 12px;
	}
</style>
