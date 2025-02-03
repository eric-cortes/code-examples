import { ButtonHTMLAttributes } from 'react';
export declare const ACCORDION_VARIANT: {
    readonly DEFAULT: "default";
};
export type AccordionVariant = keyof typeof ACCORDION_VARIANT;
export declare const accordionVariant: Record<AccordionVariant, string>;
export interface AccordionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    options?: any;
    selectedCatOptions?: any;
    setSelectedCatOptions?: any;
    variant?: AccordionVariant;
}
export declare const Accordion: ({ options, selectedCatOptions, setSelectedCatOptions, variant, }: AccordionProps) => import("react/jsx-runtime").JSX.Element;
