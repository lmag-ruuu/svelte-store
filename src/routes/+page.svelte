<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { IBaseLocals } from '$lib/services/session/sessionManager';

	export let data: {
		session: IBaseLocals;
	};
</script>

<div class="min-h-screen stack p-6 w-full">
	<div class="h-stack w-full justify-between flex-wrap">
		<h1 class="text-3xl font-bold">Welcome</h1>
		<div class="flex items-center gap-2">
			{#if data.session.isUserLoggedIn}
				<a href="#">
					<Button class="w-full">Logout</Button>
				</a>
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
