<script lang="ts">
	import CreateCategoryDialog from '$lib/components/categories/CreateCategoryDialog.svelte';
	import ProductCarousel from '$lib/components/products/ProductCarousel.svelte';
	import type { SelectCategoryWithProducts } from '$lib/db/category.entity';
	import { getAllCategoriesQueryWProducts } from '$lib/services/categories/query';
	import axios, { AxiosError } from 'axios';
	import { toast } from 'svelte-sonner';

	export let data: {
		categories: SelectCategoryWithProducts[] | undefined;
	};

	let categoriesQuery = getAllCategoriesQueryWProducts(data.categories, { populate: true });

	const handleAddCategory = async (event: SubmitEvent | { target: HTMLFormElement }) => {
		if (event.target instanceof HTMLFormElement) {
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
			} catch (_e) {
				const error = _e as AxiosError<{ error: { message: string } }>;
				toast.error(error.response?.data?.error.message || 'Something went wrong');
			}
		} else {
			toast.error('Invalid form action');
		}
	};
</script>

<div class="min-h-screen stack p-6 w-full">
	<div class="h-stack w-full justify-between">
		<h1 class="text-3xl font-bold">Categories</h1>
		<CreateCategoryDialog {handleAddCategory} />
	</div>
	<div class="stack w-full">
		{#if $categoriesQuery.data}
			{#each $categoriesQuery.data as category}
				<div class="stack w-full">
					<div class="stack w-full !gap-1">
						<p class="text-2xl font-bold">{category.name}</p>
						<p>{category.description}</p>
					</div>
					<ProductCarousel products={category.products} />
				</div>
			{/each}
		{/if}
	</div>
</div>
