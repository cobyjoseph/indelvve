<script lang="ts">
	// import { page } from '$app/stores';
	import { createClient, setContextClient } from '@urql/svelte';
	import { dataset_dev } from 'svelte/internal';
	import '../app.css';

	const client = createClient({
		url: `https://blue-surf-640086.us-east-1.aws.cloud.dgraph.io/graphql`
	});

	setContextClient(client);
</script>

<!-- <nav>
	{#if !$page.data.user}
		<a href="/login" class="text-white">Login</a>
		<a href="/register" class="text-white">Sign up</a>
	{/if}

	{#if $page.data.user}
		<a href="/admin" class="text-white">Admin</a>

		<form action="/logout" method="POST" class="text-white">
			<button type="submit">Log out</button>
		</form>
	{/if}
</nav> -->

<main>
	<slot />
</main>
