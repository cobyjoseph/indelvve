<script lang="ts">
	import { onMount } from 'svelte/internal';
	import { enhance } from '$app/forms';
	import Tags from 'svelte-tags-input';
	import toPlaintext from 'quill-delta-to-plaintext';

	let editor;
	let quillDelta;
	// let initialTagJoin;

	// export let initialTag;

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

		// let array = Array.from(initialTag);
		// initialTagJoin = array.join('');
		// console.log('initialTagJoin', initialTagJoin);
		// $: initialTag = initialTagJoin;

		let quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
			},
			theme: 'snow',
			// formats: [],
			placeholder: 'Add post here'
		});

		//dont think I need this below. Looks like it for a test to see if typing was registering data
		quill.on('text-change', function () {
			quillDelta = toPlaintext(quill.getContents());
			console.log(quillDelta);
		});

		// quill.setContents(JSON.parse(deltaData)); - this is for displaying content, so not needed for input here. Needed for DisplayQuill
	});
</script>

<form
	class="mt-2 bg-secondary bg-opacity-20 rounded-sm px-4 py-2"
	method="POST"
	action="?/newPostAction"
	use:enhance
>
	<div class="text-white text-2xl font-fugaz mb-3">Add post</div>

	<!-- keep the color none but make the outline strong -->
	<textarea name="testInput" />

	<div class=" text-black rounded-lg outline-none">
		<textarea style="display:none" name="content" />
		<div class="" bind:this={editor} />
	</div>

	<div class=" grid grid-cols-1 text-white font-fugaz font-thin  mt-3  rounded-sm ">
		<div class="text-[18px] mb-1 ">Enter tags:</div>
		<div class="w-full custom-tag-class">
			<Tags />
		</div>
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

	.custom-tag-class :global(.svelte-tags-input-tag) {
		background: #5772a8;
		font-weight: 600;
		letter-spacing: 0.05em;
		padding-left: 0.6em;
	}

	.custom-tag-class :global(.svelte-tags-input-layout) {
		background: none;
	}

	.custom-tag-class :global(.svelte-tags-input) {
		background: none;
	}

	.custom-tag-class :global(.svelte-tags-input-tag-remove) {
		margin-left: 0.4em;
	}

	.ql-toolbar .ql-stroke {
		fill: green !important;
	}

	.ql-toolbar .ql-fill {
		fill: purple !important;
	}

	.ql-toolbar .ql-picker {
		color: red !important;
	}

	.ql-formats {
		color: aquamarine !important;
		background-color: blue !important;
		stroke: brown !important;
	}

	svg {
		color: red !important;
		background-color: green !important;
		stroke: brown !important;
	}

	.ql-fill button {
		fill: green !important;
		color: blue !important;
		background-color: red !important;
	}

	.ql-header {
		fill: blue !important;
		color: red !important;
		background-color: green !important;
	}

	.ql-container {
		border-color: red !important;
	}

	.ql-snow .ql-toolbar button {
		color: red !important;
		fill: red !important;
		stroke: red !important;
		background-color: red !important;
	}

	.ql-toolbar .ql-formats .ql-fill button {
		stroke: #fff !important;
	}
</style>
