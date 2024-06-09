<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { FormEventHandler } from 'svelte/elements';
	import Input from '../ui/input/input.svelte';
	import MainSelect from '../base/MainSelect.svelte';
	import type { SelectCategory } from '$lib/db/category.entity';

	export let categories: SelectCategory[] | undefined;

	const goQueryString = (key: string, value: string | number | undefined) => {
		let query = new URLSearchParams($page.url.searchParams.toString());
		console.log(value);
		if (value === null) {
			query.delete(key);
		} else if (value !== undefined) {
			query.set(key, value.toString());
		}
		goto(`?${query}`, { keepFocus: true, replaceState: true, noScroll: true });
	};

	const handleSearch: FormEventHandler<HTMLInputElement> = (event) => {
		if (event.target instanceof HTMLInputElement) {
			goQueryString('keyword', event?.target?.value);
		}
	};

	const handleChange = (value: string | number | undefined) => {
		goQueryString('category', value);
	};

	let clearValue = [{ value: undefined, label: 'All', disabled: true }];
</script>

<div class="h-stack w-full">
	<Input type="text" placeholder="Search" on:input={handleSearch} />
	<MainSelect
		name="Category"
		items={categories
			? [...clearValue, ...categories?.map((item) => ({ value: item?.id, label: item?.name }))]
			: []}
		onSelect={(value) => {
			handleChange(value?.value);
		}}
	/>
</div>
