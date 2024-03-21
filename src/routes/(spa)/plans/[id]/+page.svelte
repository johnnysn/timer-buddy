<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { activities } from '$lib/stores/activities-store.js';
	import MyModal from '$lib/components/MyModal.svelte';
	import { plans } from '$lib/stores/plans-store';
	import type { Activity } from '$lib/types/activity';
	import type { Plan, PlanExecution } from '$lib/types/plan';
	import { Edit, PlayCircle, PlusCircle, Trash2 } from 'lucide-svelte';
	import DndActivityList from './DndActivityList.svelte';
	import PlanTimer from './PlanTimer.svelte';

	let plan: Plan | undefined;
	let execution: PlanExecution | undefined;
	let planActivities: { id: string; activity: Activity }[] = [];
	let averageDuration = 0;

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

		averageDuration = planActivities.reduce(
			(total, a) => total + (a.activity.averageDuration ?? 0),
			0
		);

		execution = plan?.executions.find((e) => !e.end);
	}

	function handleDeletePlan(decision: string) {
		if (decision === 'yes') {
			plans.delete(plan!.id);
			goto('/plans');
		}
	}

	function handleDeleteActivity(id: string) {
		plans.removeActivity(plan!.id, id);
	}

	function handleOrderChanged(arrangement: { id: string; activityId: string }[]) {
		plans.updateArrangement(plan!.id, arrangement);
	}

	function finish() {
		plans.finish(plan!.id);
	}
</script>

<p>
	<strong class="mr-2">Description: </strong>
	<span>{plan?.description || 'No description for this plan'}</span>
</p>

{#if execution}
	<PlanTimer planExecution={execution} {averageDuration} on:finish={finish} />
{:else}
	<div class="w-full flex justify-end gap-2 mb-4">
		<a href={`/plans/${plan?.id}/execute`}>
			<Button class="flex items-center gap-2 success text-sm px-4">
				<PlayCircle class="size-4" /> <span>Execute</span>
			</Button>
		</a>
		<a href={`/plans/${plan?.id}/edit`}>
			<Button type="button" class="primary flex items-center gap-2 text-sm px-4">
				<Edit class="size-4" />
				<span>Edit</span>
			</Button>
		</a>
		<MyModal
			modalID="confirmation-dialog-delete-plan"
			title="Deletion confirmation"
			message="Are you sure to delete this plan?"
			textFirstButton="Cancel"
			textSecondButton="Delete"
			buttonClass="secondary flex items-center gap-2 text-sm px-4"
			on:modalReturn={(event) => handleDeletePlan(event.detail.selection)}
		>
			<Trash2 class="size-4" />
			<span>Edit</span>
		</MyModal>
	</div>

	<h4 class="mt-4 mb-4 font-title font-medium text-lg">Activities</h4>
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
{/if}
