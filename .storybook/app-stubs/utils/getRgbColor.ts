import { colors } from "../theme/colors";

const HEX_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

function hexToRgb(hex: string): string | null {
	if (!HEX_PATTERN.test(hex)) {
		return null;
	}
	const digits = hex.slice(1);
	const full = digits.length === 3 ? [...digits].map((char) => char + char).join("") : digits;
	const value = parseInt(full, 16);
	return `rgb(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255})`;
}

/**
 * Resolves a theme colour name or hex value to an `rgb(r, g, b)` string.
 * Values that cannot be resolved (e.g. `currentColor`, `rgb(...)`) are returned unchanged.
 */
export function getRgbColor(color: string): string {
	const hex = colors[color] ?? color;
	return hexToRgb(hex) ?? color;
}
