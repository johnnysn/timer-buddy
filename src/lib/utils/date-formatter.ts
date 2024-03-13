const days_of_week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class DateFormatter {
	private formatTime(date: Date, showSeconds: boolean = true) {
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');

		let timeString = `${hours}:${minutes}`;

		if (showSeconds) {
			const seconds = date.getSeconds().toString().padStart(2, '0');
			timeString += `:${seconds}`;
		}

		return timeString;
	}

	format(date: Date) {
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();

		return `${day}/${month}/${year} ${this.formatTime(date)}`;
	}

	formatShort(date: Date) {
		const now = new Date();

		if (now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth()) {
			if (now.getDate() === date.getDate()) {
				return this.formatTime(date);
			}

			if (now.getDate() === date.getDate() + 1) {
				return 'Yest ' + this.formatTime(date, false);
			}

			if (now.getDate() - date.getDate() < 7) {
				return days_of_week[date.getDay()] + ' ' + this.formatTime(date, false);
			}
		}

		if (now.getFullYear() === date.getFullYear()) {
			const day = date.getDate().toString().padStart(2, '0');
			const month = (date.getMonth() + 1).toString().padStart(2, '0');

			return `${day}/${month} ${this.formatTime(date, false)}`;
		}

		return this.format(date);
	}
}

const dateFormatter = new DateFormatter();
export default dateFormatter;
