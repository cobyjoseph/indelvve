<script lang="ts">
</script>

<div class="mr-6 hidden w-[130px] md:block">
	<!-- contents of nav bar -->
	<div class=" my-[18px] grid grid-cols-1">
		<!-- =solid container-->
		<div class="z-20 flex h-8 w-full transform place-items-center justify-center bg-secondary">
			<!-- Logo text -->
			<div class="-py-[0.5px] text-center font-fugaz text-[22px]  text-white">Indelvve</div>
		</div>

		<div
			class="absolute z-10 -ml-1 mt-1 h-8 w-[130px] -translate-x-[0.5px] transform border-[3px] border-dotted border-secondary"
		/>
		<!-- Log in section -->
		<div
			class="mt-4 flex w-full justify-center bg-white  font-medium text-black outline outline-1 outline-black"
		>
			<div class="text-md flex py-1">
				<!-- <button
					on:click={() => {
						isOverlayOpen.set(t rue);
					}}>Sign up</button
				> -->

				<!-- <img
					class="rounded-sm object-scale-down "
					src="data:image/jpeg;base64,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"
					alt=""
				/> -->
			</div>
			<!-- <p class=" items-center text-xs">Coby Joseph</p> -->
		</div>

		<!-- Each menu header with icon net to it -->
		<div
			class="mt-4 grid w-full grid-cols-1 gap-4 bg-white  py-2 pb-3 pl-3 outline outline-1 outline-black"
		>
			<div class="flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 stroke-black stroke-2"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/>
				</svg>
				<h1 class="text-xl font-semibold text-black">Home</h1>
			</div>
			<div class="flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 stroke-black stroke-2"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
					/>
				</svg>
				<h1 class="text-xl font-semibold text-black">People</h1>
			</div>
			<div class="flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 stroke-black stroke-2"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
					/>
				</svg>
				<h1 class="text-xl font-semibold text-black">Topics</h1>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mt-1 h-3 w-3 stroke-black stroke-2"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
				</svg>
			</div>
		</div>
	</div>
</div>
