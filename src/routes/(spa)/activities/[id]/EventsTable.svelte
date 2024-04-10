<script lang="ts">
	import MyModal from '$lib/components/MyModal.svelte';
	import { activities } from '$lib/stores/activities-store';
	import type { Activity } from '$lib/types/activity';
	import { type Event } from '$lib/types/event';
	import dateFormatter from '$lib/utils/date-formatter';
	import intervalFormatter from '$lib/utils/interval-formatter';
	import { Edit, Trash2 } from 'lucide-svelte';

	export let activity: Activity;

	$: events = activity.events;

	const getDuration = (event: Event) => {
		if (event.end && event.start) {
			const end = event.end.getTime();
			const ini = event.start.getTime();
			const seconds = Math.floor((end - ini) / 1000);

			return intervalFormatter.format(seconds);
		}

		return '';
	};

	async function handleDeleteAction(decision: string, event: Event) {
		if (decision === 'yes') {
			activities.deleteEvent(activity.id, event.id);
		}
	}
</script>

<div class="border border-gray-300 rounded flex flex-col items-center">
	<table
		class="table-auto w-full border-gray-200 rounded-md border-collapse border-spacing-x-1 border-spacing-y-2"
	>
		<thead class="uppercase">
			<tr class="border-b">
				<th></th>
				<th class="py-2">Duration</th>
				<th class="py-2">Started at</th>
				<th class="py-2">Finished at</th>
			</tr>
		</thead>
		<tbody>
			{#each events as event (event.id)}
				<tr class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300">
					<td class="flex justify-center items-center gap-2">
						<MyModal
							modalID={`confirmation-with-icon-${event.id}`}
							title="Deletion confirmation"
							message="Are you sure to delete this event?"
							textFirstButton="Cancel"
							textSecondButton="Delete"
							on:modalReturn={(evt) => handleDeleteAction(evt.detail.selection, event)}
						>
							<span class="text-accent"><Trash2 /></span>
						</MyModal>
						<a href={`/activities/${activity.id}/events/${event.id}`}>
							<Edit />
						</a>
					</td>
					<td class="text-center">{getDuration(event)}</td>
					<td class="text-center">
						{dateFormatter.formatShort(event.start)}
					</td>
					<td class="text-center">
						{event.end ? dateFormatter.formatShort(event.end) : 'ongoing...'}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
