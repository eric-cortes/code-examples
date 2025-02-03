import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
export declare const FILTERCHIP_VARIANT: {
    readonly DEFAULT: "default";
};
export type FilterChipVariant = keyof typeof FILTERCHIP_VARIANT;
export declare const filterChipVariant: Record<FilterChipVariant, string>;
export interface FilterChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    isDisabled?: boolean;
    variant?: FilterChipVariant;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}
export declare const FilterChip: ({ label, isDisabled, variant, onClick }: FilterChipProps) => import("react/jsx-runtime").JSX.Element;
