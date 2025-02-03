import { ButtonHTMLAttributes, ReactNode } from 'react';
export declare const BOX_VARIANT: {
    readonly DEFAULT: "default";
};
export type BoxVariant = keyof typeof BOX_VARIANT;
export declare const boxVariant: Record<BoxVariant, string>;
export interface BoxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    variant?: BoxVariant;
    isDisabled?: boolean;
}
export declare const Box: ({ variant, isDisabled, children }: BoxProps) => import("react/jsx-runtime").JSX.Element;
