class IntervalFormatter {
	format(seconds: number) {
		if (seconds < 60) {
			return `${seconds.toFixed(0)}s`;
		}

		const minutes = Math.floor(seconds / 60);
		if (minutes < 60) {
			return `${minutes}m ${(seconds % 60).toFixed(0)}s`;
		}

		const hours = Math.floor(minutes / 60);
		return `${hours}h ${minutes % 60}m ${(seconds % 60).toFixed(0)}s`;
	}
}

const intervalFormatter = new IntervalFormatter();
export default intervalFormatter;
