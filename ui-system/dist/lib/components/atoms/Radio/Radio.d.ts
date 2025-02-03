import { InputHTMLAttributes, ChangeEventHandler } from 'react';
export declare const RADIO_VARIANT: {
    readonly DEFAULT: "primary";
};
export type RadioVariant = keyof typeof RADIO_VARIANT;
export declare const radioboxVariant: Record<RadioVariant, string>;
export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    placeholder?: string;
    variant?: RadioVariant;
    isDisabled?: boolean;
    isError?: boolean;
    isRequired?: boolean;
    checked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    id?: string;
    readOnly?: boolean;
}
export declare const Radio: ({ placeholder, label, isDisabled, isError, isRequired, onChange, checked, id, readOnly, }: RadioProps) => import("react/jsx-runtime").JSX.Element;
