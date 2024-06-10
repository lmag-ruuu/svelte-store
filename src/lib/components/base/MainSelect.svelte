<script lang="ts">
	import {
		Select,
		SelectGroup,
		SelectContent,
		SelectTrigger,
		SelectValue,
		SelectLabel,
		SelectInput,
		SelectItem
	} from '$lib/components/ui/select';

	interface IItem {
		value: string | number | undefined;
		label: string;
		disabled?: boolean;
	}

	export let name: string;
	export let placeholder: string | undefined = undefined;
	export let items: Array<IItem | undefined>;
	export let required: boolean = false;
	export let onSelect: (value: Partial<IItem> | undefined) => void;
	export let defaultValue: IItem | undefined = undefined;
	let selected = defaultValue || undefined;
</script>

<Select portal={null} {required} onSelectedChange={onSelect} bind:selected>
	<SelectTrigger>
		<SelectValue {placeholder} />
	</SelectTrigger>
	<SelectContent class="w-full">
		<SelectGroup>
			<SelectLabel>{name}</SelectLabel>
			{#each items as item}
				<SelectItem value={item?.value} label={item?.label}>{item?.label}</SelectItem>
			{/each}
		</SelectGroup>
	</SelectContent>
	<SelectInput {name} />
</Select>
