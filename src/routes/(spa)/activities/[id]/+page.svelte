<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import MyModal from '$lib/components/MyModal.svelte';
	import { activities } from '$lib/stores/activities-store';
	import type { Activity } from '$lib/types/activity';
	import intervalFormatter from '$lib/utils/interval-formatter';
	import { Edit, Trash2 } from 'lucide-svelte';
	import EventsTable from './EventsTable.svelte';

	let activity: Activity | undefined;

	$: activity = $activities.find((a) => a.id === $page.params.id);

	function handleDeleteActivity(decision: string) {
		if (decision === 'yes') {
			activities.delete(activity?.id ?? '');
			goto('/activities');
		}
	}
</script>

{#if activity}
	<p>
		<strong>Average duration: </strong>{activity.averageDuration
			? `~${intervalFormatter.format(activity.averageDuration)}`
			: 'No measurements yet!'}
	</p>

	<p class="flex flex-col justify-items-center">
		<strong class="mr-2">Description: </strong>
		<span>{activity.description || 'No description for this activity'}</span>
	</p>

	<div class="w-full flex justify-end items-center gap-4">
		<a href={`/activities/${activity.id}/edit`}>
			<Button class="primary px-4 flex items-center gap-1 text-sm">
				<Edit class="size-4" />
				<span>Edit</span>
			</Button>
		</a>

		<MyModal
			modalID="confirmation-dialog-delete-activity"
			title="Deletion confirmation"
			message="This will delete the activity and all its measured events. Are you sure to delete it?"
			textFirstButton="Cancel"
			textSecondButton="Delete"
			buttonClass="secondary px-4 flex items-center gap-1 text-sm"
			on:modalReturn={(event) => handleDeleteActivity(event.detail.selection)}
		>
			<Trash2 class="size-4" />
			<span>Delete</span>
		</MyModal>
	</div>

	<p class="mt-4 mb-4"><strong>Measurement events for this activity:</strong></p>

	{#if activity.events.length > 0}
		<EventsTable {activity} />
	{:else}
		<p class="w-full flex justify-start">No events yet!</p>
	{/if}
{/if}
