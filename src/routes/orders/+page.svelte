<script lang="ts">
	import type { SelectOrderByBundleId, SelectOrderWithProducts } from '$lib/db/order.entity';
	import type { IBaseLocals } from '$lib/services/session/sessionManager';

	export let data: {
		session: IBaseLocals;
		orders: Partial<SelectOrderWithProducts[] & SelectOrderByBundleId>;
	};

	console.log(data);
</script>

<h1>Orders</h1>
