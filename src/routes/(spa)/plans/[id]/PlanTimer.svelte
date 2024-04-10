<script lang="ts">
	import Clock from '$lib/components/Clock.svelte';
	import Button from '$lib/components/Button.svelte';
	import dateFormatter from '$lib/utils/date-formatter';
	import intervalFormatter from '$lib/utils/interval-formatter';
	import Countdown from '$lib/components/Countdown.svelte';
	import type { PlanExecution } from '$lib/types/plan';
	import { createEventDispatcher } from 'svelte';
	import { darkModeStore } from '$lib/stores/dark-mode-store';

	const dispatch = createEventDispatcher();

	export let averageDuration: number;
	export let planExecution: PlanExecution;

	let linearView = true;
</script>

<div class="w-full max-w-screen-md border rounded-lg border-gray-200 dark:border-gray-700 p-4 mt-4">
{#if linearView}
	<div class="flex flex-row pl-2"><strong class="mr-2">Now:</strong><Clock /></div>
	<p>
		<span class="flex flex-row mt-1 pl-2">
			<strong class="mr-2">Plan duration:</strong>
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
			<strong class="pr-2">Target time:</strong>
			<span>{dateFormatter.format(planExecution.target)}</span>
		</span>
	</p>
{/if}

{#if !linearView}
	<div class="flex flex-row">
		<div class="max-w-11 max-h-72 md:max-h-64">
			{#if $darkModeStore}
				<img src="/time_arrow-dark.png" alt="Arrow time"  style="height: auto; max-height: 100%;" />
			{:else}
				<img src="/time_arrow.png" alt="Arrow time"  style="height: auto; max-height: 100%;" />
			{/if}
		</div>
		<div class="w-full">
			<div class="flex flex-row pl-2 py-2 border border-gray-200"  ><strong class="mr-2">Now:</strong><Clock /></div>

			<div class="border-t-2 border-x-2 border-gray-200 mt-2 bg-main-light dark:bg-main-dark py-2">
				<div class="pl-20 md:pl-60"><img src="/hourglass.webp" alt="Hourglass" width="25" height="25" /></div>
			</div>
			<div class="flex flex-row justify-between w-full">
				<div class="flex justify-center border-r-2 border-y-2 border-gray-200 w-1/2 md:w-3/4">
					<p class="flex justify-center w-full">
						<span class="flex flex-col w-full my-2 mr-2 pl-2 py-2 border border-gray-200">
							<div class="flex flex-col md:flex-row justify-items-center">
								<div class="flex justify-center"><strong class="mr-2">Plan duration:</strong></div>
								<div class="flex justify-center">{intervalFormatter.format(averageDuration)}</div>
							</div>
						</span>
					</p>
				</div>
				<div class="flex justify-center border-r-2 border-gray-200 w-1/2 md:w-1/4 bg-main-light dark:bg-main-dark">
					<span class="flex flex-col mt-1">
						<strong class="flex justify-center">Remaining</strong>
						<strong class="flex justify-center">time:</strong>
						<div class="flex justify-center"><Countdown targetTime={planExecution.target} {averageDuration} /></div>
					</span>
				</div>
			</div>
			<div class="border-b-2 border-x-2 border-gray-200 bg-main-light dark:bg-main-dark mb-2 py-2">
				<div class="pl-20 md:pl-60"><img src="/hourglass.webp" alt="Hourglass" width="25" height="25" /></div>
			</div>

			<p class="border border-gray-200">
				<span class="flex flex-row mt-1 pl-2 py-2">
					<strong class="pr-2">Target time:</strong>
					<span>{dateFormatter.format(planExecution.target)}</span>
				</span>
			</p>
		</div>
	</div>
{/if}

	<div class="flex justify-around items-center">
		<Button class="primary" on:click={() => linearView = !linearView}>Toggle view</Button>
		<Button class="secondary" on:click={() => dispatch('finish')}>Finish</Button>
	</div>
</div>
