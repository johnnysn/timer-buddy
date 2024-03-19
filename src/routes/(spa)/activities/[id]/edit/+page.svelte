<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import { activities } from '$lib/stores/activities-store';

	$: activity = $activities.find((a) => a.id === $page.params.id);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		
		const id = activity?.id ?? '';
		const name = String(formData.get('name'));
		const description = String(formData.get('description'));
		
		activities.update(id, name, description);
		goto(`/activities/${id}`);
	}
</script>

<form
	class="flex flex-col gap-2 mb-4 max-w-screen-md border rounded-lg border-gray-200 dark:border-gray-700 p-4"
	on:submit={submit}
>
	<div class="w-full max-w-[360px]">
		<TextInput
			name="name"
			value={activity?.name}
			label="Activity name"
			required
		/>
	</div>

	<div class="w-full max-w-[360px]">
		<Textarea name="description" label="Description" value={activity?.description} rows={5} />
	</div>

	<div class="w-full flex justify-around">
		<a href={`/activities/${activity?.id}`} class="w-1/3 md:w-auto">
			<Button class="secondary text-white" type="button">
				Cancel
			</Button>
		</a>
		<Button type="submit" class="bg-teal-600 hover:bg-teal-500 text-white">Update</Button>
	</div>
</form>
