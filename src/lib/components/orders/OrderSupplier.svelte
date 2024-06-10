<script lang="ts">
	import type { SelectOrderWithProducts } from '$lib/db/order.entity';
	export let orders: Partial<SelectOrderWithProducts[]> | undefined = undefined;

	console.log(orders);
</script>

<div>Supplier</div>