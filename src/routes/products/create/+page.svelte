<script lang="ts">
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import MainSelect from '$lib/components/base/MainSelect.svelte';
	import MainDialog from '$lib/components/base/MainDialog.svelte';
	import { Plus } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import axios from 'axios';

	const fruits = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'blueberry', label: 'Blueberry' },
		{ value: 'grapes', label: 'Grapes' },
		{ value: 'pineapple', label: 'Pineapple' }
	];

	$: selectedRoute = '';

	const handleSubmit = async (event: SubmitEvent | { target: HTMLFormElement }) => {
		// @ts-ignore
		const action_url = event?.target?.action as string;
		console.log(action_url);
		const formData = new FormData(event.target as HTMLFormElement);
		if (!selectedRoute) {
			toast.error('Please select a category');
			return;
		}

		formData.append('category', selectedRoute);

		try {
			const res = await axios.post(action_url, formData);
      console.log(res);
		} catch (error) {
			toast.error('Something went wrong');
			return;
		}
	};
</script>

<div class="min-h-screen w-full v-stack justify-center">
	<form class="stack" on:submit|preventDefault={handleSubmit}>
		<div class="stack">
			<Label for="name">Name</Label>
			<Input type="text" id="name" name="name" required />
		</div>
		<div class="stack">
			<Label for="description">Description</Label>
			<Textarea id="description" name="description" />
		</div>
		<div class="stack">
			<Label for="price">Price</Label>
			<Input type="number" id="price" name="price" required />
		</div>
		<div class="stack">
			<Label for="category">Category</Label>
			<div class="h-stack">
				<MainSelect
					onSelect={(value) => (selectedRoute = value.value)}
					name="Category"
					items={fruits}
					placeholder="Select a fruit"
					required
				/>
				<MainDialog title="Add a new category">
					<Plus />
					<div slot="dialog-body" class="stack">
						<div class="stack w-full">
							<Label for="category">Name</Label>
							<Input type="text" id="category" name="category" />
						</div>
						<div class="stack w-full">
							<Label for="description">Description</Label>
							<Textarea id="description" name="description" />
						</div>
						<Button type="submit" class="w-full">Add</Button>
					</div>
				</MainDialog>
			</div>
		</div>
		<div class="stack w-full">
			<Button type="submit" class="w-full">Create</Button>
		</div>
	</form>
</div>
