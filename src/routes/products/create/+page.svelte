<script lang="ts">
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import MainSelect from '$lib/components/base/MainSelect.svelte';
	import MainDialog from '$lib/components/base/MainDialog.svelte';
	import { Close } from '$lib/components/ui/dialog';
	import { Plus } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import axios from 'axios';
	import { getAllCategoriesQuery } from '$lib/services/categories/query';
	import type { SelectCategory } from '$lib/db/category.entity';

	export let data: {
		categories: SelectCategory[] | undefined;
	};

	$: selectedRoute = '';

	let categoriesQuery = getAllCategoriesQuery(data.categories);

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
			await axios.post(action_url, formData);
			toast.success('Product created');
		} catch (error) {
			toast.error('Something went wrong');
			return;
		}
	};

	const handleAddCategory = async (event: SubmitEvent | { target: HTMLFormElement }) => {
		// @ts-ignore
		const action_url = event?.target?.action as string;
		const formData = new FormData(event.target as HTMLFormElement);
		const name = formData.get('name')?.toString();
		if (!name) {
			toast.error('Name is required');
			return;
		}

		try {
			await axios.post(action_url, formData);
			toast.success('Category created');
			$categoriesQuery.refetch();
		} catch (error) {
			toast.error('Something went wrong');
			return;
		}
	};
</script>

<div class="min-h-screen w-full v-stack justify-center">
	<p class="text-3xl font-bold self-start">Crear producto</p>
	<form class="stack w-full" on:submit|preventDefault={handleSubmit} action="?/add-product">
		<div class="stack w-full">
			<Label for="name">Name</Label>
			<Input type="text" id="name" name="name" required />
		</div>
		<div class="stack w-full">
			<Label for="description">Description</Label>
			<Textarea id="description" name="description" />
		</div>
		<div class="stack w-full">
			<Label for="price">Price</Label>
			<Input type="number" id="price" name="price" required />
		</div>
		<div class="stack w-full">
			<Label for="category">Category</Label>
			<div class="h-stack w-full">
				<MainSelect
					onSelect={(value) => (selectedRoute = String(value?.value) || '')}
					name="Category"
					items={$categoriesQuery?.data?.map((item) => ({ value: item?.id, label: item?.name })) ||
						[]}
					placeholder="Select a fruit"
					required
				/>
				<MainDialog title="Add a new category">
					<Plus />
					<div slot="dialog-body" class="stack w-full">
						<form
							class="stack w-full"
							on:submit|preventDefault={handleAddCategory}
							action="?/add-category"
						>
							<div class="stack w-full">
								<Label for="name">Name</Label>
								<Input type="text" id="name" name="name" />
							</div>
							<div class="stack w-full">
								<Label for="description">Description</Label>
								<Textarea id="description" name="description" />
							</div>
							<Close>
								<Button type="submit" class="w-full">Add</Button>
							</Close>
						</form>
					</div>
				</MainDialog>
			</div>
		</div>
		<div class="stack w-full">
			<Button type="submit" class="w-full">Create</Button>
		</div>
	</form>
</div>
