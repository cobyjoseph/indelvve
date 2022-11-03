<script lang="ts">
	import { onMount } from 'svelte/internal';
	import { enhance } from '$app/forms';

	let editor;
	let quillDelta;
	// let deltaData;

	$: quillDeltaDerived = JSON.stringify(quillDelta);

	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, 'blockquote', 'link', 'image', 'video'],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'bullet' }, { list: 'ordered' }],
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
			placeholder: 'Post here...'
		});

		quill.on('text-change', function () {
			quillDelta = quill.getContents();
			console.log(quillDelta);
		});

		// quill.setContents(JSON.parse(deltaData));
	});
</script>

<div class="max-w-20 bg-blue-300">
	{quillDeltaDerived}
</div>

<form
	class="mt-2 bg-black bg-opacity-40 rounded-md p-4 "
	method="POST"
	action="?/postAction"
	use:enhance
>
	<div class="bg-white bg-opacity-[0.07] text-white ">
		<textarea style="display:none" name="content" bind:value={quillDeltaDerived} />
		<div class="" bind:this={editor} />
	</div>

	<div class=" flex gap-2 text-white bg-white bg-opacity-[0.07] mt-3 px-2 py-1 rounded-sm ">
		<div class="text-[18px] ">Tag(s):</div>
		<input type="text" name="xid" class="bg-white bg-opacity-[0.07] rounded-sm " />
	</div>

	<!-- Save the query result showing the cihld tag into a store and then can access it -->
	<!-- Look into store and context to access the data to access across components. -->
	<!-- And use that to change the value of the input with bind. write a custom component for the tags input. Listen for the enter or tab keyword - event listener, and that creates a new. Instead of using a div maybe use a div and make it content editable -->
	<!-- For the upsert - maybe do it through a put request - for updating operations - or mayb ethe same to do in dgraph -->

	<button
		type="submit"
		class=" text-white font-semibold text-[18px] bg-white bg-opacity-[0.2] hover:bg-third  px-4 rounded-md ml-auto mr-[0.5px] mt-3  flex"
		>Post</button
	>
</form>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';

	/* .ql-snow.ql-toolbar button {
		background-color: white;
		color: white;
	} */
</style>
