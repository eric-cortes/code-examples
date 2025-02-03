import { HTMLAttributes, ReactNode } from 'react';
export declare const TEXT_VARIANT: {
    readonly DEFAULT: "default";
    readonly IMPORTANT: "important";
    readonly SMALL: "small";
};
export type TextVariant = keyof typeof TEXT_VARIANT;
export declare const textVariant: Record<TextVariant, string>;
export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
    text?: string;
    children?: ReactNode;
    variant?: TextVariant;
    isDisabled?: boolean;
    bold?: boolean;
    small?: boolean;
    important?: boolean;
    customClasses?: string;
    title?: string;
}
export declare const Text: ({ variant, isDisabled, text, children, bold, small, important, customClasses, title, }: TextProps) => import("react/jsx-runtime").JSX.Element;
