// Convert date string to a specific format with time set to 22:00:00 UTC
export function convertDateFormat(originalDateStr: any) {
    const originalDate = new Date(originalDateStr);
    const year = originalDate.getFullYear();
    const month = originalDate.getMonth() + 1;
    const day = originalDate.getDate();
    const newDate = new Date(Date.UTC(year, month - 1, day, 22, 0, 0));
    const newDateStr = newDate.toISOString();
    return newDateStr;
}

// Convert ISO 8601 date string to a normal date format (dd.mm.yyyy)
export function convertToNormalDate(inputDate: string): any {
    if (inputDate) {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${day}.${month}.${year}`;
    }
    return null;
}

// Extract and format time from a date string (hh:mm)
export function formatTime(dateString: string) {
    const date = new Date(dateString);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Format date and time according to 'de-DE' locale (dd.mm.yyyy, hh:mm)
export function formatDate(timestamp: any) {
    const created = new Date(timestamp);
    return new Intl.DateTimeFormat('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }).format(created);
}

// Format date for date picker with a custom string format (e.g., Mon Jan 01 2024)
export function formatForDatePicker(timestamp: any) {
    const created = new Date(timestamp);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const dayOfWeek = days[created.getUTCDay()];
    const month = months[created.getUTCMonth()];
    const day = created.getUTCDate();
    const year = created.getUTCFullYear();
    const hours = created.getUTCHours();
    const minutes = created.getUTCMinutes();
    const seconds = created.getUTCSeconds();
    const timezoneOffset = created.getTimezoneOffset();
    const timezoneHours = Math.abs(Math.floor(timezoneOffset / 60));
    const timezoneMinutes = Math.abs(timezoneOffset % 60);
    const timezoneSign = timezoneOffset > 0 ? '-' : '+';

    const timezoneString = `GMT${timezoneSign}${('0' + timezoneHours).slice(-2)}${('0' + timezoneMinutes).slice(-2)}`;

    return `${dayOfWeek} ${month} ${('0' + day).slice(-2)} ${year} ${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)} ${timezoneString} (Central European Standard Time)`;
}

// Convert date string to YYYY-MM-DD format
export function convertToYYYYMMDD(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Convert date string to ISO 8601 format
export function convertToISOString(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString();
}

// Convert selected time to ISO 8601 format with current date
export function convertToISODateTime(selectedTime: string): string {
    const currentDate = new Date();
    const [hours, minutes] = selectedTime.split(':').map(Number);
    currentDate.setHours(hours, minutes, 0, 290); // Set seconds to 0 and milliseconds to 290

    const timezoneOffset = currentDate.getTimezoneOffset() * -1; // in minutes
    const offsetHours = Math.floor(timezoneOffset / 60).toString().padStart(2, '0');
    const offsetMinutes = (timezoneOffset % 60).toString().padStart(2, '0');
    const sign = timezoneOffset >= 0 ? '+' : '-';

    return `${currentDate.toISOString().slice(0, -1)}${sign}${offsetHours}:${offsetMinutes}`;
}

// Function to convert Excel serial number to a JavaScript Date
// Function to convert Excel serial number to a JavaScript Date with leap year bug fix
export const convertExcelDate = (serial: number): string => {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30)); // Excel's epoch starts on Dec 30, 1899
    const correctedSerial = serial - 1; // Subtract 1 because Excel starts counting at 1, not 0

    // Calculate the number of days offset from the epoch
    const resultDate = new Date(excelEpoch.getTime() + correctedSerial * 24 * 60 * 60 * 1000);

    // Format the date as "DD.MM.YYYY"
    const day = String(resultDate.getUTCDate()).padStart(2, '0');
    const month = String(resultDate.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = resultDate.getUTCFullYear();
    return `${day}.${month}.${year}`;
};

// Function to extract hours and minutes from an Excel serial number
export const extractTimeFromExcelSerial = (serial: number): string => {
    // Extract the fractional part (time) by subtracting the integer part (date)
    const fractionalPart = serial - Math.floor(serial);

    // Convert the fractional part to hours
    const totalHours = fractionalPart * 24;

    // Extract the hour and minute from the total hours
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);

    // Ensure two digits for both hours and minutes
    const hourString = hours.toString().padStart(2, '0');
    const minuteString = minutes.toString().padStart(2, '0');

    // Return the time in "HH:MM" format
    return `${hourString}:${minuteString}`;
};

export const convertExcelDateToISO = (serialDate: number) => {
    // Excel date starts from 1899-12-30
    const excelStartDate = new Date(1899, 11, 30);
    const millisecondsPerDay = 86400000; // 24 * 60 * 60 * 1000
    const date = new Date(excelStartDate.getTime() + (serialDate * millisecondsPerDay));

    // Convert to ISO string
    return date.toISOString();
};

