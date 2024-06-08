<script lang="ts">
	import ProductItem from '$lib/components/products/ProductItem.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Plus } from 'lucide-svelte';
</script>

<div class="min-h-screen stack p-6 w-full">
	<div class="h-stack w-full justify-between">
		<h1 class="text-3xl font-bold">Products</h1>
		<Button size="icon"><Plus /></Button>
	</div>
	<div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		<ProductItem
			product={{
				id: 1,
				name: 'Product 1',
				description: 'hola',
				price: "100",
				category_id: 1,
				image_url: 'https://fastly.picsum.photos/id/477/200/300.jpg?hmac=Y-uy4_ZZZ6HOZCxdiN04OOypBZ3y2dY2gAfu9MvZMSE'
			}}
		/>
	</div>
</div>
