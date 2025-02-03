import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import { IconMapping } from '../../icons/iconMapping';
export declare const BUTTON_VARIANT: {
    readonly DEFAULT: "default";
    readonly HOVERED: "hovered";
    readonly FOCUSED: "focused";
    readonly PRESSED: "pressed";
    readonly ICON: "icon";
    readonly ICONPLUS: "iconplus";
    readonly OUTLINED: "outlined";
};
export type ButtonVariant = keyof typeof BUTTON_VARIANT;
export declare const ICONBUTTON_VARIANT: {
    readonly DEFAULT: "default";
};
export type IconButtonVariant = keyof typeof ICONBUTTON_VARIANT;
export declare const buttonVariant: Record<ButtonVariant, string>;
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    variant?: ButtonVariant;
    isDisabled?: boolean;
    isOutlined?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
    type: 'button' | 'reset' | 'submit' | undefined;
    customClasses?: string;
    iconName?: IconMapping;
}
export declare const Button: ({ label, variant, isDisabled, isOutlined, onClick, children, type, customClasses, iconName, }: ButtonProps) => import("react/jsx-runtime").JSX.Element;
