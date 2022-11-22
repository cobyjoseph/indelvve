<script>
	export let data;

	console.log('data on test page +page.svelte', data);
</script>

<div class="text-white">test page for loading data</div>

<div class="text-white">

	{data.data.all[0].name}
</div>
