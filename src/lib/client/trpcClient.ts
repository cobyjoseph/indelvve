import { browser } from '$app/environment';
import type { Router } from '$lib/server/trpc/trpcServer'; // 👈 only the types are imported from the server
import * as trpc from '@trpc/client';
import type { LoadEvent } from '@sveltejs/kit';

const url = browser ? '/trpc' : 'http://localhost:3000/trpc';
export default (loadFetch?: LoadEvent['fetch']) =>
	trpc.createTRPCClient<Router>({
		url: loadFetch ? '/trpc' : url,
		transformer: trpcTransformer,
		...(loadFetch && { fetch: loadFetch as typeof fetch })
	});
