<script lang="ts">
	import { onMount } from 'svelte/internal';
	import { enhance } from '$app/forms';
	import QuillOutput from './QuillOutput.svelte';

	export let deltaDataOutput;
	let editor;
	let quill;

	$: quillDeltaDerived = JSON.stringify(quill);

	// export let toolbarOptions = [
	// 	[{ header: 1 }, { header: 2 }, 'blockquote', 'link', 'image', 'video'],
	// 	['bold', 'italic', 'underline', 'strike'],
	// 	[{ list: 'bullet' }, { list: 'ordered' }],
	// 	[{ align: [] }],
	// 	['clean']
	// ];

	onMount(async () => {
		const { default: Quill } = await import('quill');

		let quill = new Quill(editor, {
			modules: {
				// toolbar: toolbarOptions
			}
			// theme: 'snow',
		});
		// deltaDataOutput = JSON.stringify({
		// 	ops: [
		// 		{ insert: 'test delta ' },
		// 		{ attributes: { bold: true }, insert: 'data' },
		// 		{ insert: '\n' }
		// 	],
		// });
		quill.setContents(JSON.parse(deltaDataOutput));
	});
</script>

<div bind:this={editor} class="bg-slate-400" />

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
