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
	<div class="flex flex-row pl-2"><strong class="mr-24">Now:</strong><Clock /></div>
	<p>
		<span class="flex flex-row mt-1 pl-2">
			<strong class="mr-6">Plan duration:</strong>
			{intervalFormatter.format(averageDuration)}
		</span>
	</p>
	<p class="border rounded-lg border-gray-200 dark:border-gray-700 p-2 my-2 bg-main-light dark:bg-main-dark">
		<span class="flex flex-row mt-1">
			<strong class="pr-2">Remaining time:</strong>
			<Countdown targetTime={planExecution.target} {averageDuration} />
		</span>
	</p>
	<p>
		<span class="flex flex-row mt-1 pl-2">
			<strong class="mr-11">Target time:</strong>
			<span>{dateFormatter.formatShort(planExecution.target)}</span>
		</span>
	</p>

	<div class="flex justify-around items-center">
		<Button class="secondary" on:click={() => dispatch('finish')}>Finish</Button>
	</div>
</div>
