import { ButtonHTMLAttributes, ReactNode } from 'react';
export declare const HEADING_VARIANT: {
    readonly h1: "h1";
    readonly h2: "h2";
    readonly h3: "h3";
};
export type HeadingVariant = keyof typeof HEADING_VARIANT;
export declare const headingVariant: Record<HeadingVariant, string>;
export interface HeadingProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    children?: ReactNode;
    variant?: HeadingVariant;
    bold?: boolean;
    customClasses?: string;
}
export declare const Heading: ({ variant, children, bold, label, customClasses }: HeadingProps) => import("react/jsx-runtime").JSX.Element;
