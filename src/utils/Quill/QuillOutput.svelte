<script lang="ts">
	import QuillEditor from './QuillEditor.svelte';

	export let OutputArray;
</script>

{#each OutputArray as OA}
	<QuillEditor deltaDataOutput={OA.newContent} />
{/each}
