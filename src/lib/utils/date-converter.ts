class DateConverter {
	isoUtcToIsoLocale(isoUtcString: string) {
		const dateUTC = new Date(isoUtcString);

		const offsetBrowser = new Date().getTimezoneOffset();

		const offsetMillis = offsetBrowser * 60 * 1000;

		const dateBrowser = new Date(dateUTC.getTime() - offsetMillis);

		return dateBrowser.toISOString();
	}
}

const dateConverter = new DateConverter();
export default dateConverter;
