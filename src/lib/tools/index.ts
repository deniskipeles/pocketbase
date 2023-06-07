
export const serializeNonPOJOs = (obj: any) => {
	return JSON.parse(JSON.stringify(obj));
};

export function removeSpaces(str: string): string {
	return str.replace(/\s/g, "");
}

export function setObjectFormData(obj: Record<string, any>): FormData {
	const formData = new FormData();

	for (const [key, value] of Object.entries(obj)) {
		formData.append(key, value);
	}

	return formData;
}

export function getReadableDate(dateString: string | Date): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export function canMakeBooking(date: string): boolean {
	const checkoutDate = new Date(date);
	const currentDate = new Date();

	return checkoutDate < currentDate;
}

export function isWithinPastDays(date: string | Date, pastDays: number): boolean {
	date = new Date(date)
	const currentDate = new Date();
	const pastDate = new Date();
	pastDate.setDate(currentDate.getDate() - pastDays);

	return date >= pastDate && date <= currentDate;
}


export function getTimeAgo(date: Date | string): string {
	date = new Date(date)
	const now = new Date();
	const elapsedSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	// Define time intervals in seconds
	const intervals = {
		year: 31536000,
		month: 2592000,
		week: 604800,
		day: 86400,
		hour: 3600,
		minute: 60,
	};

	// Calculate the time difference in different intervals
	if (elapsedSeconds < intervals.minute) {
		return "Just now";
	} else if (elapsedSeconds < intervals.hour) {
		const minutes = Math.floor(elapsedSeconds / intervals.minute);
		return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
	} else if (elapsedSeconds < intervals.day) {
		const hours = Math.floor(elapsedSeconds / intervals.hour);
		return `${hours} hour${hours > 1 ? "s" : ""} ago`;
	} else if (elapsedSeconds < intervals.week) {
		const days = Math.floor(elapsedSeconds / intervals.day);
		return `${days} day${days > 1 ? "s" : ""} ago`;
	} else if (elapsedSeconds < intervals.month) {
		const weeks = Math.floor(elapsedSeconds / intervals.week);
		return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
	} else if (elapsedSeconds < intervals.year) {
		const months = Math.floor(elapsedSeconds / intervals.month);
		return `${months} month${months > 1 ? "s" : ""} ago`;
	} else {
		const years = Math.floor(elapsedSeconds / intervals.year);
		return `${years} year${years > 1 ? "s" : ""} ago`;
	}
}

