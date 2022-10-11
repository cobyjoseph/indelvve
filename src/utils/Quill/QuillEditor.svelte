<script lang="ts">
	import { onMount } from 'svelte/internal';
	import { enhance } from '$app/forms';
	import QuillOutput from './QuillOutput.svelte';

	export let deltaDataOutput;
	let editor;
	let quill;

	$: quillDeltaDerived = JSON.stringify(quill);

	onMount(async () => {
		const { default: Quill } = await import('quill');

		let quill = new Quill(editor, {
			modules: {}
		});

		quill.setContents(JSON.parse(deltaDataOutput));
	});
</script>

<div bind:this={editor} class="bg-slate-400" />

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
