<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { plans } from '$lib/stores/plans-store';
	import { PlusCircle } from 'lucide-svelte';
	import { quintOut } from 'svelte/easing';
	import { blur, fade, slide } from 'svelte/transition';

	let showForm = false;
	let planName = '';

	function addPlan() {
		plans.add(planName, '');
		planName = '';
		showForm = false;
	}
</script>

<div class="flex flex-col">
	<h1 class="w-full flex justify-center text-2xl mb-1 font-semibold font-title">My plans</h1>

	{#if $plans.length === 0}
		<p class="w-full flex justify-center">You have no plans</p>
	{/if}

	{#if !showForm}
		<div class="w-full mb-4 flex justify-end">
			<button on:click={() => (showForm = true)} class="text-teal-600">
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

	<ul class="flex flex-col gap-2">
		{#each $plans as plan (plan.id)}
			<li class="item-container w-full" transition:fade={{ delay: 250, duration: 300 }}>
				<a href={`/plans/${plan.id}`} class="py-4 px-2 w-full h-full block">
					{plan.name}
				</a>
			</li>
		{/each}
	</ul>
</div>
