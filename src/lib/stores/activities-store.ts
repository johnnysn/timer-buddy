import type { Activity } from "$lib/types/activity";
import { writable, type Updater } from "svelte/store";
import { browser } from "$app/environment";

export function createActivitiesStore() {
  const actualStore = writable<Activity[]>([], (set) => {
    if (browser) {
      const data = localStorage.getItem("activities");

      if (data) {
        const arr = JSON.parse(data);
        set(arr);
      }
    }

    return () => {
      console.log("Cleaning up");
    }
  });

  function update(updater: Updater<Activity[]>) {
    actualStore.update(curr => {
      const newData = updater(curr);

      if (browser) {
        const strData = JSON.stringify(newData);
        localStorage.setItem("activities", strData);
      }

      return newData;
    });
  }

  function add(name: string, description: string) {
    const activity = {
      active: false,
      id: crypto.randomUUID(),
      name, 
      description
    };

    update(curr => [...curr, activity]);
  }

  return {
    subscribe: actualStore.subscribe,
    add
  }
}

export const activities = createActivitiesStore();