import { browser } from '$app/environment';
import { writable } from 'svelte/store';

function createDarkModeStore() {
	const actualStore = writable(false, (set) => {
		if (browser) {
			const darkModeData = localStorage.getItem('dark-mode');

			if (darkModeData === 'true') set(true);
		}
	});

	function set(value: boolean) {
		actualStore.set(value);
		if (browser) {
			localStorage.setItem('dark-mode', String(value));
		}
	}

	return {
		subscribe: actualStore.subscribe,
		set
	};
}

export const darkModeStore = createDarkModeStore();
