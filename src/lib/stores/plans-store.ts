import { planSchema } from '$lib/schemas/plan-schema';
import type { Plan } from '$lib/types/plan';
import { writable, type Updater } from 'svelte/store';
import { ZodError, z } from 'zod';
import { addToast } from './toast-store';
import { browser } from '$app/environment';

export function createPlansStore() {
	const actualStore = writable<Plan[]>([], (set) => {
		if (browser) {
			const data = localStorage.getItem('plans');

			if (data) {
				try {
					const obj = JSON.parse(data);
					const arr = z.array(planSchema).parse(obj);

					set(arr);
				} catch (e) {
					if (e instanceof ZodError) {
						addToast({ message: 'Could not load plans from local storage.', type: 'error' });
						console.error(e.issues);
					} else {
						console.error(e);
					}
					set([]);
				}
			}
		}

		return () => {};
	});

	function update(updater: Updater<Plan[]>) {
		actualStore.update((curr) => {
			const newData = updater(curr);

			if (browser) {
				const strData = JSON.stringify(newData);
				localStorage.setItem('plans', strData);
			}

			return newData;
		});
	}

	function add(name: string, description: string) {
		update((curr) => {
			const newOne = {
				id: crypto.randomUUID(),
				name,
				description,
				active: false,
				activities: []
			};

			return [...curr, newOne];
		});
	}

	function deletePlan(id: string) {
		update((curr) => {
			return curr.filter((p) => p.id !== id);
		});
	}

	function updatePlan(id: string, name: string, description: string) {
		update((curr) => {
			const plan = curr.find((p) => p.id === id);

			if (!plan) {
				return curr;
			}

			plan.name = name;
			plan.description = description;

			return [...curr];
		});
	}

	function addActivity(id: string, activityId: string) {
		update((curr) => {
			const plan = curr.find((p) => p.id === id);

			if (!plan) {
				return curr;
			}

			plan.activities.push({
				id: crypto.randomUUID(),
				activityId
			});
			return [...curr];
		});
	}

	function removeActivity(id: string, itemId: string) {
		update((curr) => {
			const plan = curr.find((p) => p.id === id);

			if (!plan) {
				return curr;
			}

			plan.activities = plan.activities.filter((a) => a.id !== itemId);
			return [...curr];
		});
	}

	function updateArrangement(id: string, arrangement: { id: string; activityId: string }[]) {
		update((curr) => {
			const plan = curr.find((p) => p.id === id);

			if (!plan) {
				return curr;
			}

			plan.activities = [...arrangement];
			return [...curr];
		});
	}

	return {
		subscribe: actualStore.subscribe,
		add,
		update: updatePlan,
		delete: deletePlan,
		addActivity,
		removeActivity,
		updateArrangement
	};
}

export const plans = createPlansStore();
