<script lang="ts">
	import '../app.css';
	import { Toaster } from '$lib/components/ui/sonner';

	import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { Github } from 'lucide-svelte';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<Toaster />

<QueryClientProvider client={queryClient}>
	<slot />
	<!-- footer -->
	<div
		class="flex gap-3 items-center justify-center w-full h-20 bg-gray-100 text-gray-500 dark:bg-gray-900 dark:text-gray-400"
	>
		<p>By: Magdiel</p>
		<a href="https://github.com/lmag-ruuu/svelte-store" target="_blank" rel="noreferrer">
			<Github />
		</a>
	</div>
</QueryClientProvider>
