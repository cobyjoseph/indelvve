<script lang="ts">
	import { onMount } from 'svelte/internal';

	export let deltaDataOutput;
	let editor;

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

<!-- //TODO one component to display and input quill object. OnMount we can pass prop to it and make canEdit true or false as a prop -->
<style>
	.ql-editor h1 {
		font-size: 12px;
	}
	.ql-editor p {
		color: blue;
	}
	/* We need this styled but we dont want the snow default from the +[page.svelte to override */
</style>
