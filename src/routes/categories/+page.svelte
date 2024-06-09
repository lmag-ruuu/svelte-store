<script lang="ts">
	import CreateCategoryDialog from '$lib/components/categories/CreateCategoryDialog.svelte';
	import ProductCarousel from '$lib/components/products/ProductCarousel.svelte';
	import type { SelectCategoryWithProducts, category } from '$lib/db/category.entity';
	import { product } from '$lib/db/product.entity';

	export let data: {
		categories: SelectCategoryWithProducts[] | undefined;
	};

	const handleAddCategory = async (event: SubmitEvent | { target: HTMLFormElement }) => {
		console.log(event);
	};
</script>

<div class="min-h-screen stack p-6 w-full">
	<div class="h-stack w-full justify-between">
		<h1 class="text-3xl font-bold">Categories</h1>
		<CreateCategoryDialog {handleAddCategory} />
	</div>
	<div class="stack w-full">
		{#if data.categories}
			{#each data.categories as category}
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
