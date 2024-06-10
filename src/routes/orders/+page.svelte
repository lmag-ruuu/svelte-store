<script lang="ts">
	import OrderCustomer from '$lib/components/orders/OrderCustomer.svelte';
	import OrderSupplier from '$lib/components/orders/OrderSupplier.svelte';
	import type {
		SelectOrderByBundleId,
		SelectOrderWithProducts,
		orders
	} from '$lib/db/order.entity';
	import type { IBaseLocals } from '$lib/services/session/sessionManager';

	export let data: {
		session: IBaseLocals;
		orders: Partial<SelectOrderWithProducts[] & SelectOrderByBundleId>;
	};
</script>

{#if data.session?.user?.user_type === 'customer' && data.orders}
	<OrderCustomer orders={data.orders} />
{:else if data.session?.user?.user_type === 'supplier' && data.orders}
	<OrderSupplier orders={data.orders } />
{/if}
