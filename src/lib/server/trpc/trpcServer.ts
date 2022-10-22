import type { inferAsyncReturnType } from '@trpc/server';
import * as trpc from '@trpc/server';

// optional
export const createContext = () => {
	// ...
	return {
		/** context data */
	};
};

// optional
export const responseMeta = () => {
	// ...
	return {
		// { headers: ... }
	};
};


//three kinds of routes:
//1. Query routes, which let me query data from the database
//2. mutation routes, which let me send post routes to the server 
//3. subscription routes, which let me subscribe to data over we sockets.
export const router = trpc
	.router<inferAsyncReturnType<typeof createContext>>()
	// queries and mutations...
	.query('hello', {
		resolve: () => 'world'
	});

export type Router = typeof router;
