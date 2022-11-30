<script lang="ts">
	import QuillInput from '$lib/quill/QuillInput.svelte';

	export let childTagName: String;
	// export let initialTag;

	console.log('array and join', Array.from(initialTag).join(''));

	let quillInput: boolean = false;

	function toggleQuillInput() {
		quillInput = !quillInput;
		initialTag = Array.from(initialTag).join('');
		console.log('initialTag.join', initialTag);
	}
</script>

<div class="flex gap-3 mt-6 ">
	<a href="/{childTagName}">
		<div
			class="text-white flex font-semibold bg-secondary hover:bg-third text-[18px] pt-[2px] pb-[4.5px] px-3  rounded-md"
		>
			<div>
				# {childTagName}
			</div>
			<div class="ml-[11px] mt-[3.8px] flex ">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-[20px] h-[20px]"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
					/>
				</svg>
			</div>
		</div></a
	>
	<button class=" font-medium text-white text-[18px]" on:click={toggleQuillInput}>
		<div
			class="flex items-center justify-center gap-[6px] rounded-md hover:bg-third  bg-white bg-opacity-[0.07] pl-3 pr-4 py-1  "
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4 self-center stroke-white stroke-[3px]"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
			</svg>

			Add post
		</div>
	</button>
</div>
{#if quillInput}
	<div>
		<QuillInput />
	</div>
{/if}
