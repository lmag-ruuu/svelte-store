<script lang="ts">
	import {
		Card,
		CardHeader,
		CardContent,
		CardTitle,
		CardDescription
	} from '$lib/components/ui/card';
	import type { SelectProduct } from '$lib/db/product.entity';
	import { cn } from '$lib/utils';
	import { Button } from '../ui/button';

	export let product: SelectProduct;
	export let onAddToCart: undefined | ((product: SelectProduct) => void);
	export let variant: undefined | string = undefined;
</script>

<Card
	class={cn('w-full rounded-xl overflow-hidden h-[365px]', { '!h-stack': variant === 'horizontal' })}
>
	<CardHeader class="p-0  max-h-[200px] overflow-hidden">
		{#if product.image_url}
			<img
				src={product.image_url}
				alt={product.name}
				class={cn('w-full object-fill', { '!aspect-square': variant === 'horizontal' })}
			/>
		{/if}
	</CardHeader>
	<CardContent class="p-4 w-full stack !gap-1">
		<CardTitle>{product.name}</CardTitle>
		<CardDescription>{product.description}</CardDescription>
		<p>${product.price}</p>
		{#if onAddToCart}
			<Button type="button" on:click={() => onAddToCart(product)} class="mt-2 ml-auto"
				>Add to cart</Button
			>
		{/if}
	</CardContent>
</Card>
