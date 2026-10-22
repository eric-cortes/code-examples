"use client";

import React from "react";

import { getStyles } from "./styles";
import SpacingProps from "./types";

export const Spacing: React.FC<SpacingProps> = (props) => {
	const { size = "sm", vertical = false, testID } = props;

	return <div className={getStyles(size, vertical)} data-testid={testID && testID}></div>;
};
