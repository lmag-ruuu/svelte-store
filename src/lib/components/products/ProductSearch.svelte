<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { FormEventHandler } from 'svelte/elements';
	import Input from '../ui/input/input.svelte';
	import MainSelect from '../base/MainSelect.svelte';
	import type { SelectCategory } from '$lib/db/category.entity';

	$: keyword = $page.url.searchParams.get('keyword');
	export let categories: SelectCategory[] | undefined;

	const goQueryString = (key: string, value: string) => {
		let query = new URLSearchParams($page.url.searchParams.toString());
		query.set(key, value);
		goto(`?${query}`, { keepFocus: true, replaceState: true, noScroll: true });
	};

	const handleSearch: FormEventHandler<HTMLInputElement> = (event) => {
		if (event.target instanceof HTMLInputElement) {
      
			goQueryString('keyword', event?.target?.value);
		}
	};

	const handleChange = (value: number) => {
		goQueryString('category', value.toString());
	};
</script>

<div class="h-stack w-full">
	<Input type="text" placeholder="Search" on:input={handleSearch} />
	<MainSelect
		name="Category"
		items={categories?.map((item) => ({ value: item?.id, label: item?.name })) || []}
		onSelect={(value) => {
			if (value?.value) {
				handleChange(+value?.value); 
			}
		}}
	/>
</div>
