<script lang="ts">
	import type { SelectProduct } from '$lib/db/product.entity';
	import type { Readable } from 'svelte/store';
	import MainDialog from '../base/MainDialog.svelte';
	import { Button } from '../ui/button';
	import { ShoppingCart, Trash } from 'lucide-svelte';

	export let cartItems: Readable<SelectProduct[]>;
	export let onRemove: (product: SelectProduct) => void;
</script>

<MainDialog title="New Order">
	<Button type="button" size="icon">
		<ShoppingCart />
	</Button>
	<div slot="dialog-body" class="stack w-full">
		{#if $cartItems.length === 0}
			<p class="text-center">Your cart is empty</p>
		{:else}
			{#each $cartItems as product}
				<div class="w-full h-stack justify-between">
					<div class="h-stack">
						{#if product.image_url}
							<img
								src={product.image_url}
								alt={product.name}
								class="w-[40px] h-[40px] rounded-full object-fill"
							/>
						{:else}
							<div class="w-[40px] h-[40px] rounded-full bg-gray-200 object-fill"></div>
						{/if}

						<p>{product.name}</p>
					</div>
					<Button
						type="button"
						variant="destructive"
						on:click={() => onRemove(product)}
						size="icon"
					>
						<Trash />
					</Button>
				</div>
			{/each}
		{/if}
		<Button type="button" class="w-full mt-3">Create order</Button>
	</div>
</MainDialog>
