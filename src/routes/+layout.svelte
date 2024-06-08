<script lang="ts">
	import '../app.css';
	import { Toaster } from '$lib/components/ui/sonner';

	import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

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
</QueryClientProvider>
