<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import type { IBaseLocals } from '$lib/services/session/sessionManager';
	import axios from 'axios';
	import { toast } from 'svelte-sonner';

	export let data: {
		session: IBaseLocals;
	};

	let logout = async () => 	{
		try {
			await axios.post('/api/auth/logout');
			goto('/auth/sign-in');
		} catch (e) {
			toast.error('Error logging out');

		}
	};
</script>

<div class="min-h-screen stack p-6 w-full">
	<div class="h-stack w-full justify-between flex-wrap">
		<h1 class="text-3xl font-bold">Welcome</h1>
		<div class="flex items-center gap-2">
			{#if data.session.isUserLoggedIn}
				<Button on:click={logout} class="w-full">Logout</Button>
			{:else}
				<a href="/auth/sign-in">
					<Button class="w-full">Login</Button>
				</a>
				<a href="/auth/sign-up">
					<Button class="w-full" variant="ghost">Sign up</Button>
				</a>
			{/if}
		</div>
	</div>
</div>
