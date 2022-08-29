<script lang="ts">
	let width: number;
</script>

<div class="mt-1 justify-center ">
	<div class="relative mt-1 justify-center">
		<!-- NOTE that I need to order this like this so the top one can be absolute and the bottom can be relative. That way the relative one will push down the content below, but the absolute one still works because it is not pushed down by the relative one.  -->
		<div
			class=" absolute z-10 mt-[6.2px] -ml-[5.2px] h-auto w-full justify-center pb-1 outline-dotted outline-[3px] outline-black"
		>
			<!-- REPLICATING THE CONTENT FROM THE MAIN DIV for the spacing of the outline. COME BACK TO THIS. PROBABLY A BETTER WAY TO DO IT -->
			<slot name="bottomPost" />
		</div>

		<!-- a box that takes up 100% of its parent -->
		<div
			class="relative z-20 h-auto w-full justify-center bg-white pb-1  outline outline-[2.5px] outline-black "
		>
			<slot name="topPost" />
		</div>
	</div>
</div>
