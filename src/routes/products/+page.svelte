<script lang="ts">
	import { page } from '$app/stores';
	import ProductItem from '$lib/components/products/ProductItem.svelte';
	import ProductSearch from '$lib/components/products/ProductSearch.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { SelectCategory } from '$lib/db/category.entity';
	import type { SelectProduct } from '$lib/db/product.entity';
	import { getAllCategoriesQuery } from '$lib/services/categories/query';
	import { getAllProducts } from '$lib/services/products/query';
	import { Plus } from 'lucide-svelte';

	$: categoryQuery = $page.url.searchParams.get('category');

	export let data: {
		products: SelectProduct[] | undefined;
		categories: SelectCategory[] | undefined;
	};
	let categoriesQuery = getAllCategoriesQuery();
	$: productQuery = getAllProducts(data.products, {
		category: categoryQuery !== null ? +categoryQuery : undefined,
		keyword: $page.url.searchParams.get('keyword') as string
	});
</script>

<div class="min-h-screen stack p-6 w-full">
	<div class="h-stack w-full justify-between">
		<h1 class="text-3xl font-bold">Products</h1>
		<a href="/products/create">
			<Button type="button" size="icon"><Plus /></Button>
		</a>
	</div>
	<div class="h-stack w-full">
		<ProductSearch categories={$categoriesQuery?.data} />
	</div>
	<div
		class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 w-full"
	>
		{#each $productQuery.data as product}
			<ProductItem
				product={{
					id: product.id,
					name: product.name,
					description: product.description,
					price: product.price,
					category_id: product.category_id,
					image_url: product.image_url
				}}
			/>
		{/each}
	</div>
</div>
