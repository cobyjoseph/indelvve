<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import SearchBar from '$lib/SearchBar.svelte';
	import TopicHeader from '$lib/TopicHeader.svelte';
	import Collection from '$lib/Collection.svelte';
	import { postsStore } from '../lib/stores/postsStore';
	import { each } from 'svelte/internal';
	import Topic from '$lib/Topic.svelte';

	import { isOverlayOpen } from '../lib/stores/LoginStore';
	import LoginOverlay from '$lib/LoginOverlay.svelte';
	import CreatePost from '$lib/CreatePost.svelte';

	let testPost;
	let showSignup = false;
</script>

<img src="../static/redox_01" alt="" />

<div class="flex flex-grow justify-center ">
	<Navbar />

	<main class=" relative mx-4 mb-6 grid h-full grid-cols-1 md:w-3/4 md:max-w-[620px] ">
		<SearchBar />

		<!-- <CreatePost /> -->
		{#if $isOverlayOpen}
			<LoginOverlay />
		{/if}

		test change

		<Topic />
		<TopicHeader />

		<Collection {$postsStore} />
		<Collection {$postsStore} />
	</main>
</div>
