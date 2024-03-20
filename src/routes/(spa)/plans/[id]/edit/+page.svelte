<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
  import { plans } from "$lib/stores/plans-store";
	import type { Plan } from '$lib/types/plan';

	let plan: Plan | undefined;

  $: {
    plan = $plans.find(p => p.id === $page.params.id);
  }

  function submit(e: SubmitEvent) {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);
    const name = String(data.get("name"));
    const description = String(data.get("description"));

    plans.update(plan!.id, name, description);
    goto(`/plans/${plan!.id}`);
  }
</script>

<form
	class="flex flex-col gap-2 mt-2 mb-4 max-w-screen-md border rounded-lg border-gray-200 dark:border-gray-700 p-4"
  on:submit={submit}
>
	<Input name="name" id="name" required label="Plan name" value={plan?.name} />
	<Textarea name="description" id="description" label="Description" value={plan?.description} />

	<div class="w-full flex justify-around">
		<a href={`/plans/${plan?.id}`}>
			<Button class="secondary" type="button">
				Cancel
			</Button>
		</a>
		<Button class="success">Update</Button>
	</div>
</form>
