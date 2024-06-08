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
	export let items: Array<{ value: string; label: string }>;
  export let required: boolean = false;
  export let onSelect: (value: {
    value:    string;
    label:    string;
    disabled: boolean;
  }) => void;
</script>

<Select portal={null} {required} onSelectedChange={onSelect}>
	<SelectTrigger class="w-[180px]">
		<SelectValue {placeholder} />
	</SelectTrigger>
	<SelectContent>
		<SelectGroup>
			<SelectLabel>{name}</SelectLabel>
			{#each items as item}
				<SelectItem value={item.value} label={item.label}>{item.label}</SelectItem>
			{/each}
		</SelectGroup>
	</SelectContent>
	<SelectInput {name} />
</Select>
