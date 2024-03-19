<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface $$Props extends HTMLButtonAttributes {}

	let clazz = '';
	$: {
		if ($$restProps.class) {
			clazz = $$restProps.class;
		} else {
			clazz = 'primary';
		}
	}
</script>

<button
	{...$$restProps}
	class={`mt-6 rounded-full transition-colors duration-300 px-6 py-2 disabled:bg-gray-50 disabled:text-gray-500 ${clazz || ''}`}
	on:click
>
	<slot />
</button>

<style>
	.primary {
		@apply bg-main text-white;
	}

	.primary:hover {
		@apply bg-main-hover;
	}

	.secondary {
		@apply bg-accent text-white;
	}

	.secondary:hover {
		@apply bg-accent-hover;
	}

	.success {
		@apply bg-teal-600 text-white;
	}

	.success:hover {
		@apply bg-teal-500;
	}

	.danger {
		@apply bg-red-600 text-white;
	}

	.danger:hover {
		@apply bg-red-500;
	}
</style>
