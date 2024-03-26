<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import { activities } from "$lib/stores/activities-store";
	import { darkModeStore } from "$lib/stores/dark-mode-store";
	import { plans } from "$lib/stores/plans-store";
	import { Download } from "lucide-svelte";

  let link: HTMLAnchorElement;

  function downloadJsonFile() {
    const jsonData = {
      activities: $activities,
      plans: $plans,
      darkMode: $darkModeStore
    };
    const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'timer-buddy.json';
    link.click();
    URL.revokeObjectURL(url);
  }
</script>

<div class="flex flex-col">

  <h2 class="w-full text-center text-2xl font-title font-semibold mb-12">
    Backup / Restore
  </h2>

  <div class="item-container p-6 flex flex-col items-center">
    <h3 class="text-lg font-title font-medium mb-3">Donwload your activity data</h3>

    <p class="text-center mb-3">
      Export all your activities and plans to a .json file you can use to restore your 
      data on another device
    </p>

    <Button class="success flex gap-3 items-center" on:click={downloadJsonFile}>
      <Download class="size-6" />
      <span class="font-medium">Download</span>
    </Button>

    <a href={''} bind:this={link} class="hidden">hidden download link</a>
  </div>

</div>