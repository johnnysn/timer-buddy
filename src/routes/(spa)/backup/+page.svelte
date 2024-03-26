<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import { activitySchema } from "$lib/schemas/activity-schema";
	import { planSchema } from "$lib/schemas/plan-schema";
	import { activities } from "$lib/stores/activities-store";
	import { darkModeStore } from "$lib/stores/dark-mode-store";
	import { plans } from "$lib/stores/plans-store";
	import { addToast } from "$lib/stores/toast-store";
	import { Download, Upload } from "lucide-svelte";
	import { z } from "zod";

  let link: HTMLAnchorElement;
  let fileInput: HTMLInputElement;

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

  function triggerFileUpload() {
    fileInput.click();
  }

  function onUpload(e: Event & { currentTarget: HTMLInputElement }) {
    const file = e.currentTarget?.files ? e.currentTarget.files[0] : null;

    try {
      if (!file) throw new Error("No file was selected!");

      const reader = new FileReader();
      reader.onload = () => {
        const txtContent = reader.result;
        const jsonData = JSON.parse(String(txtContent));

        const composedData = z.object({
          activities: z.array(activitySchema),
          plans: z.array(planSchema),
          darkMode: z.boolean()
        }).safeParse(jsonData);

        if (composedData.success) {
          activities.load(composedData.data.activities);
          plans.load(composedData.data.plans);
          darkModeStore.set(composedData.data.darkMode);

          addToast({message: 'Your data has been restored!', type: 'success'});
        } else {
          throw new Error("Could not parse JSON file to application data.");
        }
      };

      reader.readAsText(file);
    } catch (e) {
      if (e instanceof Error)
        addToast({message: e.message, type: 'error'});
      else
        addToast({message: 'Could not process input file!', type: 'error'});
    }
  }
</script>

<div class="flex flex-col">

  <h2 class="w-full text-center text-2xl font-title font-semibold mb-12">
    Backup / Restore
  </h2>

  <div class="item-container p-6 flex flex-col items-center mb-6">
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

  <div class="item-container p-6 flex flex-col items-center">
    <h3 class="text-lg font-title font-medium mb-3">
      Restore your activity data
    </h3>

    <p class="text-center">
      Restore your activities and plans from a .json backup file.
      <span class="text-accent font-medium">
        All your current data will be erased!!!
      </span>
      Make sure you have backed up your plans and activities first!
    </p>

    <Button class="secondary flex gap-3 items-center" on:click={triggerFileUpload}>
      <Upload class="size-6" />
      <span class="font-medium">Upload</span>
    </Button>

    <div class="hidden">
      <input type="file" bind:this={fileInput} multiple={false} accept="application/json,.json" on:change={onUpload}  >
    </div>
  </div>

</div>