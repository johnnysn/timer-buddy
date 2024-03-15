import { writable } from "svelte/store";

export const toasts = writable<Toast[]>([]);

export interface Toast {
  id: number,
  type: string,
  timeout: number,
  message: string
};

export const addToast = (toast_input: {message: string, type?: "success" | "error" | "info", timeout?: number}) => {
  // Create a unique ID so we can easily find/remove it
  // if it is dismissible/has a timeout.
  const id = Math.floor(Math.random() * 10000);

  // Setup some sensible defaults for a toast.
  const toast = {
    id,
    type: "info",
    timeout: 3000,
    ...toast_input
  };

  // Push the toast to the top of the list of toasts
  toasts.update((all) => [toast, ...all]);

  // If toast is dismissible, dismiss it after "timeout" amount of time.
  setTimeout(() => dismissToast(id), toast.timeout);
};

export const dismissToast = (id: number) => {
  toasts.update((all) => all.filter((t) => t.id !== id));
};