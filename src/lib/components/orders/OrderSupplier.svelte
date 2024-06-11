<script lang="ts">
	import type {
		SelectOrderByCustomerId,
		SelectOrderWithProductsAndCustomer
	} from '$lib/db/order.entity';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '../ui/button';
	import { Home } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	export let orders: Partial<SelectOrderByCustomerId> | undefined = undefined;

	let selectedOrder: { name: string; orders: SelectOrderWithProductsAndCustomer[] } | undefined;
</script>

<div class="min-h-screen stack p-6 w-full">
	<div class="h-stack w-full justify-between">
		<h1 class="text-3xl font-bold">Orders Data</h1>
		<Button class="" variant="ghost" size="icon" on:click={() => goto('/')}>
			<Home />
		</Button>
	</div>
	<div class="h-stack w-full flex-wrap">
		{#if selectedOrder}
			<Button type="button" variant="secondary" on:click={() => (selectedOrder = undefined)}
				>Back</Button
			>
		{/if}
		<p>Click on customer name to see their orders</p>
	</div>
	<div class="h-stack w-full max-w-[800px] mx-auto">
		{#if !selectedOrder}
			<Table.Root>
				<Table.Caption>A list of your recent orders</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Head>Client Name</Table.Head>
						<Table.Head>Email</Table.Head>
						<Table.Head class="text-right">Order</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#if orders}
						{#each orders as bundleOrder}
							<Table.Row on:click={() => (selectedOrder = bundleOrder)} class="!cursor-pointer">
								<Table.Cell>{bundleOrder?.orders[0]?.customer?.name}</Table.Cell>
								<Table.Cell>{bundleOrder?.orders[0]?.customer?.email}</Table.Cell>
								<Table.Cell class="text-right">
									{bundleOrder?.orders?.length}
								</Table.Cell>
							</Table.Row>
						{/each}
					{/if}
				</Table.Body>
			</Table.Root>
		{:else}
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Order ID</Table.Head>
						<Table.Head>Address</Table.Head>
						<Table.Head>Products</Table.Head>
						<Table.Head>Total</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#if selectedOrder?.orders}
						{#each selectedOrder?.orders as orders}
							<Table.Row>
								<Table.Cell>{orders?.id}</Table.Cell>
								<Table.Cell>
									{orders?.city}
									{orders?.state}
									{orders?.country}
									{orders?.postal_code}
								</Table.Cell>
								<Table.Cell class="text-right">
									<div class="v-stack !items-center">
										{#each orders?.products_in_order as product}
											<p>
												{product?.product?.name} <span class="!text-gray-300">x</span>
												{product?.quantity}
											</p>
										{/each}
									</div>
								</Table.Cell>
								<Table.Cell class="text-center">
									${orders?.total}
								</Table.Cell>
							</Table.Row>
						{/each}
					{/if}
				</Table.Body>
			</Table.Root>
		{/if}
	</div>
</div>
