<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import { activities } from '$lib/stores/activities-store';
	import dateConverter from '$lib/utils/date-converter.js';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	$: activity = $activities.find((a) => a.id === $page.params.id);
	$: event = activity?.events.find((e) => e.id === $page.params.eventId);

	let started = '';
	let finished = '';

	$: {
		if (event?.start) {
			started = dateConverter.isoUtcToIsoLocale(event.start.toISOString()).slice(0, -5);
		}

		if (event?.end) {
			finished = dateConverter.isoUtcToIsoLocale(event.end.toISOString()).slice(0, -5);
		}
	}

	function submit(e: SubmitEvent) {
		e.preventDefault();

		const data = new FormData(e.target as HTMLFormElement);

		const start = new Date(String(data.get('start')));
		const end = new Date(String(data.get('end')));

		activities.editEvent(activity!.id, event!.id, start, end);
		goto(`/activities/${activity!.id}`);
	}
</script>

<form 
	class="w-full max-w-screen-md border rounded-lg border-gray-200 dark:border-gray-700 p-4"
	on:submit={submit}
	>
	<h2 class="text-xl font-title font-medium mb-4">Edit event</h2>

	<div class="w-full max-w-[280px] mb-2">
		<Input
			name="start"
			type="datetime-local"
			label="Event start"
			value={started}
			step={1}
			required
		/>
	</div>
	<div class="w-full max-w-[280px] mb-2">
		<Input
			name="end"
			type="datetime-local"
			label="Event finish"
			value={finished}
			step={1}
			required
		/>
	</div>

	<div class="flex justify-around items-center">
		<a href={`/activities/${activity?.id}`}>
			<Button class="secondary" type="button">Cancel</Button>
		</a>
		<Button class="success" disabled={!activity}>Submit</Button>
	</div>
</form>
