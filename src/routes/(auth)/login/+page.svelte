<script lang="ts">
	import type { ActionData } from './$types';
	//I haven't actually created the types file or the ActionData type. TODO

	export let form: ActionData;
</script>

<h1 class="text-white">Login</h1>

<form action="?/login" method="POST">
	<div>
		<label for="username" class="text-white">Username</label>
		<input id="username" name="username" type="text" required />
	</div>

	<div>
		<label for="username" class="text-white">Password</label>
		<input id="password" name="password" type="text" required />
	</div>

	{#if form?.invalid}
		<p class="error">Username and password is required.</p>
	{/if}

	{#if form?.credentials}
		<p class="error text-white">Your username or password is incorrect.</p>
	{/if}

	<button type="submit" class="text-white">Log in</button>
</form>
