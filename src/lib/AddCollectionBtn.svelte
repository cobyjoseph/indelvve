<script lang="ts">
	export let addText: string;
</script>

<div class="flex items-center justify-center">
	<div class="flex items-center justify-center gap-1   bg-white px-1.5  outline-1 outline">
		<div class="flex justify-center self-center rounded-sm  bg-mainDark">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4 self-center stroke-white stroke-[3px]"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
			</svg>
		</div>
		<div class=" font-medium text-black">Add {addText}</div>
	</div>
</div>
