<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import MyModal from '$lib/components/MyModal.svelte';
	import { activities } from '$lib/stores/activities-store';
	import type { Activity } from '$lib/types/activity';
	import intervalFormatter from '$lib/utils/interval-formatter';

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
      <Button class="primary">Edit</Button>
    </a>

		<MyModal
			modalID="confirmation-dialog-delete-activity"
			buttonText="Delete"
			title="Deletion confirmation"
			message="This will delete the activity and all its measured events. Are you sure to delete it?"
			textFirstButton="Cancel"
			textSecondButton="Delete"
			buttonClass="danger"
			on:modalReturn={(event) => handleDeleteActivity(event.detail.selection)}
		/>
  </div>

  <p class="mt-4 mb-4"><strong>Measurement events for this activity:</strong></p>
{/if}
