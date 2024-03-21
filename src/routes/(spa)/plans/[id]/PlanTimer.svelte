<script lang="ts">
	import Clock from '$lib/components/Clock.svelte';
	import Button from '$lib/components/Button.svelte';
	import dateFormatter from '$lib/utils/date-formatter';
	import intervalFormatter from '$lib/utils/interval-formatter';
	import Countdown from '$lib/components/Countdown.svelte';
	import type { PlanExecution } from '$lib/types/plan';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let averageDuration: number;
	export let planExecution: PlanExecution;
</script>

<div class="w-full max-w-screen-md border rounded-lg border-gray-200 dark:border-gray-700 p-4 mt-4">
	<div class="flex flex-row mb-1"><strong class="mr-2">Now:</strong><Clock /></div>
	<p>
		<span>
			<strong>Target time:</strong>
			{dateFormatter.format(planExecution.target)}
		</span>
	</p>
	<p>
		<span class="flex flex-row mt-1">
			<strong class="mr-2">Expected duration:</strong>
			{intervalFormatter.format(averageDuration)}
		</span>
	</p>
	<p>
		<span class="flex flex-row mt-1">
			<strong class="pr-2">Remaining time:</strong>
			<Countdown targetTime={planExecution.target} {averageDuration} />
		</span>
	</p>

	<div class="flex justify-around items-center">
		<Button class="secondary" on:click={() => dispatch('finish')}>Finish</Button>
	</div>
</div>
