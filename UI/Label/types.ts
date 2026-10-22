import { WithTestID } from "@/utils/testId";

export interface LabelProps extends Partial<WithTestID> {
	/** The content of the label. */
	children?: React.ReactNode;
	/** The ID of the form element this label is associated with. */
	htmlFor?: string;
	/** Whether the associated field is required (appends * to label). */
	required?: boolean;
	/** Additional CSS class names. */
	className?: string;
}
