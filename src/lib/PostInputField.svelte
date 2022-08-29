<script lang="ts">
	import { postsStore } from './stores/postsStore';

	let post: any[];
	let posts: any[];
	let text: string;
	let id: number;
	let src: string;

	const handleSubmit = () => {
		addPost(post);
		post = '';
	};

	postsStore.subscribe((value) => {
		posts = value;
	});

	function addContent() {
		postsStore.update((posts) => {
			return [
				...posts,
				{
					id: id,
					text: text,
					src: src
				}
			];
		});
	}
</script>

<div class="mb-5">
	<form on:submit|preventDefault={handleSubmit}>
		<div class="grid grid-cols-1 rounded-sm ">
			<textarea
				rows="5"
				name="postInputText"
				aria-label="Add content"
				bind:value={post}
				on:input
				placeholder="Add post to this collection "
				class="mt-2 rounded-sm px-2 py-1 text-mainText  "
			/>
			<!-- <input type="text" name="idInput" bind:value={id} class="mt-1" />
		<input type="text" name="srcInput" bind:value={src} class="mt-1" /> -->
			<div class="mt-2">
				<button
					type="submit"
					class="-mb-2 flex rounded-sm bg-accent px-3 font-medium text-mainDark "
				>
					Submit
				</button>
			</div>
		</div>
	</form>
</div>
