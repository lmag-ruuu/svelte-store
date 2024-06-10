<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { z } from 'zod';
	import { toast } from 'svelte-sonner';
	import axios, { AxiosError } from 'axios';
	import { goto } from '$app/navigation';

	$: userType = 'customer';

	const schema = z.object({
		name: z.string().min(3).max(255),
		email: z.string().email().min(3).max(255),
		password: z.string().min(8).max(255),
		user_type: z.enum(['customer', 'supplier'])
	});

	const onSubmit = async (event: SubmitEvent | { target: HTMLFormElement }) => {
		if (event.target instanceof HTMLFormElement) {
			const action_url = event?.target?.action as string;
			const formData = new FormData(event.target as HTMLFormElement);
			const url = `${action_url}-${userType}`;
			const password = formData.get('password')?.toString();
			const password_confirmation = formData.get('password_confirmation')?.toString();
			const validation = schema.safeParse({
				name: formData.get('name')?.toString(),
				email: formData.get('email')?.toString(),
				password: formData.get('password')?.toString(),
				password_confirmation: formData.get('password_confirmation')?.toString(),
				user_type: userType
			});

			if (validation.error) {
				validation.error.errors.forEach((error) => {
					toast.error(`${error.path}: ${error.message}`);
				});
				return;
			}

			if (password !== password_confirmation) {
				toast.error('Passwords do not match');
				return;
			}

			formData.set('user_type', userType!);

			try {
				await axios.post(url, formData);
				toast.success('User created');
				goto('/auth/sign-in');
			} catch (_e) {
				const error = _e as AxiosError<{ message: string }>;
				toast.error(error.response?.data?.message || 'Something went wrong');
			}
		}
	};
</script>

<div class="min-h-screen w-full v-stack justify-center p-6 max-w-[450px] mx-auto">
	<p class="text-3xl font-bold self-start">Sign up</p>
	<form class="stack w-full" action="?/sign-up" on:submit={onSubmit}>
		<div class="stack w-full">
			<Label for="name">Name</Label>
			<Input type="text" id="name" name="name" required autocomplete="off" />
		</div>
		<div class="stack w-full">
			<Label for="email">Email</Label>
			<Input type="email" id="email" name="email" required autocomplete="off" />
		</div>
		<div class="stack w-full">
			<Label for="password">Password</Label>
			<Input type="password" id="password" name="password" required autocomplete="off" />
		</div>
		<div class="stack w-full">
			<Label for="password_confirmation">Password confirmation</Label>
			<Input
				type="password"
				id="password_confirmation"
				name="password_confirmation"
				required
				autocomplete="off"
			/>
		</div>
		<RadioGroup.Root
			bind:value={userType}
			onValueChange={(value) => {
				userType = value;
			}}
		>
			<div class="flex items-center space-x-2">
				<RadioGroup.Item name="user_type" value="customer" id="customer" />
				<Label for="customer">Register as Customer</Label>
			</div>
			<div class="flex items-center space-x-2">
				<RadioGroup.Item name="user_type" value="supplier" id="supplier" />
				<Label for="supplier">Register as Supplier</Label>
			</div>
		</RadioGroup.Root>
		<Button type="submit" class="w-full">Sign up</Button>
	</form>
	<a href="/auth/sign-in" class="text-sm text-gray-500 hover:text-gray-700 w-full">
		<Button type="button" class="w-full" variant="ghost">Already have an account? Sign in</Button>
	</a>
</div>
