"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import * as iconsComponents from "@/assets/icons";
import { SizeType } from "@/types/ui";
import { cn } from "@/utils/cn";
import { getRgbColor } from "@/utils/getRgbColor";
import { hexToRgba } from "@/utils/hexToRgba";
import { testIdProps } from "@/utils/testId";
import { Tooltip } from "../Tooltip";
import type { IconProps } from "./types";

const getIconSize = (size: SizeType | number): number => {
	switch (size) {
		case "xs":
			return 8;
		case "small":
			return 16;
		case "medium":
			return 24;
		case "large":
			return 32;
		default:
			return size;
	}
};

function Icon(props: IconProps) {
	const {
		ref,
		additionalProps,
		className,
		color,
		hoverColor,
		hoverColorOpacity = 0.6,
		icon,
		noHover = true,
		size,
		strokeWidth,
		tooltipText = "",
		tooltipPosition = "right",
		testID,
	} = props;

	const [rgbColor, setRgbColor] = useState("");
	const [isHovered, setIsHovered] = useState(false);

	const handleHoverEnter = useCallback(() => {
		setIsHovered(true);
	}, []);

	const handleHoverLeave = useCallback(() => {
		setIsHovered(false);
	}, []);

	const hoverRgbColor = useMemo(() => {
		return hoverColor || hexToRgba(rgbColor, hoverColorOpacity);
	}, [hoverColor, hoverColorOpacity, rgbColor]);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const IconClass: any = useMemo(() => {
		return Object.entries(iconsComponents).find(([key]) => {
			return key.toLowerCase() === icon;
		})?.[1];
	}, [icon]);

	const iconColor = useMemo(() => {
		if (noHover) {
			return color;
		}
		return isHovered ? hoverRgbColor : rgbColor;
	}, [color, hoverRgbColor, isHovered, noHover, rgbColor]);

	const iconSize = useMemo(() => {
		return getIconSize(size);
	}, [size]);

	useEffect(() => {
		setRgbColor(getRgbColor(color || "currentColor"));
	}, [color]);

	const tooltipSide = tooltipPosition === "left" ? "left" : tooltipPosition === "right" ? "right" : "top";

	const iconContent = (
		<div
			ref={ref}
			className={cn(tooltipText !== "" && "cursor-help", className)}
			onMouseEnter={handleHoverEnter}
			onMouseLeave={handleHoverLeave}
			onTouchStart={handleHoverEnter}
			onTouchEnd={handleHoverLeave}
			{...testIdProps(testID)}
		>
			{IconClass && (
				<IconClass color={iconColor} size={iconSize} strokeWidth={strokeWidth} {...(additionalProps ?? {})} />
			)}
		</div>
	);

	if (tooltipText !== "") {
		return (
			<Tooltip text={tooltipText} side={tooltipSide}>
				{iconContent}
			</Tooltip>
		);
	}

	return iconContent;
}

export { Icon };
