<script lang="ts">
	import { onMount } from 'svelte/internal';
	import { enhance } from '$app/forms';

	export let deltaDataOutput;
	let editor;
	let quill;

	$: quillDeltaDerived = JSON.stringify(quill);

	onMount(async () => {
		const { default: Quill } = await import('quill');

		let quill = new Quill(editor, {
			modules: {},
			readOnly: true
		});

		quill.setContents(JSON.parse(deltaDataOutput));
	});
</script>

<div bind:this={editor} class="text-white font-Gantari" />

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
