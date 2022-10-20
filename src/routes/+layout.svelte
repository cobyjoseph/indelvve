<script lang="ts">
	// import { page } from '$app/stores';

	import { dataset_dev } from 'svelte/internal';
	import '../app.css';
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
