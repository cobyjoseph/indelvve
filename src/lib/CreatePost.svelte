<script lang="ts">
	let postContent: string;

	let createPostPromise = Promise.resolve({});
	function handleCreatePost() {
		createPostPromise = createPost({ user: getUser(), content: postContent });
	}
</script>

<div class="col-1 grid-col-1">
	<form on:submit={handleCreatePost} class="w-full">
		<textarea
			rows="5"
			name="postInputText"
			aria-label="Add post"
			bind:value={postContent}
			on:input
			placeholder="Add post"
			class="mt-2 rounded-sm px-2 py-1 text-mainText  "
		/>
		{#await createPostPromise}
			<button disabled class="grid bg-white px-3 py-1 font-medium outline outline-2 outline-black"
				>Submit post</button
			>
		{:then { data, error }}
			<button class="grid bg-white px-3 py-1 font-medium outline outline-2 outline-black"
				>Submit post</button
			>
			{#if data}
				<p>post created!</p>
			{/if}
			<p>error</p>
		{/await}
	</form>
</div>
