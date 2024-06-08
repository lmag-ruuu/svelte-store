<script lang="ts">
	import ProductItem from '$lib/components/products/ProductItem.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { SelectProduct } from '$lib/db/product.entity';
	import { getAllProducts } from '$lib/services/products/query';
	import { Plus } from 'lucide-svelte';

	export let data: {
		products: SelectProduct[] | undefined;
	};
	let productQuery = getAllProducts(data.products);
</script>

<div class="min-h-screen stack p-6 w-full">
	<div class="h-stack w-full justify-between">
		<h1 class="text-3xl font-bold">Products</h1>
		<a href="/products/create">
			<Button type="button" size="icon"><Plus /></Button>
		</a>
	</div>
	<div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
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
