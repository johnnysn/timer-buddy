<script lang="ts">
	import Modal, { getModal } from '$lib/components/Modal.svelte';
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';

	export let modalID = '';
	export let buttonText = '';
	export let title = '';
	export let message = '';
	export let textFirstButton = '';
	export let textSecondButton = '';
	export let buttonClass = '';

	export function modalComunication() {
		getModal(modalID).open(setSelection);
	}
	const dispatch = createEventDispatcher();
	function setSelection(response = '') {
		dispatch('modalReturn', { selection: response });
	}
</script>

{#if buttonText !== ''}
	<Button class={buttonClass} type="button" on:click={modalComunication}>
		{buttonText}
	</Button>
{:else}
	<button type="button" on:click={modalComunication} class={buttonClass}>
		<slot />
	</button>
{/if}

<Modal id={modalID}>
	<h1 class="modal-title">{title}</h1>
	<p class="text-center">{message}</p>
	<div class="flex items-center justify-around">
		<Button type="button" on:click={() => getModal(modalID).close('no')} class="danger">
			{textFirstButton}
		</Button>
		{#if textSecondButton !== ''}
			<Button type="button" on:click={() => getModal(modalID).close('yes')} class="success">
				{textSecondButton}
			</Button>
		{/if}
	</div>
</Modal>

<style>
	.modal-title {
		@apply uppercase mb-2 text-center text-primary-700 font-extrabold;
	}
</style>