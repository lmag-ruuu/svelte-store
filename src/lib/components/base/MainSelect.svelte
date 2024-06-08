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

	export let name: string;
  export let placeholder: string | undefined = undefined;
	export let items: Array<{ value: string | number; label: string; disabled?: boolean } | undefined>;
  export let required: boolean = false;
  export let onSelect: (value: {
    value?:    string | number;
    label?:    string;
    disabled?: boolean;
  } | undefined) => void;
</script>

<Select portal={null} {required} onSelectedChange={onSelect}>
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
