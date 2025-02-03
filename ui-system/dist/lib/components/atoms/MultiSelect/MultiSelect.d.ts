import { SelectHTMLAttributes } from 'react';
export declare const MULTISELECT_VARIANT: {
    readonly DEFAULT: "default";
};
export type MultiSelectVariant = keyof typeof MULTISELECT_VARIANT;
export declare const multiSelectVariant: Record<MultiSelectVariant, string>;
export interface MultiSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    id?: string;
    selectedOptions?: any;
    onSelectionChange: (selectedOption: any) => void;
    options?: any;
    isDisabled?: boolean;
    label?: string;
    variant?: MultiSelectVariant;
}
export declare const MultiSelect: ({ id, selectedOptions, onSelectionChange, options, isDisabled, label, variant, }: MultiSelectProps) => import("react/jsx-runtime").JSX.Element;
