<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends HTMLInputAttributes {
		blurAtStart?: boolean;
		label: string;
		inputElement?: HTMLInputElement | undefined;
	}

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
	type={$$props.type ?? 'text'}
	placeholder={$$props.placeholder || $$props.label}
	id={$$props.id || $$props.name}
	class="shadow appearance-none border rounded border-gray-800 dark:border-gray-100 w-full py-2 px-3
          leading-tight text-sm font-medium focus:outline-none ring-primary-500 focus:ring-2 bg-transparent"
	bind:this={inputElement}
	on:blur
	on:change
  on:keypress
	use:focusOnInit
/>