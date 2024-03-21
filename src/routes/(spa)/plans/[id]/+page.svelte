<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { activities } from '$lib/stores/activities-store.js';
	import MyModal from '$lib/components/MyModal.svelte';
	import { plans } from '$lib/stores/plans-store';
	import type { Activity } from '$lib/types/activity';
	import type { Plan } from '$lib/types/plan';
	import { PlusCircle } from 'lucide-svelte';
	import DndActivityList from './DndActivityList.svelte';

	let plan: Plan | undefined;
	let planActivities: { id: string; activity: Activity }[] = [];

	$: {
		plan = $plans.find((p) => p.id === $page.params.id);
		const validIds = new Set($activities.map((a) => a.id));
		planActivities =
			plan?.activities
				.filter((a) => validIds.has(a.activityId))
				.map((a) => ({
					id: a.id,
					activity: $activities.find((actv) => actv.id === a.activityId)!
				})) ?? [];
	}

	function handleDeletePlan(decision: string) {
		if (decision === 'yes') {
			plans.delete(plan!.id);
			goto('/plans');
		}
	}

	async function handleDeleteActivity(id: string) {
		plans.removeActivity(plan!.id, id);
	}

	async function handleOrderChanged(arrangement: { id: string; activityId: string }[]) {
		plans.updateArrangement(plan!.id, arrangement);
	}
</script>

<p>
	<strong class="mr-2">Description: </strong>
	<span>{plan?.description || 'No description for this plan'}</span>
</p>

<div class="w-full flex justify-end gap-3 mb-4">
	<a href={`/plans/${plan?.id}/edit`}><Button type="button" class="primary">Edit</Button></a>
	<MyModal
		modalID="confirmation-dialog-delete-plan"
		buttonText="Delete"
		title="Deletion confirmation"
		message="Are you sure to delete this plan?"
		textFirstButton="Cancel"
		textSecondButton="Delete"
		buttonClass="secondary"
		on:modalReturn={(event) => handleDeletePlan(event.detail.selection)}
	/>
</div>

<p class="mt-4 mb-4"><strong>Activities of this plan:</strong></p>
<div class="w-full mb-4 flex justify-start">
	<a href={`/plans/${plan?.id}/add-activity`}>
		<PlusCircle color="green" />
	</a>
	<span class="ml-2 text-sm">Add activity</span>
</div>

{#if planActivities.length === 0}
	<p>No activities added to this plan yet.</p>
{:else}
	<DndActivityList
		activities={planActivities}
		on:delete={(evt) => handleDeleteActivity(evt.detail.id)}
		on:change={(evt) => handleOrderChanged(evt.detail.arrangement)}
	/>
{/if}
