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

<form class="bg-purple-200" method="POST" action="?/actionName" use:enhance>
	<textarea
		class=" bg-teal-400 m-3"
		style="display:none"
		name="inputField"
		bind:value={quillDeltaDerived}
	/>
	<div bind:this={editor} />

	<button type="submit" class="bg-red-300 hover:bg-red-600">Submit</button>
</form>

