import { SelectHTMLAttributes } from 'react';
export declare const SELECT_VARIANT: {
    readonly DEFAULT: "default";
};
export type SelectVariant = keyof typeof SELECT_VARIANT;
export declare const selectVariant: Record<SelectVariant, string>;
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    id: string;
    options?: any[];
    selectedOptions?: any;
    onSelectionChange: (selectedOption: any) => void;
    label?: string;
    prepopulatedId?: any;
    boxText?: string;
    isDisabled?: boolean;
    variant?: SelectVariant;
    topPull?: boolean;
}
export declare const Select: ({ id, options, selectedOptions, onSelectionChange, label, prepopulatedId, boxText, isDisabled, topPull, }: SelectProps) => import("react/jsx-runtime").JSX.Element;
