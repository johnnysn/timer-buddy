<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { activities } from '$lib/stores/activities-store';
	import { PlusCircle, Search } from 'lucide-svelte';
	import ActivityControl from './ActivityControl.svelte';
	import { fade } from 'svelte/transition';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import type { Activity } from '$lib/types/activity';
  import {flip} from "svelte/animate";
  import {dndzone, type DndEvent } from "svelte-dnd-action";

	let isFormShown = false;
	let activityName = '';
	let searchTimer = 0;
	let searchInputValue = '';
	let searchKey = '';
	let filteredActivities: Activity[] = [];

	function showForm() {
		isFormShown = true;
		searchInputValue = searchKey = '';
	}

	function addActivity() {
		activities.add(activityName, '');
		activityName = '';
		isFormShown = false;
	}

	function searchDebounce(e: Event) {
		const { value } = e.target as HTMLInputElement;
		clearTimeout(searchTimer);
		searchTimer = setTimeout(() => {
			searchKey = value;
		}, 200);
	}

	$: {
		filteredActivities = $activities.filter((a) => {
			const key = searchKey.trim().toLowerCase();

			if (key !== '') {
				return a.name.trim().toLowerCase().startsWith(key);
			} else {
				return true;
			}
		});
	}

	const flipDurationMs = 300;
	
	function handleDndConsider(evt: CustomEvent<DndEvent<Activity>>) {
		filteredActivities = evt.detail.items;
	}
	function handleDndFinalize(evt: CustomEvent<DndEvent<Activity>>) {
		activities.reorder(evt.detail.items);
	}
</script>

<div class="flex flex-col">
	<h2 class="w-full text-center text-2xl mb-1 font-semibold font-title">My activities</h2>

	{#if $activities.length === 0}
		<p class="w-full flex justify-center">You have no activities</p>
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

	{#if !isFormShown}
		<div class="w-full mb-4 flex justify-end">
			<button on:click={showForm} class="text-teal-600">
				<PlusCircle class="size-8" />
			</button>
		</div>
	{/if}

	{#if isFormShown}
		<div
			in:slide={{ delay: 0, duration: 300, easing: quintOut, axis: 'x' }}
			class="flex flex-col gap-2 mt-2 mb-6 max-w-screen-md border rounded-lg border-gray-200 dark:border-gray-700 px-4 pt-4 pb-2"
		>
			<TextInput
				name="name"
				placeholder="New activity"
				label=""
				required
				maxlength={40}
				blurAtStart={true}
				bind:value={activityName}
				on:keypress={(e) => {
					if (e.key === 'Enter') {
						addActivity();
					}
				}}
			/>

			<div class="w-full flex justify-around">
				<Button class="secondary" on:click={() => (isFormShown = false)} type="button"
					>Cancel</Button
				>
				<Button class="success" on:click={addActivity}>Create</Button>
			</div>
		</div>
	{/if}

	<ul
		use:dndzone={{ items: filteredActivities, flipDurationMs, dropTargetStyle: {} }}
		on:consider={handleDndConsider}
		on:finalize={handleDndFinalize}
		class="flex flex-col gap-2"
	>
		{#each filteredActivities as activity (activity.id)}
			<li
				class="item-container px-2 w-full max-w-screen-md"
				animate:flip={{duration: flipDurationMs}}
			>
				<ActivityControl {activity} />
			</li>
		{/each}
	</ul>
</div>
