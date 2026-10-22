import { SpacingType } from "./types";

export const getStyles = (size: SpacingType, vertical: boolean): string => {
	const styles = getStyleFromSpacingType(size, vertical);

	return `${styles}`;
};

const getStyleFromSpacingType = (size: SpacingType, vertical: boolean): string => {
	let classes = "";
	if (size === "tiny") {
		classes += vertical ? "w-1" : "h-1";
	}
	if (size === "xs") {
		classes += vertical ? "w-2" : "h-2";
	}
	if (size === "sm") {
		classes += vertical ? "w-3.5" : "h-3.5";
	}
	if (size === "md") {
		classes += vertical ? "w-8" : "h-8";
	}
	if (size === "lg") {
		classes += vertical ? "w-10" : "h-10";
	}
	if (size === "xl") {
		classes += vertical ? "w-20" : "h-20";
	}
	if (size === "xxl") {
		classes += vertical ? "w-28" : "h-28";
	}
	return classes;
};
