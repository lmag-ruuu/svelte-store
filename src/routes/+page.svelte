<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import type { Load } from "./+page.server";
	export let data: Load;

</script>

<Button>{data.hello}</Button>