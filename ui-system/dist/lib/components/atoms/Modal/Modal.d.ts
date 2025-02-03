import { ButtonHTMLAttributes, ReactNode } from 'react';
export declare const MODAL_VARIANT: {
    readonly DEFAULT: "default";
};
export type ModalVariant = keyof typeof MODAL_VARIANT;
export interface ModalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    variant?: ModalVariant;
    isDisabled?: boolean;
    width?: string;
    height?: string;
    onClick?: () => void;
    customClasses?: string;
}
export declare const Modal: ({ children, onClick, width, height, customClasses }: ModalProps) => import("react/jsx-runtime").JSX.Element;
