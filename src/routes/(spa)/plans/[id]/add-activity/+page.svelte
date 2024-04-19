<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { activities } from '$lib/stores/activities-store.js';
	import { plans } from '$lib/stores/plans-store.js';
	import intervalFormatter from '$lib/utils/interval-formatter.js';
	import { Search } from 'lucide-svelte';
import type { Activity } from '$lib/types/activity';
	import TextInput from '$lib/components/TextInput.svelte';

	$: returnUrl = `/plans/${$page.params.id}`;
	let searchTimer = 0;
	let searchInputValue = '';
	let searchKey = '';
	let filteredActivities: Activity[] = [];

	function addActivity(activityId: string) {
		plans.addActivity($page.params.id, activityId);
		goto(returnUrl);
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
				return a.name.trim().toLowerCase().includes(key);
			} else {
				return true;
			}
		});
	}
</script>

<h2 class="flex mt-2 justify-center text-lg mb-1 font-semibold font-title">
	Add an activity for this plan
</h2>

<div class="flex justify-end">
	<a href={returnUrl}>
		<Button class="secondary mb-4" type="button">Cancel</Button>
	</a>
</div>

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

<ul class="flex flex-col gap-2">
	{#each filteredActivities as activity (activity.id)}
		<li>
			<button
				class="item-container px-2 w-full max-w-screen-md flex flex-col"
				on:click={() => addActivity(activity.id)}
			>
				<h3 class="font-semibold">{activity.name}</h3>
				<p class="truncate ...">
					<span class="font-semibold text-sm">Description: </span>
					{activity.description ?? 'No description'}
				</p>
				<p class="mb-1">
					<span class="font-semibold text-sm">Duration: </span>
					{activity.averageDuration
						? `~${intervalFormatter.format(activity.averageDuration)}`
						: 'No average duration'}
				</p>
			</button>
		</li>
	{/each}
</ul>
