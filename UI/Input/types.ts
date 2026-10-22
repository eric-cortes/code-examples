import { ChangeEvent, KeyboardEvent } from "react";

import type { WithClassName, WithID } from "@/types/ui";
import { WithTestID } from "@/utils/testId";

export type InputType = "text" | "email" | "number" | "password" | "date" | "time" | "datetime-local";
export type InputModeType = "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";

export interface InputProps extends Partial<WithClassName & WithTestID>, Partial<WithID> {
	/**
	 * Ref forwarded to the underlying input element (React 19 ref-as-prop).
	 */
	ref?: React.Ref<HTMLInputElement>;
	/**
	 * Defines the type of the input field. This can be one of the valid HTML input types.
	 */
	type: InputType;
	/**
	 * Defines the inputmode of the input field. This can be one of the valid HTML inputmode types.
	 */
	inputmode?: InputModeType;
	/**
	 * A text label displayed next to the input field to indicate its purpose or expected input.
	 */
	label?: string;
	/**
	 * The current value displayed in the input field.
	 */
	value?: string;
	/**
	 * A name for the input field used when submitting form data.
	 */
	name?: string;
	/**
	 * A placeholder text displayed in the input field when it's empty and no input is present.
	 */
	placeholder?: string;
	/**
	 * A boolean value indicating whether the input field is in an error state.
	 */
	error?: boolean;
	/**
	 * A message describing the error state of the input field. Displayed when error is set to true.
	 */
	errorMessage?: string;
	/**
	 * A boolean value indicating whether the input field should be displayed inline with other elements
	 */
	inline?: boolean;
	/**
	 * The minimum value to accept for this input. If provided, the input will enforce this constraint.
	 */
	min?: number;
	/**
	 * The maximum value to accept for this input. If provided, the input will enforce this constraint.
	 */
	max?: number;
	/**
	 * The minimum length of the input text that is allowed. If provided, the input will enforce this constraint.
	 */
	minLength?: number;
	/**
	 * The maximum length of the input text that is allowed. If provided, the input will enforce this constraint.
	 */
	maxLength?: number;
	/**
	 * The maximum width of the input
	 */
	maxWidth?: number;
	/**
	 * A boolean value indicating whether the input field is disabled and does not allow interaction.
	 */
	disabled?: boolean;
	/**
	 * A boolean value indicating whether the input field is automatically in focus or not.
	 */
	autoFocus?: boolean;
	/**
	 * A boolean value indicating whether the input field is required for input.
	 */
	required?: boolean;
	/**
	 * A function called when the content of the input field changes. It receives the HTML input component's ChangeEvent object.
	 */
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	/**
	 * A function called when a key is pressed down in the input field.
	 * It receives the HTML input component's KeyboardEvent object.
	 */
	onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
	/**
	 * Optional focus event callback.
	 */
	onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
	/**
	 * Optional blur event callback.
	 */
	onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;

	minValue?: string;

	tabIndex?: number;

	unit?: string;
	step?: number;
	textCenter?: boolean;
}
