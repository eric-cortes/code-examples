const MILLISECONDS_PER_DAY = 86_400_000;
const EXCEL_EPOCH_UTC = Date.UTC(1899, 11, 30);

function toValidDate(value: string | number | Date): Date | null {
	const date = value instanceof Date ? new Date(value) : new Date(value);
	return Number.isNaN(date.getTime()) ? null : date;
}

function pad(value: number): string {
	return String(value).padStart(2, "0");
}

/** Returns the local calendar day at 22:00 UTC. */
export function convertDateFormat(value: string | number | Date): string | null {
	const date = toValidDate(value);
	if (!date) return null;
	return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 22)).toISOString();
}

export function convertToNormalDate(value: string | number | Date): string | null {
	const date = toValidDate(value);
	if (!date) return null;
	return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
}

export function formatTime(value: string | number | Date): string | null {
	const date = toValidDate(value);
	if (!date) return null;
	return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;
}

export function formatDate(value: string | number | Date): string | null {
	const date = toValidDate(value);
	return date
		? new Intl.DateTimeFormat("de-DE", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		}).format(date)
		: null;
}

export function formatForDatePicker(value: string | number | Date): string | null {
	const date = toValidDate(value);
	if (!date) return null;
	const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "UTC" }).format(date);
	const month = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" }).format(date);
	return `${weekday} ${month} ${pad(date.getUTCDate())} ${date.getUTCFullYear()} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())} GMT+0000 (UTC)`;
}

export function convertToYYYYMMDD(value: string | number | Date): string | null {
	const date = toValidDate(value);
	return date ? `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` : null;
}

export function convertToISOString(value: string | number | Date): string | null {
	return toValidDate(value)?.toISOString() ?? null;
}

/** Converts a local HH:mm value on the current date to a correct ISO instant. */
export function convertToISODateTime(selectedTime: string): string | null {
	const match = /^(\d{2}):(\d{2})$/.exec(selectedTime);
	if (!match) return null;
	const hours = Number(match[1]);
	const minutes = Number(match[2]);
	if (hours > 23 || minutes > 59) return null;

	const date = new Date();
	date.setHours(hours, minutes, 0, 0);
	return date.toISOString();
}

/** Converts an Excel 1900-date-system serial to DD.MM.YYYY. */
export const convertExcelDate = (serial: number): string | null => {
	if (!Number.isFinite(serial)) return null;
	const date = new Date(EXCEL_EPOCH_UTC + Math.floor(serial) * MILLISECONDS_PER_DAY);
	return `${pad(date.getUTCDate())}.${pad(date.getUTCMonth() + 1)}.${date.getUTCFullYear()}`;
};

export const extractTimeFromExcelSerial = (serial: number): string | null => {
	if (!Number.isFinite(serial)) return null;
	const totalMinutes = Math.round((((serial % 1) + 1) % 1) * 24 * 60) % (24 * 60);
	return `${pad(Math.floor(totalMinutes / 60))}:${pad(totalMinutes % 60)}`;
};

export const convertExcelDateToISO = (serialDate: number): string | null =>
	Number.isFinite(serialDate) ? new Date(EXCEL_EPOCH_UTC + serialDate * MILLISECONDS_PER_DAY).toISOString() : null;
