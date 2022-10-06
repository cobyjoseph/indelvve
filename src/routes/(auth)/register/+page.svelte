<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h1 class="text-white p-2">Register</h1>

<form action="?/register" method="POST">
	<div class=" p-2">
		<label for="username" class="text-white">Username</label>
		<input id="username" name="username" type="text" class="text-black" required />
	</div>

	<div class="p-2">
		<label for="username" class="text-white">Password</label>
		<input id="password" name="password" type="password" class="text-black" required />
	</div>

	{#if form?.user}
		<p class="error text-white p-2">Username is taken.</p>
	{/if}

	<div class="p-2">
		<label for="email" class="text-white">Email</label>
		<input id="email" name="email" type="text" class="text-black" required />
	</div>

	<div class="p-2">
		<label for="first_name" class="text-white">First Name</label>
		<input id="first_name" name="first_name" type="text" class="text-black" required />
	</div>

	<div class="p-2">
		<label for="last_name" class="text-white">Last Name</label>
		<input id="last_name" name="last_name" type="text" class="text-black" required />
	</div>

	<button type="submit" class="text-white outline outline-1 px-2 outline-white">Submit</button>
</form>
