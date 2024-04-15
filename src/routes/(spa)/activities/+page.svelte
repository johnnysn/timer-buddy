<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { activities } from '$lib/stores/activities-store';
	import { PlusCircle } from 'lucide-svelte';
	import ActivityControl from './ActivityControl.svelte';
	import { fade } from 'svelte/transition';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let showForm = false;
	let activityName = '';

	function toggleShowForm() {
		showForm = !showForm;
	}

	function addActivity() {
		activities.add(activityName, '');
		activityName = '';
		showForm = false;
	}
</script>

<div class="flex flex-col">
	<h2 class="w-full text-center text-2xl mb-1 font-semibold font-title">My activities</h2>

	{#if $activities.length === 0}
		<p class="w-full flex justify-center">You have no activities</p>
	{/if}

	{#if !showForm}
		<div class="w-full mb-4 flex justify-end">
			<button on:click={toggleShowForm} class="text-teal-600">
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
				<Button class="secondary" on:click={toggleShowForm} type="button">Cancel</Button>
				<Button class="success" on:click={addActivity}>Create</Button>
			</div>
		</div>
	{/if}

	<ul class="flex flex-col gap-2">
		{#each $activities as activity (activity.id)}
			<li
				class="item-container px-2 w-full max-w-screen-md"
				transition:fade={{ delay: 250, duration: 300 }}
			>
				<ActivityControl {activity} />
			</li>
		{/each}
	</ul>
</div>
