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
	import { getContextClient, gql, queryStore } from '@urql/svelte';

	export let data: PageData;
	console.log(data)

	let postCount = data.post?.length;

	const testQuery = queryStore({
		client: getContextClient(),
		query: gql`
			query AllPeople {
				queryPerson {
					name
					id
					content
				}
			}
		`
	});
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

		<!-- <Collection any={$testQuery.data.queryPerson} {postCount} /> -->
		<Collection any={data.post} {postCount} />
	</div>
</div>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';

	.ql-editor h1 {
		font-size: 12px;
	}
</style>
