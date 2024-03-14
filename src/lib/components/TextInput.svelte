<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends HTMLInputAttributes {
		blurAtStart?: boolean;
		value?: string;
		label: string;
		inputElement?: HTMLInputElement | undefined;
	}

	export let value: string = '';
	export let inputElement: HTMLInputElement | undefined = undefined;

	function focusOnInit(el: HTMLInputElement) {
		if ($$props.blurAtStart) {
			el.focus();
		}
	}
</script>

{#if $$props.label}
	<label for={$$props.id || $$props.name} class="block text-sm font-medium mb-1">
    {$$props.label}
  </label>
{/if}

<input
	{...$$props}
	type="text"
	placeholder={$$props.placeholder || $$props.label}
	id={$$props.id || $$props.name}
	class="shadow appearance-none border rounded border-gray-800 dark:border-gray-100 w-full py-2 px-3
          leading-tight font-medium text-sm focus:outline-none ring-primary-500 focus:ring-2 bg-transparent"
	bind:this={inputElement}
	bind:value
	on:blur
	on:change
  on:keypress
	use:focusOnInit
/>
