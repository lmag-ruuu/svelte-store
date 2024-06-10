<script lang="ts">
	import { browser } from '$app/environment';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { SelectProduct } from '$lib/db/product.entity';
	import type { IBaseLocals } from '$lib/services/session/sessionManager';
	import { readable, readonly, writable } from 'svelte/store';

	export let data: {
		session: IBaseLocals;
	};

	function localStorageStore(key: string, initial: SelectProduct[]) {
		const localStorage = browser ? window.localStorage : undefined;
		const value = browser ? localStorage?.getItem(key) : undefined;
		const store = writable<SelectProduct[]>(value == null ? initial : JSON.parse(value));
		store.subscribe((v) => localStorage?.setItem(key, JSON.stringify(v)));
		return store;
	}

	const cart = localStorageStore('cart', []);
	const cartItems = readonly(cart);

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
</script>

<form class="min-h-screen stack p-6 w-full">
	<p>Checkout</p>
	<div class="h-stack w-full flex-wrap justify-center !items-start">
		<div class="w-full max-w-[400px] sm:max-w-[540px] border rounded-lg p-10">
			<div class="stack">
				<p class="text-xl font-bold mb-3">Billing Information</p>
				<div class="stack w-full">
					<Label for="email">Email</Label>
					<Input disabled value={data?.session?.user?.email} type="email" id="email" name="email" />
				</div>
				<div class="h-stack w-full">
					<div class="stack w-full">
						<Label for="address">Address</Label>
						<Input type="text" id="address" name="address" />
					</div>
					<div class="stack w-full">
						<Label for="postalCode">Postal Code</Label>
						<Input type="text" id="postalCode" name="postalCode" />
					</div>
				</div>
				<div class="h-stack w-full">
					<div class="stack w-full">
						<Label for="city">City</Label>
						<Input type="text" id="city" name="city" />
					</div>
					<div class="stack w-full">
						<Label for="country">Country</Label>
						<Input type="text" id="country" name="country" />
					</div>
				</div>
				<div class="stack w-full">
					<Label for="state">State</Label>
					<Input type="text" id="state" name="state" />
				</div>
			</div>
		</div>
		<div class="stack w-full max-w-[400px] p-10 min-h-full">
			<p class="text-xl font-bold mb-3">Order Summary</p>
			{#each $displayCartItems as product}
				<div class="w-full h-stack justify-between gap-2">
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
						<p>{product.name} x{product.quantity}</p>
					</div>
					<div class="h-stack">
						<p class="text-gray-400">u/${product.price}</p>
						<p>${+product.price * product.quantity}</p>
					</div>
				</div>
			{/each}
			<div class="w-full h-stack justify-end gap-2">
				<div class="h-stack">
					<p>Total</p>
					<p>
						${$displayCartItems.reduce(
							(acc, current) => acc + +current.price * current.quantity,
							0
						)}
					</p>
				</div>
			</div>
			<Button class="w-full" type="submit">Place Order</Button>
		</div>
	</div>
</form>
