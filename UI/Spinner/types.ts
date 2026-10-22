import type { VariantProps, WithClassName } from "@/types/ui";
import { WithTestID } from "@/utils/testId";

export interface SpinnerProps extends Partial<WithTestID & WithClassName> {
	/**
	 * Is animated or not
	 *
	 * @default true
	 */
	animated?: boolean;
	/**
	 * The type of the button
	 * @deprecated use font color instead
	 */
	buttonType?: VariantProps;

	/**
	 * The size (width and height)
	 */
	size?: number;
}
