<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<div class="min-h-screen stack p-6 w-full">
	<div class="h-stack w-full justify-between">
		<h1 class="text-3xl font-bold">Welcome</h1>
		<div class="flex items-center gap-2">
			<Button class="w-full">Login</Button>
			<a href="/auth/sign-up">
				<Button class="w-full" variant="ghost">Sign up</Button>
			</a>
		</div>
	</div>
</div>
