<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';

	import Collection from '$lib/components/Collection.svelte';
	import { onMount } from 'svelte/internal';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import AddCollectionBtnLight from '$lib/components/AddCollectionBtnLight.svelte';
	import { slide } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import QuillInput from '$lib/quill/DisplayQuill.svelte';

	export let data: PageData;
	console.log(data)

	let postCount = data.post?.length;
</script>

<div class="flex flex-grow justify-center">
	<Navbar />

	<div class=" relative mx-4 mb-6 grid h-full grid-cols-1 md:w-3/4 md:max-w-[620px] ">
		<SearchBar />

		<Collection any={data.post} {postCount} />
	</div>
</div>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';

	.ql-editor h1 {
		font-size: 12px;
	}
</style>
