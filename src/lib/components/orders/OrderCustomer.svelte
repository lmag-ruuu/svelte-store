<script lang="ts">
	import type { SelectOrderByBundleId } from '$lib/db/order.entity';
	import { Home } from 'lucide-svelte';
	import ProductItem from '../products/ProductItem.svelte';
	import { Button } from '../ui/button';
	import { goto } from '$app/navigation';
	export let orders: Partial<SelectOrderByBundleId> | undefined = undefined;
</script>

<div class="min-h-screen stack p-6 w-full">
	<div class="h-stack w-full justify-between">
		<h1 class="text-3xl font-bold">Your orders</h1>
		<Button class="" variant="ghost" size="icon" on:click={() => goto('/')}>
			<Home />
		</Button>
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
								<ProductItem
									variant="horizontal"
									product={{
										...product.product,
										name: `${product.product.name} x ${product.quantity}`
									}}
									onAddToCart={undefined}
								/>
							{/each}
						</div>
					{/each}
					<p class="text-xs text-gray-400 mt-3">
						Total items: {orderBundle?.orders
							?.map?.((order) => order?.products_in_order?.length)
							?.reduce((a, b) => a + b, 0)}
					</p>
				{/if}
			</div>
		{/each}
	{/if}
</div>
