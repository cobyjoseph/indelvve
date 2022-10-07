<script lang="ts">
	import { onMount } from 'svelte/internal';
	import { enhance } from '$app/forms';

	let editor;
	let quillDeltaReadOnly;

	$: quillDeltaDerived = JSON.stringify(quillDeltaReadOnly);

	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, 'blockquote', 'link', 'image', 'video'],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'bullet' }, { list: 'ordered' }],
		[{ align: [] }],
		['clean']
	];

	onMount(async () => {
		const { default: Quill } = await import('quill');

		let quillReadOnly = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
			},
			// theme: 'snow',
			placeholder: 'placeholder to be replaced by rendered data'
		});
		// quill.root.innerHTML = innerText;
		// console.log(innerText);

		quillReadOnly.on('text-change', function () {
			// let contents = JSON.parse(JSON.stringify(quill.getContents()));
			quillDeltaReadOnly = quillReadOnly.getContents();
			console.log(quillDeltaReadOnly);
		});
	});
</script>

<form class="bg-purple-200" method="POST" action="?/actionNameTwo" use:enhance>
	<textarea class=" bg-teal-400 m-3" style="display:none" name="inputField" />
	<div bind:this={editor} />
</form>

<!-- Old stuff from soneone elses code  -->
<!-- in script tags -->
<!-- // import { quillmiddleware } from '../utils/quill/quill';
// import { createEventDispatcher } from 'svelte';

// export let className: string = '';

// const qlEditorOptions = {
// 	modules: {
// 		toolbar: [
// 			[{ header: [1, 2, 3, false] }],
// 			['bold', 'italic', 'underline', 'strike'],
// 			['link', 'code-block', 'image'],
// 			[{ script: 'sub' }, { script: 'super' }],
// 			[{ align: [false, 'right', 'center', 'justify'] }]
// 		]
// 	},
// 	placeholder: "What's in you mind?",
// 	theme: 'snow'
// };

// let dispatch = createEventDispatcher();

// let onTextChange = (e: any) => {
// 	dispatch('textChange', e.detail);
// }; -->

<!-- Not in script tag -->

<!-- <div class={className} id="editor">
	<div use:quillmiddleware={qlEditorOptions} on:text-change={onTextChange} />
</div> -->
<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
