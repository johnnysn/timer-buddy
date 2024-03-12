<script lang="ts">
	import { page } from '$app/stores';
	import TextInput from '$lib/components/TextInput.svelte';
	import { activities } from '$lib/stores/activities-store';

	let inputName: HTMLInputElement;

	$: activity = $activities.find((a) => a.id === $page.params.id);

	function submit() {

	}
</script>

<div
	class="flex flex-col gap-2 mb-4 max-w-screen-md border rounded-lg border-gray-200 dark:border-gray-700 p-4"
>
	<div class="w-full max-w-[360px]">
		<TextInput
			name="name"
			value={activity?.name}
			label="Activity name"
			bind:inputElement={inputName}
			on:keypress={evt => {
				if (evt.key === 'Enter') {
					submit();
				}
			}}
		/>
	</div>
</div>
