<script lang="ts">
  import Toast from "./Toast.svelte";

  import {toasts, dismissToast, type Toast as ToastType} from "$lib/stores/toast-store";

  // 

  let toasts_value: ToastType[];
  toasts.subscribe((value) => {
    toasts_value = value;
  });
</script>

{#if toasts_value}
  <section class="fixed top-0 left-0 right-0 w-full flex flex-col mt-16 justify-center">
    {#each toasts_value as toast (toast.id)}
      <Toast
        type={toast.type}
        on:dismiss={() => dismissToast(toast.id)}>{toast.message}</Toast
      >
    {/each}
  </section>
{/if}

<style lang="postcss">
  section {
    z-index: 1000;
  }
</style>