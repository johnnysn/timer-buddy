<script lang="ts">
	import intervalFormatter from '$lib/utils/interval-formatter';
	import { Trash2 } from 'lucide-svelte';
	import { dndzone, type DndEvent } from 'svelte-dnd-action';
	import { createEventDispatcher } from 'svelte';
	import { flip } from 'svelte/animate';
	import type { Activity } from '$lib/types/activity';

	const flipDurationMs = 200;

	const dispatch = createEventDispatcher();
	type ItemType = { id: string; activity: Activity };
	export let activities: ItemType[];

	const handleConsider = (evt: CustomEvent<DndEvent<ItemType>>) => {
		activities = evt.detail.items;
	};

	const handleFinalize = (evt: CustomEvent<DndEvent<ItemType>>) => {
		const arrangement = evt.detail.items.map((a) => ({ id: a.id, activityId: a.activity.id }));
		activities = evt.detail.items;
		dispatch('change', { arrangement });
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
			<h3 class="font-medium">
				{a.activity.name}
				<span>
					{a.activity.averageDuration
						? `(~${intervalFormatter.format(a.activity.averageDuration)})`
						: ''}
				</span>
			</h3>
			<button
				type="button"
				class="text-accent"
				on:click={() => {
					dispatch('delete', { id: a.id });
				}}
			>
				<Trash2 />
			</button>
		</li>
	{/each}
</ul>
