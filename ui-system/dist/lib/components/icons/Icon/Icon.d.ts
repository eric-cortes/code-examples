import { HTMLProps } from 'react';
import { IconMapping } from '../iconMapping';
export declare const ICON_VARIANT: {
    readonly DEFAULT: "default";
};
export type IconVariant = keyof typeof ICON_VARIANT;
export declare const iconVariant: Record<IconVariant, string>;
export interface IconProps extends HTMLProps<HTMLSpanElement> {
    name: IconMapping;
    variant?: IconVariant;
    isOutlined?: boolean;
    isDisabled?: boolean;
}
export declare const Icon: ({ name, isOutlined, isDisabled }: IconProps) => import("react/jsx-runtime").JSX.Element;
