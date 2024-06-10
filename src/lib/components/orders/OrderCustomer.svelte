<script lang="ts">
	import type { SelectOrderByBundleId } from '$lib/db/order.entity';
	import ProductItem from '../products/ProductItem.svelte';
	export let orders: Partial<SelectOrderByBundleId> | undefined = undefined;
</script>

<div class="min-h-screen stack p-6 w-full">
	<div class="h-stack w-full justify-between">
		<h1 class="text-3xl font-bold">Your orders</h1>
	</div>
	{#if orders}
		{#each orders as orderBundle}
			<div class="stack border border-gray-600 rounded-xl p-4 w-full !gap-2">
				<p class="text-xs text-gray-400">Order bundle ID: {orderBundle?.name}</p>
				{#if orderBundle?.orders}
        <p>Products:</p>
					{#each orderBundle?.orders as order}
						<div class="grid gap-2 grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3">
							{#each order?.products_in_order as product}
								<ProductItem variant="horizontal" product={{
                  ...product.product,
                  name: `${product.product.name} x ${product.quantity}`
                }} onAddToCart={undefined} />
							{/each}
						</div>
					{/each}
				{/if}
			</div>
		{/each}
	{/if}
</div>
