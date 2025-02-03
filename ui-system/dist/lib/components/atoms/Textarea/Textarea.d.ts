import { TextareaHTMLAttributes, ReactNode } from 'react';
export declare const TEXTAREA_VARIANT: {
    readonly DEFAULT: "default";
};
export type Textarea = keyof typeof TEXTAREA_VARIANT;
export declare const textarea: Record<Textarea, string>;
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement | HTMLLabelElement> {
    value?: string;
    label?: string;
    placeholder?: string;
    variant?: Textarea;
    isDisabled?: boolean;
    isError?: boolean;
    children?: ReactNode;
    defaultValue?: string;
    isRequired?: boolean;
    supportingText?: string;
    id: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export declare const Textarea: ({ value, placeholder, label, variant, isDisabled, isError, defaultValue, isRequired, onChange, supportingText, id, }: TextareaProps) => import("react/jsx-runtime").JSX.Element;
