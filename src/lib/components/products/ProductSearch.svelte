<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { FormEventHandler } from 'svelte/elements';
	import Input from '../ui/input/input.svelte';
	import MainSelect from '../base/MainSelect.svelte';
	import type { SelectCategory } from '$lib/db/category.entity';
	import { Button } from '../ui/button';
	import { type SelectSupplier } from '$lib/db/supplier.entity';

	export let categories: SelectCategory[] | undefined;

	const goQueryString = (key: string, value: string | number | undefined) => {
		let query = new URLSearchParams($page.url.searchParams.toString());
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

<div class="stack w-full">
	<div class="v-stack w-full">
		<Input type="text" placeholder="Search" on:input={handleSearch} />
	</div>
	<div class="h-stack w-full">
		<!-- <MainSelect
			placeholder="Supplier"
			name="Supplier"
			defaultValue={suppliers?.[0]
				? {
						value: suppliers[0]?.id,
						label: suppliers[0]?.name
					}
				: undefined}
			items={suppliers ? suppliers?.map((item) => ({ value: item?.id, label: item?.name })) : []}
			onSelect={(value) => {
				handleChange(value?.value);
			}}
		/> -->
		<MainSelect
			placeholder="Category"
			name="Category"
			items={categories
				? [...clearValue, ...categories?.map((item) => ({ value: item?.id, label: item?.name }))]
				: []}
			onSelect={(value) => {
				handleChange(value?.value);
			}}
		/>
		<a href="/categories" class="w-full">
			<Button type="button" variant="ghost" class="ml-auto">See all categories</Button>
		</a>
	</div>
</div>
