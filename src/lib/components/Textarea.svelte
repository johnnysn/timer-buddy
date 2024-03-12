<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	interface $$Props extends HTMLTextareaAttributes {
		blurAtStart?: boolean;
		value?: string;
		label: string;
	}

	export let value: string = '';
</script>

{#if $$props.label}
	<label for={$$props.id || $$props.name} class="block text-sm font-medium mb-1">
    {$$props.label}
  </label>
{/if}

<textarea
	{...$$props}
	placeholder={$$props.placeholder || $$props.label}
	id={$$props.id || $$props.name}
	class="shadow appearance-none border rounded border-gray-800 dark:border-gray-100 w-full py-2 px-3
          leading-tight text-sm focus:outline-none ring-primary-500 focus:ring-2 bg-transparent"
	bind:value
	on:blur
	on:change
  on:keypress
></textarea>
