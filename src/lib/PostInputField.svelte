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

	// FOR QUILL ______________________________________________________
	import { onMount } from 'svelte';

	let editor;

	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, 'blockquote', 'link', 'image', 'video'],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'ordered' }, { list: 'ordered' }],
		[{ align: [] }],
		['clean']
	];

	onMount(async () => {
		const { default: Quill } = await import('quill');

		let quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
			},
			theme: 'snow',
			placeholder: 'Write your story...'
		});
	});
	// END OF QUILL
</script>

<div class="editor-wrapper bg-[#f5f8fa] mt-3 ">
	<div bind:this={editor} />
</div>

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

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
