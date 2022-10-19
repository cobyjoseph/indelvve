<script>
	import { getContextClient, gql, queryStore } from '@urql/svelte';

	const testQuery = queryStore({
		client: getContextClient(),
		query: gql`
			query AllPeople {
				queryPerson {
					name
					id
					content
				}
			}
		`
	});
</script>

{$testQuery.data}
