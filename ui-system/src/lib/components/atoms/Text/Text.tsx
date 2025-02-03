import { HTMLAttributes, ReactNode } from 'react'

export const TEXT_VARIANT = {
  DEFAULT: 'default',
  IMPORTANT: 'important',
  SMALL: 'small',
} as const
export type TextVariant = keyof typeof TEXT_VARIANT

export const textVariant: Record<TextVariant, string> = {
  DEFAULT: 'text-[1em]',
  IMPORTANT: 'text-[1.125em]',
  SMALL: 'text-[0.8750em]',
}

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  text?: string
  children?: ReactNode
  variant?: TextVariant
  isDisabled?: boolean
  bold?: boolean
  small?: boolean
  important?: boolean
  customClasses?: string
  title?: string
}

export const Text = ({
  variant = 'DEFAULT',
  isDisabled = false,
  text,
  children,
  bold,
  small,
  important,
  customClasses,
  title,
}: TextProps) => {
  return (
    <p
      title={title}
      className={`${textVariant[variant]} ${bold ? 'font-semibold' : ''} ${customClasses ? customClasses : ''} ${
        isDisabled ? 'opacity-[0.3] cursor-not-allowed pointer-events-none' : ''
      }`}
    >
      {children || text}
    </p>
  )
}
