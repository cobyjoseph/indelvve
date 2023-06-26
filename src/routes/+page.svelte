<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import QuillInput from '$lib/quill/QuillInput.svelte';
	import Collection from '$lib/components/Collection.svelte';
	import ChildTags from '$lib/components/ChildTags.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	console.log('data on home +page.svelte', data);

	let postCount = data.post?.length;
</script>

<div class="flex flex-grow justify-center">
	<Navbar />

	<div class=" relative mx-4 mb-6 grid h-full grid-cols-1 md:w-3/4 md:max-w-[620px] ">
		<SearchBar />

		<ChildTags childTagName="test" />

		<Collection posts={data.post} {postCount} />
	</div>
</div>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';

	/* .ql-editor h1 {
		font-size: 12px;
	} */
</style>
