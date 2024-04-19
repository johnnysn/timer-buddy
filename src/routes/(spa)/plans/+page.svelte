<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { plans } from '$lib/stores/plans-store';
	import { Info, PlusCircle, Search } from 'lucide-svelte';
	import { quintOut } from 'svelte/easing';
	import { fade, slide } from 'svelte/transition';
	import { activities } from '$lib/stores/activities-store';
	import intervalFormatter from '$lib/utils/interval-formatter';
	import type { Plan } from '$lib/types/plan';
  import {flip} from "svelte/animate";
  import {dndzone, type DndEvent } from "svelte-dnd-action";

	let showForm = false;
	let planName = '';
	let searchTimer = 0;
	let searchInputValue = '';
	let searchKey = '';
	let filteredPlans: Plan[] = [];

	function addPlan() {
		plans.add(planName, '');
		planName = '';
		showForm = false;
	}

	function searchDebounce(e: Event) {
		const { value } = e.target as HTMLInputElement;
		clearTimeout(searchTimer);
		searchTimer = setTimeout(() => {
			searchKey = value;
		}, 200);
	}

	$: {
		filteredPlans = $plans.filter((a) => {
			const key = searchKey.trim().toLowerCase();

			if (key !== '') {
				return a.name.trim().toLowerCase().startsWith(key);
			} else {
				return true;
			}
		});
	}

	function planAverageDuration(planActivities: { id: string; activityId: string }[]) {
		let total = 0;
		planActivities.forEach((element) => {
			let activity = $activities.find((a) => a.id === element.activityId);
			if (activity!.averageDuration !== undefined) {
				total += activity!.averageDuration!;
			}
		});
		return intervalFormatter.format(total);
	}

	const flipDurationMs = 300;

	function handleDndConsider(evt: CustomEvent<DndEvent<Plan>>) {
		filteredPlans = evt.detail.items;
	}
	function handleDndFinalize(evt: CustomEvent<DndEvent<Plan>>) {
		plans.reorder(evt.detail.items);
	}
</script>

<div class="flex flex-col">
	<h1 class="w-full flex justify-center text-2xl mb-1 font-semibold font-title">My plans</h1>

	{#if $plans.length === 0}
		<p class="w-full flex justify-center">You have no plans</p>
	{:else}
		<div class="w-full flex justify-center gap-3 items-center my-4">
			<TextInput
				name="search"
				placeholder="Search activity"
				label=""
				maxlength={40}
				on:input={searchDebounce}
				bind:value={searchInputValue}
			/>

			<button
				class="rounded p-1 bg-main text-white"
				on:click={() => (searchKey = searchInputValue)}
			>
				<Search class="size-6" />
			</button>
		</div>
	{/if}

	{#if !showForm}
		<div class="w-full mb-4 flex justify-end">
			<button
				on:click={() => {
					showForm = true;
					searchKey = searchInputValue = '';
				}}
				class="text-teal-600"
			>
				<PlusCircle class="size-8" />
			</button>
		</div>
	{/if}

	{#if showForm}
		<div
			in:slide={{ delay: 0, duration: 300, easing: quintOut, axis: 'x' }}
			class="flex flex-col gap-2 mt-2 mb-6 max-w-screen-md border rounded-lg border-gray-200 dark:border-gray-700 px-4 pt-4 pb-2"
		>
			<TextInput
				name="name"
				placeholder="New plan"
				label=""
				required
				blurAtStart={true}
				maxlength={40}
				bind:value={planName}
				on:keypress={(e) => {
					if (e.key === 'Enter') {
						addPlan();
					}
				}}
			/>

			<div class="w-full flex justify-around">
				<Button class="secondary" on:click={() => (showForm = false)} type="button">Cancel</Button>
				<Button class="success" on:click={addPlan}>Create</Button>
			</div>
		</div>
	{/if}

	<ul
		use:dndzone={{ items: filteredPlans, flipDurationMs, dropTargetStyle: {} }}
		on:consider={handleDndConsider}
		on:finalize={handleDndFinalize}
		class="flex flex-col gap-2"
	>
		{#each filteredPlans as plan (plan.id)}
			<li
				class="item-container w-full"
				animate:flip="{{duration: flipDurationMs}}"
			>
				<a href={`/plans/${plan.id}`} class="py-4 px-2 w-full h-full block">
					<div class="w-full flex items-center">
						<button class="mr-2 text-main">
							<Info />
						</button>
						<span>
							{plan.name} <br />
							{#if plan.activities.length > 0}
								~{planAverageDuration(plan.activities)} -
								{plan.activities.length}
								{plan.activities.length === 1 ? 'activity' : 'activities'}
							{/if}
						</span>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</div>
