<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { activities } from '$lib/stores/activities-store';
	import { PlusCircle } from 'lucide-svelte';

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
	<h1 class="w-full flex justify-center text-2xl mb-1 font-semibold font-title">My activities</h1>

  {#if $activities.length === 0}
		<p class="w-full flex justify-center">You have no activities</p>
	{/if}

  {#if !showForm}
		<div class="w-full mb-4 flex justify-between">
			<button on:click={toggleShowForm}>
				<PlusCircle color="green" />
			</button>
		</div>
	{/if}

  {#if showForm}
		<div
			class="flex flex-col gap-2 mt-2 mb-6 max-w-screen-md border rounded-lg border-gray-200 dark:border-gray-700 px-4 pt-4 pb-2"
		>
			<div>
        <TextInput name="name" placeholder="New activity" label="" required 
          blurAtStart={true} 
          bind:value={activityName}
          on:keypress={(e) => {
            if (e.key === "Enter") {
              addActivity();
            }
          }}
           />
			</div>

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
			>
        <div>{activity.name}</div>
			</li>
		{/each}
	</ul>
</div>
