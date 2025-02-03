import { InputHTMLAttributes } from 'react';
export declare const INPUT_VARIANT: {
    readonly DEFAULT: "default";
};
export type InputVariant = keyof typeof INPUT_VARIANT;
export declare const inputVariant: Record<InputVariant, string>;
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    placeholder?: string;
    variant?: InputVariant;
    isDisabled?: boolean;
    isError?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | number | string[];
    name?: string;
    type?: string;
    id: string;
    supportingText?: string;
    isRequired?: boolean;
}
export declare const Input: ({ placeholder, label, variant, isDisabled, isError, onChange, value: propValue, name, type, id, supportingText, isRequired, }: InputProps) => import("react/jsx-runtime").JSX.Element;
