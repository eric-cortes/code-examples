import { WithClassName } from "@/types/ui";
import { WithTestID } from "@/utils/testId";

export type ToggleVariantType = "toggle-left" | "toggle-right";
export type ToggleSizeType = "small" | "large";
export type ToggleWeightType = "light" | "normal";

export interface ToggleProps extends Partial<WithTestID & WithClassName> {
	/** Whether the toggle is in the checked (on) state. */
	checked: boolean;
	/** The label text displayed alongside the toggle. */
	label?: string;
	/** Controls label position: "toggle-left" puts switch first, "toggle-right" puts label first. */
	variant?: ToggleVariantType;
	/** Size of the toggle switch. */
	size?: ToggleSizeType;
	/** Callback when the toggle state changes. */
	onChange: () => void;
	/** Whether the toggle is disabled. */
	disabled?: boolean;
	/** ARIA label for accessibility. */
	ariaLabel?: string;
	/** Additional helper text displayed below (only for toggle-right variant). */
	additionalText?: string;
	/** Font weight of the label. */
	fontWeight?: ToggleWeightType;
}
