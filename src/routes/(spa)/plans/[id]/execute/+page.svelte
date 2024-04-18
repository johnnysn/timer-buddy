<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Clock from '$lib/components/Clock.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { Plan } from '$lib/types/plan';
	import { plans } from '$lib/stores/plans-store';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { activities } from '$lib/stores/activities-store';
	import { addToast } from '$lib/stores/toast-store';
	import intervalFormatter from '$lib/utils/interval-formatter';

	let plan: Plan | undefined;
	let averageDuration = 0;

	$: {
		plan = $plans.find((p) => p.id === $page.params.id);
		const validIds = new Set($activities.map((a) => a.id));
		const planActivities =
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
	}

	function submit(e: SubmitEvent) {
		e.preventDefault();

		const data = new FormData(e.target as HTMLFormElement);

		const target = String(data.get('target'));
		if (!/[0-2][0-9]:[0-9]{2}/.test(target)) {
			addToast({ message: 'Time string is invalid!', type: 'error' });
			return;
		}

		const splittedTime = target.split(':');
		const hour = Number(splittedTime[0]);
		const minute = Number(splittedTime[1]);

		const targetTime = new Date();
		targetTime.setHours(hour, minute, 0, 0);

		if (targetTime.getTime() < new Date().getTime()) {
			addToast({ message: 'Target time cannot be before the current time.', type: 'error' });
			return;
		}

		plans.start(plan!.id, targetTime);
		goto(`/plans/${plan!.id}`);
	}
</script>

<form
	class="w-full max-w-screen-md border rounded-lg border-gray-200 dark:border-gray-700 p-4 mt-4"
	on:submit={submit}
>
	<div class="text-center mb-6 md:mx-16">
		<strong>Choose a target time in the future so that you can know the remaining free time from now regarding the plan duration</strong>
	</div>
	<div class="pl-10 md:pl-60">
		<div class="flex flex-row mb-1">
			<span class="mr-32">Now:</span>
			<Clock />
		</div>
		<div class="flex flex-row mb-1">
			<span class="mr-16">Plan duration:</span>
			<span>{intervalFormatter.format(averageDuration)}</span>
		</div>
		<div class="flex flex-row mb-4">
			<p class="mr-3">Now + Plan duration:</p>
			<Clock secondsToAdd={averageDuration} />
		</div>

		<div class="w-full max-w-[140px] mb-2">
			<input type="hidden" name="id" value={plan?.id} />
			<Input name="target" type="time" label="Target time" required />
		</div>
		<p class="text-xs">Must be greater than "Now + Plan duration"</p>
	</div>
	<div class="text-center mt-6 md:mx-16">
		<strong>In addition to the countdown for the target time, the activities will be available for check</strong>
	</div>


	<div class="flex justify-around items-center">
		<Button class="secondary" type="button" on:click={() => goto(`/plans/${plan?.id}`)}>
			Cancel
		</Button>
		<Button class="primary" type="submit">Start</Button>
	</div>
</form>
