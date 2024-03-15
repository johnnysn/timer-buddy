<script>
	import { Ban, CheckCircle, Info, X } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	export let type = 'info';

	$: toastBg = type === 'info' ? "bg-primary-300" : (type === "error" ? "bg-secondary-400" : "bg-teal-400");
</script>

<article class={`py-3 px-6 rounded flex items-center mx-auto mt-0 mb-2 w-80 text-white ${toastBg}`} role="alert" transition:fade>
	{#if type === 'success'}
		<CheckCircle class="w-8 h-8" />
	{:else if type === 'error'}
		<Ban class="w-8 h-8" />
	{:else}
		<Info class="w-8 h-8" />
	{/if}

	<div class="ml-4">
		<slot />
	</div>

	<button class="close" on:click={() => dispatch('dismiss')}>
		<X class="w-6 h-6" />
	</button>
</article>
