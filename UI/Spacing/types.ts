import { WithTestID } from "@/utils/testId";

export default interface SpacingProps extends Partial<WithTestID> {
	/** Specifies the spacing size and expects a value from type SpacingType. */
	size: SpacingType;
	/** When set to true, indicates that the spacing applies vertically. */
	vertical?: boolean;
}

export type SpacingType = "tiny" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
