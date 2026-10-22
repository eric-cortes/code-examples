import { WithClassName } from "@/types/ui";
import { WithTestID } from "@/utils/testId";

export type CheckboxSizeType = "xs" | "sm" | "base";

export interface CheckboxProps extends Partial<WithTestID & WithClassName> {
	ref?: React.Ref<HTMLButtonElement>;
	/** Text label for the checkbox. */
	label?: string;
	/** The current status of the checkbox. */
	checked?: boolean;
	/** Disables the checkbox when true. */
	disabled?: boolean;
	/** Marks the checkbox as required when true. */
	required?: boolean;
	/** Callback function called when the checkbox state changes. */
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	/** Size of the label text. */
	size?: CheckboxSizeType;
	/** Additional text displayed below the checkbox. */
	additionalText?: React.ReactNode;
}
