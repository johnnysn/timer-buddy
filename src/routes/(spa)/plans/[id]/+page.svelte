<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import Button from "$lib/components/Button.svelte";
  import MyModal from "$lib/components/MyModal.svelte";
	import { plans } from "$lib/stores/plans-store";
	import type { Plan } from "$lib/types/plan";

  let plan: Plan | undefined;

  $: {
    plan = $plans.find(p => p.id === $page.params.id);

  }

  function handleDeletePlan(decision: string) {
    if (decision === 'yes') {
      plans.delete(plan!.id);
      goto('/plans');
    }
  }
</script>
<p>
  <strong class="mr-2">Description: </strong>
  <span>{plan?.description || 'No description for this plan'}</span>
</p>

<div
  class="w-full flex justify-end gap-3 mb-4"
>
  <a href={`/plans/${plan?.id}/edit`}><Button type="button" class="primary">Edit</Button></a>
  <MyModal
    modalID="confirmation-dialog-delete-plan"
    buttonText="Delete"
    title="Deletion confirmation"
    message="Are you sure to delete this plan?"
    textFirstButton="Cancel"
    textSecondButton="Delete"
    buttonClass="secondary"
    on:modalReturn={(event) => handleDeletePlan(event.detail.selection)}
  />
</div>