import type { IconName } from "@/assets/icons/types/iconName";
import type { SizeType, WithClassName } from "@/types/ui";
import { WithTestID } from "@/utils/testId";

export interface IconProps extends Partial<WithClassName & WithTestID> {
	/**
	 * Ref forwarded to the underlying wrapper element (React 19 ref-as-prop).
	 */
	ref?: React.Ref<HTMLDivElement>;
	/**
	 * Additional props for the underlying icon component.
	 */
	additionalProps?: Record<string, unknown>;
	/**
	 * The colour in which the icon is displayed. You can use the colours from tailwind configuration.
	 */
	color?: string;
	/**
	 * The colour in which the icon is displayed when hovered.
	 */
	hoverColor?: string;
	/**
	 * Custom opacity for hover color.
	 * @default 0.6
	 */
	hoverColorOpacity?: number;
	/**
	 * The name of the icon. You can find the name in the documentation under Theme/Icons.
	 */
	icon: IconName;
	/**
	 * If true, do not change color on hover / touch.
	 * @default true
	 */
	noHover?: boolean;
	/**
	 * The display size of the icon. A value of type SizeType or number is expected.
	 */
	size: SizeType | number;
	/**
	 * The stroke size of the icon.
	 */
	strokeWidth?: number;
	/**
	 * Optional tooltip text shown on hover.
	 */
	tooltipText?: string;
	/**
	 * Position of the tooltip relative to the icon: "left", "center", or "right".
	 */
	tooltipPosition?: "left" | "center" | "right";
}
