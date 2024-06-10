<script lang="ts">
	import type { SelectProduct } from '$lib/db/product.entity';
	import * as Carousel from '$lib/components/ui/carousel';
	import ProductItem from './ProductItem.svelte';

	export let products: SelectProduct[] | undefined;
</script>

{#if products && products.length > 0}
	<Carousel.Root class="w-full">
		<Carousel.Content>
			{#each products as product}
				<Carousel.Item class="md:basis-1/2 lg:basis-1/3">
					<ProductItem {product} onAddToCart={undefined} />
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous class="left-[-10px]" />
		<Carousel.Next class="right-[-10px]" />
	</Carousel.Root>
{/if}

<!-- if not items -->
{#if products && products.length === 0}
	<div class="h-full w-full flex justify-center items-center text-gray-300 min-h-[200px]">
		<p class="text-center text-2xl font-bold">No products</p>
	</div>
{/if}
