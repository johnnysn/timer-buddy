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
	import intervalFormatter from '$lib/utils/interval-formatter';
	import { endOfDay } from 'date-fns';
	import { onDestroy, onMount } from 'svelte';

	let plan: Plan | undefined;
	let execution: PlanExecution | undefined;
	let planActivities: { id: string; activity: Activity; checked: boolean }[] = [];
	let averageDuration = 0;
	let watchDogInterval: number;

	$: {
		plan = $plans.find((p) => p.id === $page.params.id);

		if (plan) {
			const exLength = plan.executions.length;
			execution =
				exLength > 0 && !plan.executions[exLength - 1].end
					? plan.executions[exLength - 1]
					: undefined;
			const checkedActivities = new Set<string>();
			execution?.checkedActivities.forEach((id) => checkedActivities.add(id));

			planActivities =
				plan.activities.map((a) => ({
					id: a.id,
					activity: $activities.find((actv) => actv.id === a.activityId)!,
					checked: checkedActivities.has(a.activityId)
				})) ?? [];

			averageDuration = planActivities.reduce(
				(total, a) => total + (a.activity.averageDuration ?? 0),
				0
			);
		}
	}

	onMount(() => {
		watchDogInterval = setInterval(() => {
			if (execution) {
				const limit = endOfDay(execution.start);
				const now = new Date();
				if (now.getTime() > limit.getTime()) {
					plans.finish(plan!.id);
				}
			}
		}, 3000);
	});

	onDestroy(() => {
		clearInterval(watchDogInterval);
	});

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

	function handleCheckActivity(activityId: string) {
		plans.checkActivity(plan!.id, activityId);
	}

	function handleUncheckActivity(activityId: string) {
		plans.uncheckActivity(plan!.id, activityId);
	}
</script>

<p class="flex flex-col justify-items-center">
	<strong class="mr-2">Description: </strong>
	<span>{plan?.description || 'No description for this plan'}</span>
</p>
<p class="flex flex-row justify-items-center">
	<strong class="mr-2">Average duration: </strong>
	<span>{intervalFormatter.format(averageDuration) || 'No activities added to this plan yet'}</span>
</p>

{#if execution}
	<PlanTimer planExecution={execution} {averageDuration} on:finish={finish} />
{:else}
	<div class="w-full flex justify-end gap-2 mb-4">
		{#if planActivities.length > 0}
			<a href={`/plans/${plan?.id}/execute`}>
				<Button class="flex items-center gap-2 success text-sm px-4">
					<PlayCircle class="size-4" /> <span>Execute</span>
				</Button>
			</a>
		{/if}
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
			<span>Delete</span>
		</MyModal>
	</div>
{/if}

<h4 class="mt-4 mb-4 font-title font-medium text-lg">Activities</h4>
{#if !execution}
	<div class="w-full mb-4 flex justify-start">
		<a href={`/plans/${plan?.id}/add-activity`} class="flex">
			<PlusCircle color="green" />
			<span class="ml-2 text-sm">Add activity</span>
		</a>
	</div>
{/if}

{#if planActivities.length === 0}
	<p>No activities added to this plan yet.</p>
{:else}
	<DndActivityList
		activities={planActivities}
		isExecuting={!!execution}
		on:delete={(evt) => handleDeleteActivity(evt.detail.id)}
		on:change={(evt) => handleOrderChanged(evt.detail.arrangement)}
		on:check={(evt) => handleCheckActivity(evt.detail.activityId)}
		on:uncheck={(evt) => handleUncheckActivity(evt.detail.activityId)}
	/>
{/if}
