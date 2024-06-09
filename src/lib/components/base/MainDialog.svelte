<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	export let title: string;
	export let description: string | undefined = undefined;
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<slot />
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>{title}</Dialog.Title>
			{#if description}
				<Dialog.Description>
					{description}
				</Dialog.Description>
			{/if}
		</Dialog.Header>
		<slot name="dialog-body" />
	</Dialog.Content>
</Dialog.Root>
