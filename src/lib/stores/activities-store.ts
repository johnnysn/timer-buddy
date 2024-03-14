import type { Activity } from '$lib/types/activity';
import { writable, type Updater } from 'svelte/store';
import { browser } from '$app/environment';
import z from 'zod';
import { activitySchema } from '$lib/schemas/activity-schema';
import type { Event } from '$lib/types/event';

function averageDuration(events: Event[]) {
	if (events.length === 0) return undefined;

	const averageMs =
		events
			.filter((e) => e.end)
			.map((e) => e.end!.getTime() - e.start.getTime())
			.reduce((a, b) => a + b, 0) / events.length;

	return averageMs / 1000;
}

export function createActivitiesStore() {
	const actualStore = writable<Activity[]>([], (set) => {
		if (browser) {
			const data = localStorage.getItem('activities');

			if (data) {
				const arr = JSON.parse(data);

				const activities = z.array(activitySchema).parse(arr);

				set(activities);
			}
		}

		return () => {
			// console.log('Cleaning up');
		};
	});

	function update(updater: Updater<Activity[]>) {
		actualStore.update((curr) => {
			const newData = updater(curr);

			if (browser) {
				const strData = JSON.stringify(newData);
				localStorage.setItem('activities', strData);
			}

			return newData;
		});
	}

	function add(name: string, description: string) {
		if (name.trim() === '') return;

		const activity = {
			active: false,
			id: crypto.randomUUID(),
			name,
			description,
			events: []
		};

		update((curr) => [...curr, activity]);
	}

	function put(id: string, name: string, description: string) {
		update((curr) => {
			const i = curr.findIndex((a) => a.id === id);

			if (i === -1) return curr;

			curr[i].name = name;
			curr[i].description = description;

			return [...curr];
		});
	}

	function del(id: string) {
		update((curr) => curr.filter((a) => a.id !== id));
	}

	function start(id: string) {
		update((curr) => {
			const activityIndex = curr.findIndex((a) => a.id === id);

			if (activityIndex === -1) return curr;
			const activity = curr[activityIndex];

			if (activity.active) {
				const activeEvent = activity.events.find((e) => !e.end);

				if (activeEvent) {
					activeEvent.end = new Date();

					activity.averageDuration = averageDuration(activity.events);
				}
			}

			const event = {
				id: crypto.randomUUID(),
				start: new Date()
			};

			activity.active = true;
			activity.activeEventStartedAt = new Date();
			activity.events.push(event);

			return [...curr];
		});
	}

	function stop(id: string) {
		update((curr) => {
			const activityIndex = curr.findIndex((a) => a.id === id);

			if (activityIndex === -1) return curr;
			const activity = curr[activityIndex];

			const activeEvent = activity.events.find((e) => !e.end);
			if (activeEvent) {
				activeEvent.end = new Date();
				activity.lastStoppedEventId = activeEvent.id;
			}
			activity.active = false;
			activity.activeEventStartedAt = undefined;

			activity.averageDuration = averageDuration(activity.events);

			return [...curr];
		});
	}

	function cancel(id: string) {
		update((curr) => {
			const activityIndex = curr.findIndex((a) => a.id === id);

			if (activityIndex === -1) return curr;
			const activity = curr[activityIndex];

			const activeEvent = activity.events.find((e) => !e.end);
			if (!activeEvent) return curr;

			activity.active = false;
			activity.activeEventStartedAt = undefined;
			activity.events = activity.events.filter((e) => e.id !== activeEvent.id);

			return [...curr];
		});
	}

	function deleteEvent(id: string, eventId: string) {
		update((curr) => {
			const activityIndex = curr.findIndex((a) => a.id === id);
			if (activityIndex === -1) return curr;
			const activity = curr[activityIndex];

			const eventIndex = activity.events.findIndex((e) => e.id === eventId);
			if (eventIndex === -1) return curr;

			activity.events = activity.events.filter((e) => e.id !== eventId);
			activity.averageDuration = averageDuration(activity.events);

			return [...curr];
		});
	}

	function editEvent(id: string, eventId: string, start: Date, end: Date | undefined) {
		update((curr) => {
			const activityIndex = curr.findIndex((a) => a.id === id);
			if (activityIndex === -1) return curr;
			const activity = curr[activityIndex];

			const eventIndex = activity.events.findIndex((e) => e.id === eventId);
			if (eventIndex === -1) return curr;

			const event = activity.events[eventIndex];
			event.start = start;
			event.end = end;

			activity.averageDuration = averageDuration(activity.events);

			return [...curr];
		});
	}

	return {
		subscribe: actualStore.subscribe,
		add,
		delete: del,
		update: put,
		start,
		stop,
		cancel,
		deleteEvent,
		editEvent
	};
}

export const activities = createActivitiesStore();
