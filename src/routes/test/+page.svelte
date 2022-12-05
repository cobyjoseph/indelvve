<script>
	// Import the Svelte `writable` function
	import { writable } from 'svelte/store';

	// Define a writable store to hold the list of tags
	const tags = writable([]);

	// Define a function to add a new tag
	function addTag(tag) {
		// Get the current list of tags
		tags.update((list) => {
			// If the tag is not already in the list, add it
			if (!list.includes(tag)) {
				return [...list, tag];
			}

			// Otherwise, return the current list of tags
			return list;
		});
	}

	// Define a function to remove a tag
	function removeTag(tag) {
		// Get the current list of tags
		tags.update((list) => {
			// If the tag is in the list, remove it
			if (list.includes(tag)) {
				return list.filter((t) => t !== tag);
			}

			// Otherwise, return the current list of tags
			return list;
		});
	}
</script>

<!-- Create a form to add new tags -->
<form on:submit|preventDefault={(e) => addTag(e.target.tag.value)}>
	<input type="text" name="tag" placeholder="Add a tag" />
	<button type="submit">Add Tag</button>
</form>

<!-- Use the `tags` store to display the list of tags -->
<ul>
	{#each $tags as tag}
		<li>
			{tag}
			<button on:click={() => removeTag(tag)}>x</button>
		</li>
	{/each}
</ul>
