<script lang="ts">
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import MainSelect from '$lib/components/base/MainSelect.svelte';
	import { toast } from 'svelte-sonner';
	import axios from 'axios';
	import { getAllCategoriesQuery } from '$lib/services/categories/query';
	import type { SelectCategory } from '$lib/db/category.entity';
	import { goto } from '$app/navigation';
	import CreateCategoryDialog from '$lib/components/categories/CreateCategoryDialog.svelte';

	$: selectedRoute = '';
	export let data: {
		categories: SelectCategory[] | undefined;
	};
	let categoriesQuery = getAllCategoriesQuery(data.categories);
	$: disabled = false;

	// handlers
	const handleSubmit = async (event: SubmitEvent | { target: HTMLFormElement }) => {
		disabled = true;
		if (event.target instanceof HTMLFormElement) {
			const action_url = event?.target?.action as string;
			const formData = new FormData(event.target as HTMLFormElement);
			if (!selectedRoute) {
				toast.error('Please select a category');
				return;
			}
			formData.append('category', selectedRoute);

			const res = await axios.post(action_url, formData);
			console.log(res);
			if (res.status !== 200) {
				toast.error('Something went wrong');
				return;
			}
			toast.success('Product created, redirecting to products page...');
			setTimeout(() => {
				goto('/products');
				disabled = false;
			}, 2500);
		} else {
			toast.error('Invalid form action');
		}
	};

	const handleAddCategory = async (event: SubmitEvent | { target: HTMLFormElement }) => {
		if (event.target instanceof HTMLFormElement) {
			const action_url = event?.target?.action as string;
			const formData = new FormData(event.target as HTMLFormElement);
			const name = formData.get('name')?.toString();
			if (!name) {
				toast.error('Name is required');
				return;
			}
			const res = await axios.post(action_url, formData);
			console.log(res);
			if (res.status !== 200) {
				toast.error('Something went wrong');
				return;
			}
			toast.success('Category created');
			$categoriesQuery.refetch();
		} else {
			toast.error('Invalid form action');
		}
	};
</script>

<div class="min-h-screen w-full v-stack justify-center p-6 max-w-[450px] mx-auto">
	<p class="text-3xl font-bold self-start">Crear producto</p>
	<form class="stack w-full" on:submit|preventDefault={handleSubmit} action="?/add-product">
		<div class="stack w-full">
			<Label for="name">Name</Label>
			<Input type="text" id="name" name="name" required autocomplete="off" />
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
			<Label for="image_url">Image URL</Label>
			<Input type="text" id="image_url" name="image_url" required autocomplete="off" />
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
				<CreateCategoryDialog handleAddCategory={handleAddCategory} />
			</div>
		</div>
		<div class="stack w-full">
			<Button type="submit" class="w-full" disabled={disabled}>Create</Button>
		</div>
	</form>
</div>
