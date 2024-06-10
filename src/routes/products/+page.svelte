<script lang="ts">
	import { page } from '$app/stores';
	import ProductCart from '$lib/components/products/ProductCart.svelte';
	import ProductItem from '$lib/components/products/ProductItem.svelte';
	import ProductSearch from '$lib/components/products/ProductSearch.svelte';
	import { Button } from '$lib/components/ui/button';
	import type { SelectCategory } from '$lib/db/category.entity';
	import type { SelectProduct } from '$lib/db/product.entity';
	import { getAllCategoriesQuery } from '$lib/services/categories/query';
	import { getAllProducts } from '$lib/services/products/query';
	import type { IBaseLocals } from '$lib/services/session/sessionManager';
	import { getAllSuppliersQuery } from '$lib/services/suppliers/query';
	import { Plus } from 'lucide-svelte';
	import { writable, readonly } from 'svelte/store';
	import { browser } from '$app/environment';
	import { toast } from 'svelte-sonner';

	$: categoryQuery = $page.url.searchParams.get('category');

	export let data: {
		products: SelectProduct[] | undefined;
		categories: SelectCategory[] | undefined;
		session: IBaseLocals;
	};

	let categoriesQuery = getAllCategoriesQuery();
	let suppliersQuery = getAllSuppliersQuery();
	$: productQuery = getAllProducts(data.products, {
		category: categoryQuery !== null ? +categoryQuery : undefined,
		keyword: $page.url.searchParams.get('keyword') as string
	});

	function localStorageStore(key: string, initial: SelectProduct[]) {
		const localStorage = browser ? window.localStorage : undefined;
		const value = browser ? localStorage?.getItem(key) : undefined;
		const store = writable<SelectProduct[]>(value == null ? initial : JSON.parse(value));
		store.subscribe((v) => localStorage?.setItem(key, JSON.stringify(v)));
		return store;
	}

	const cart = localStorageStore('cart', []);
	const cartItems = readonly(cart);

	const mutateCard = (product: SelectProduct, operation = 'add') => {
		if (!data) {
			cart.set([product]);
			return;
		}
		if (operation === 'remove') {
			cart.update((c) => c.filter((item) => item.id !== product.id));
			toast.success('Product removed from cart');
			return;
		}
		if (operation === 'subtract') {
			cart.update((c) =>
				c?.filter(
					(
						(found) => (a) =>
							a.id !== product.id || found || !(found = true)
					)(false)
				)
			);
			toast.success('Product subtracted from cart');
			return;
		}
		cart.update((c) => [...c, product]);
		toast.success('Product added to cart');
	};
</script>

<div class="min-h-screen stack p-6 w-full">
	<div class="h-stack w-full justify-between">
		<h1 class="text-3xl font-bold">Products</h1>
		{#if data.session.user?.user_type === 'customer'}
			<ProductCart
				{cartItems}
				onRemove={(product) => mutateCard(product, 'remove')}
				onAddProduct={(product) => mutateCard(product)}
				onSubtractProduct={(product) => mutateCard(product, 'subtract')}
			/>
		{:else}
			<a href="/products/create">
				<Button type="button" size="icon"><Plus /></Button>
			</a>
		{/if}
	</div>
	<div class="h-stack w-full">
		<ProductSearch categories={$categoriesQuery?.data} />
	</div>
	<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
		{#each $productQuery.data as product}
			<ProductItem
				{product}
				onAddToCart={data.session.user?.user_type === 'customer' ? mutateCard : undefined}
			/>
		{/each}
	</div>
</div>
