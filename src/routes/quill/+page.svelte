<script lang="ts">
	// import type { QuillTextChangeEvent } from '../../utils/quill/quill';
	// import { renderDelta } from '../../utils/quill/qlDeltaRenderer';

	// import Quill from '$lib/Quill.svelte';

	// let displayContainer;
	// let quill;

	// const onTextChange = (e) => {
	// 	renderDelta(displayContainer, e.detail.delta);
	// };

	import { quill } from 'svelte-quill';

	const options = {
		modules: {
			toolbar: [
				[{ header: [1, 2, 3, false] }],
				['bold', 'italic', 'underline', 'strike'],
				['link', 'code-block']
			]
		},
		theme: 'snow',
		placeholder: 'Post here...'
	};

	let content;
</script>

<div class="bg-white">hi</div>
