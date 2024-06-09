<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { AxiosError } from 'axios';
	import axios from 'axios';
	import { toast } from 'svelte-sonner';

	const onSubmit = async (event: SubmitEvent | { target: HTMLFormElement }) => {
		if (event.target instanceof HTMLFormElement) {
			const action_url = event?.target?.action as string;
			const formData = new FormData(event.target as HTMLFormElement);

			try {
				const res = await axios.post(action_url, formData);
				console.log(res);
				toast.success('Signed in');
				goto('/');
			} catch (_e) {
				const error = _e as AxiosError<{ error: { message: string } }>;
				console.log(error);
				toast.error(error.response?.data?.error.message || 'Something went wrong');
			}
		}
	};
</script>

<div class="min-h-screen w-full v-stack justify-center p-6 max-w-[450px] mx-auto">
	<p class="text-3xl font-bold self-start">Sign in</p>
	<form class="stack w-full" on:submit={onSubmit}>
		<div class="stack w-full">
			<Label for="email">Email</Label>
			<Input type="email" id="email" name="email" required autocomplete="off" />
		</div>
		<div class="stack w-full">
			<Label for="password">Password</Label>
			<Input type="password" id="password" name="password" required autocomplete="off" />
		</div>

		<Button type="submit" class="w-full">Sign in</Button>
	</form>
</div>
