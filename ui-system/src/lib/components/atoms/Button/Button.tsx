import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import { iconMapping, IconMapping } from '../../icons/iconMapping'

export const BUTTON_VARIANT = {
  DEFAULT: 'default',
  HOVERED: 'hovered',
  FOCUSED: 'focused',
  PRESSED: 'pressed',
  ICON: 'icon',
  ICONPLUS: 'iconplus',
  OUTLINED: 'outlined',
} as const
export type ButtonVariant = keyof typeof BUTTON_VARIANT

export const ICONBUTTON_VARIANT = {
  DEFAULT: 'default',
} as const
export type IconButtonVariant = keyof typeof ICONBUTTON_VARIANT

export const buttonVariant: Record<ButtonVariant, string> = {
  DEFAULT: 'bg-[#000000] hover:bg-[#373940] active:bg-[#26282d] h-12 text-white border border-1 border-transparent',
  HOVERED: 'bg-[#373940] active:bg-[#26282d] h-12 text-white border border-1 border-transparent',
  FOCUSED: 'bg-[#000000] hover:bg-[#373940] active:bg-[#26282d] h-12 text-white border border-1 border-transparent',
  PRESSED: 'bg-[#000000] hover:bg-[#373940] active:bg-[#26282d] h-12 text-white border border-1 border-transparent',
  ICON: 'bg-transparent h-[1.5em] h-[2.5em]',
  ICONPLUS: 'bg-[#000000] hover:bg-[#373940] active:bg-[#26282d] h-12 text-white border border-1 border-transparent',
  OUTLINED: 'bg-[#ffffff] hover:bg-[#f0eff1] active:bg-[#e9e8ea] h-12 text-black border border-1 border-black',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  variant?: ButtonVariant
  isDisabled?: boolean
  isOutlined?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  children?: ReactNode
  type: 'button' | 'reset' | 'submit' | undefined
  customClasses?: string
  iconName?: IconMapping
  fillColor?: string
}

export const Button = ({
  label,
  variant = 'DEFAULT',
  isDisabled = false,
  isOutlined = false,
  onClick,
  children,
  type,
  customClasses,
  iconName = 'Block',
  fillColor
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`flex flex-col items-center transition-color duration-100 
      justify-center gap-2 overflow-hidden rounded
      ${isDisabled
          ? isOutlined
            ? 'bg-[#ffffff] h-12 cursor-not-allowed pointer-events-none text-[#afb0b7] border border-1 border-[#afb0b7]'
            : 'bg-[#e9e8ea] h-12 cursor-not-allowed pointer-events-none text-[#afb0b7] border border-1 border-transparent'
          : isOutlined
            ? buttonVariant['OUTLINED']
            : buttonVariant[variant]
        }
      ${customClasses}`}
      onClick={onClick}
    >
      {variant == 'ICON' ? (
        <>
          <div className="p-[0.5em]">
            {children ? children : <span>{iconMapping[iconName](isOutlined == false, isDisabled == true, fillColor ? fillColor : 'black')}</span>}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2 px-6 py-2.5">
          {variant == 'ICONPLUS' && <span>{iconMapping[iconName](isOutlined == false, isDisabled == true, fillColor ? fillColor : '')}</span>}
          <p
            className={`flex-grow-0 flex-shrink-0 text-[0.8750em] text-center 
            `}
          >
            {children ? children : label}
          </p>
        </div>
      )}
    </button>
  )
}
