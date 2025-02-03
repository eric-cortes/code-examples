import { InputHTMLAttributes, ChangeEventHandler } from 'react';
export declare const CHECKBOX_VARIANT: {
    readonly DEFAULT: "primary";
};
export type CheckboxVariant = keyof typeof CHECKBOX_VARIANT;
export declare const checkboxVariant: Record<CheckboxVariant, string>;
export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    placeholder?: string;
    variant?: CheckboxVariant;
    isDisabled?: boolean;
    isError?: boolean;
    isRequired?: boolean;
    checked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    id: string;
    readOnly?: boolean;
}
export declare const Checkbox: ({ placeholder, label, isDisabled, isError, isRequired, onChange, checked, id, readOnly, }: CheckboxProps) => import("react/jsx-runtime").JSX.Element;
