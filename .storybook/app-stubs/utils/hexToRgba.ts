const RGB_PATTERN = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i;
const HEX_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

/**
 * Converts an `rgb(...)` or hex colour into an `rgba(...)` string with the given opacity.
 * Values that cannot be parsed (e.g. `currentColor` or an empty string) are returned unchanged.
 */
export function hexToRgba(rgbColor: string, opacity: number): string {
	const rgb = RGB_PATTERN.exec(rgbColor);
	if (rgb) {
		return `rgba(${rgb[1]}, ${rgb[2]}, ${rgb[3]}, ${opacity})`;
	}
	if (HEX_PATTERN.test(rgbColor)) {
		const digits = rgbColor.slice(1);
		const full = digits.length === 3 ? [...digits].map((char) => char + char).join("") : digits;
		const value = parseInt(full, 16);
		return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${opacity})`;
	}
	return rgbColor;
}
