<script lang="ts">
	import { Plus } from 'lucide-svelte';
	import MainDialog from '../base/MainDialog.svelte';
	import Label from '../ui/label/label.svelte';
	import Input from '../ui/input/input.svelte';
	import Textarea from '../ui/textarea/textarea.svelte';
	import { Close } from '../ui/dialog';
	import { Button } from '../ui/button';
	export let handleAddCategory: (event: SubmitEvent | { target: HTMLFormElement }) => Promise<void>;
</script>

<MainDialog title="Add a new category">
	<Button type="button" size="icon"><Plus /></Button>
	<div slot="dialog-body" class="stack w-full">
		<form class="stack w-full" on:submit|preventDefault={handleAddCategory} action="?/add-category">
			<div class="stack w-full">
				<Label for="name">Name</Label>
				<Input type="text" id="name" name="name" />
			</div>
			<div class="stack w-full">
				<Label for="description">Description</Label>
				<Textarea id="description" name="description" />
			</div>
			<Close>
				<Button type="submit" class="w-full">Add</Button>
			</Close>
		</form>
	</div>
</MainDialog>
