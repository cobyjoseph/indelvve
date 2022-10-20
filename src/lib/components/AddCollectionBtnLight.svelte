<script lang="ts">
	export let addText: string;
</script>

<div class="flex items-center justify-center">
	<div
		class="flex items-center justify-center gap-1 outline outline-1 outline-secondary bg-secondary px-1.5"
	>
		<div class="flex justify-center self-center   bg-white">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4 self-center stroke-secondary stroke-[3px]"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
			</svg>
		</div>
		<div class=" font-medium text-white">Add {addText}</div>
	</div>
</div>
