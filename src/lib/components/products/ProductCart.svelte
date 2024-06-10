<script lang="ts">
	import type { SelectProduct } from '$lib/db/product.entity';
	import { readable, readonly, type Readable } from 'svelte/store';
	import MainDialog from '../base/MainDialog.svelte';
	import { Button } from '../ui/button';
	import { Minus, Plus, ShoppingCart, Trash } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	export let cartItems: Readable<SelectProduct[]>;
	export let onRemove: (product: SelectProduct) => void;
	export let onAddProduct: (product: SelectProduct) => void;
	export let onSubtractProduct: (product: SelectProduct) => void;

	$: displayItemsReadable = readable(
		$cartItems.reduce(
			(acc, current) => {
				const existingProduct = acc.find((product) => product?.id === current?.id);
				if (existingProduct) {
					existingProduct.quantity++;
				} else {
					acc.push({ ...current, quantity: 1 });
				}
				return acc;
			},
			[] as unknown as Array<SelectProduct & { quantity: number }>
		)
	);

	$: displayCartItems = readonly(displayItemsReadable);

	function gotoCheckout() {
		goto('/orders/checkout');
	}
</script>

<MainDialog title="New Order">
	<Button type="button" size="icon">
		<ShoppingCart />
	</Button>
	<div slot="dialog-body" class="stack w-full">
		{#if $displayCartItems.length === 0}
			<p class="text-center">Your cart is empty</p>
		{:else}
			{#each $displayCartItems as product}
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
					<div class="h-stack">
						<Button
							type="button"
							variant="ghost"
							on:click={() => onSubtractProduct(product)}
							size="icon"
						>
							<Minus />
						</Button>
						<p>{product.quantity}</p>
						<Button
							type="button"
							variant="ghost"
							on:click={() => onAddProduct(product)}
							size="icon"
						>
							<Plus />
						</Button>
						<Button
							type="button"
							variant="destructive"
							on:click={() => onRemove(product)}
							size="icon"
						>
							<Trash />
						</Button>
					</div>
				</div>
			{/each}
		{/if}
		<Button
			on:click={gotoCheckout}
			disabled={$displayCartItems.length === 0}
			type="button"
			class="w-full mt-3"
		>
			Create order
		</Button>
	</div>
</MainDialog>
