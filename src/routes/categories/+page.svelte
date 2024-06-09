<script lang="ts">
	import CreateCategoryDialog from '$lib/components/categories/CreateCategoryDialog.svelte';

	const handleAddCategory = async (event: SubmitEvent | { target: HTMLFormElement }) => {
		console.log(event);
	};
</script>

<div class="min-h-screen stack p-6 w-full">
	<div class="h-stack w-full justify-between">
		<h1 class="text-3xl font-bold">Categories</h1>
		<CreateCategoryDialog {handleAddCategory} />
	</div>
</div>
