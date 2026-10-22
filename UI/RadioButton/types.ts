import { WithClassName } from "@/types/ui";
import { WithTestID } from "@/utils/testId";

export interface RadioButtonProps extends Partial<WithTestID & WithClassName> {
	/**
	 * Ref forwarded to the underlying radio button element (React 19 ref-as-prop).
	 */
	ref?: React.Ref<HTMLButtonElement>;
	/**
	 * Text label for the radio button.
	 */
	label: string;
	/**
	 * The unique value associated with the radio button.
	 */
	value: string;
	/**
	 * Disables the radio button when true.
	 */
	disabled?: boolean;
}
