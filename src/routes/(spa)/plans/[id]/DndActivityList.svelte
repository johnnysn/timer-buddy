<script lang="ts">
	import intervalFormatter from '$lib/utils/interval-formatter';
	import { Trash2 } from 'lucide-svelte';
	import { dndzone, type DndEvent } from 'svelte-dnd-action';
	import { createEventDispatcher } from 'svelte';
	import { flip } from 'svelte/animate';
	import type { Activity } from '$lib/types/activity';
	import MyModal from '$lib/components/MyModal.svelte';

	const flipDurationMs = 200;

	const dispatch = createEventDispatcher();
	type ItemType = { id: string; activity: Activity; checked: boolean };
	export let activities: ItemType[];
	export let isExecuting: boolean = false;

	const handleConsider = (evt: CustomEvent<DndEvent<ItemType>>) => {
		activities = evt.detail.items;
	};

	const handleFinalize = (evt: CustomEvent<DndEvent<ItemType>>) => {
		const arrangement = evt.detail.items.map((a) => ({ id: a.id, activityId: a.activity.id }));
		activities = evt.detail.items;
		dispatch('change', { arrangement });
	};

	const handleCheck = (evt: Event, activityId: string) => {
		const checked = (evt.target as HTMLInputElement).checked;
		if (checked) {
			dispatch('check', { activityId });
		} else {
			dispatch('uncheck', { activityId });
		}
	};
</script>

<ul
	use:dndzone={{ items: activities, flipDurationMs, dropTargetStyle: {} }}
	on:consider={handleConsider}
	on:finalize={handleFinalize}
	class="flex flex-col gap-4"
>
	{#each activities as a (a.id)}
		<li
			class="item-container flex items-center justify-between px-2 py-3"
			animate:flip={{ duration: flipDurationMs }}
		>
			<label class="flex flex-row items-center font-medium">
				{#if isExecuting}
					<input
						type="checkbox"
						class="h-5 w-5 mr-2 accent-accent"
						bind:checked={a.checked}
						on:change={(e) => handleCheck(e, a.activity.id)}
					/>
				{/if}
				<span
					class={`${isExecuting && a.checked ? 'line-through text-gray-700 dark:text-gray-300' : ''}`}
				>
					{a.activity.name}
					{a.activity.averageDuration
						? `(~${intervalFormatter.format(a.activity.averageDuration)})`
						: ''}
				</span>
			</label>
			{#if !isExecuting}
				<MyModal
					modalID={`confirmation-dialog-delete-plan-activity-${a.id}`}
					title="Deletion confirmation"
					message="Are you sure to delete this activity of the plan?"
					textFirstButton="Cancel"
					textSecondButton="Delete"
					on:modalReturn={(event) => {
						if (event.detail.selection === 'yes') {
							dispatch('delete', { id: a.id });
						}
					}}
				>
					<span class="text-accent"><Trash2 /></span>
				</MyModal>
			{/if}
		</li>
	{/each}
</ul>
