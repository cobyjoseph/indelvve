<script lang="ts">
	export let upvotes: number;
	export let authorName: string;
	export let timeSince: number;
	export let dOrMin: string;
	// export let commentNumber;
</script>

<div class="   ">
	<container class=" mb-1 flex text-[16px] text-black items-center">
		<!-- light and number -->
		<div class="gap-0.3 mr-5 flex">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-[23px] w-[23px] fill-transparent stroke-black stroke-1 hover:fill-white"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
				/>
			</svg>

			<div>{upvotes}</div>
		</div>

		<!-- person icon and name - I NEEDED TO place self center for the icon. didnt seem to work when I tried to apply that to the praent. not sure why -->
		<div class="mr-5 flex gap-0.5 items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class=" h-[19px] w-[19px] place-self-center stroke-black stroke-1"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
				/>
			</svg>
			<div class="">{authorName}</div>
		</div>

		<!-- number and d or minute -->
		<div class="gap-0.3 mr-5 flex items-center">
			<div>{timeSince}</div>
			<div>{dOrMin}</div>
		</div>

		<!-- Comment icon with number inside -->
		<div class="min-w relative ml-auto flex gap-1 items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-[27px] w-[27px] place-self-center stroke-black stroke-1"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z "
				/>
			</svg>
			<!-- <div class="absolute inset-y-[4.5px] inset-x-[8px] text-[11px] font-semibold">
				{commentNumber}
			</div> -->
		</div>
	</container>
</div>
