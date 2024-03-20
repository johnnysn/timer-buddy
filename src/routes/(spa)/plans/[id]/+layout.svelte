<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { plans } from "$lib/stores/plans-store";
	import type { Plan } from "$lib/types/plan";

  let plan: Plan | undefined;

  $: {
    plan = $plans.find(p => p.id === $page.params.id);
    if (!plan) {
      goto('/plans');
    }
  } 
</script>

<div class="flex flex-col">
	<div class="w-full flex flex-row">
		<div class="w-3/12 flex justify-start items-center">
			<a href="/plans">
				<button
					class="rounded-full md:w-auto h-6 px-2 py-0 bg-main text-gray-50 hover:bg-main-hover transition-colors duration-300 text-sm"
					type="button"
				>
					Plans
				</button>
			</a>
		</div>
		<h2 class="w-9/12 flex justify-start md:justify-center text-3xl mb-4 font-semibold font-title">
			{plan?.name}
		</h2>
	</div>

	<slot />
</div>