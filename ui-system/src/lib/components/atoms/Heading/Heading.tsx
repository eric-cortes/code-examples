import { ButtonHTMLAttributes, ReactNode } from 'react'

export const HEADING_VARIANT = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
} as const
export type HeadingVariant = keyof typeof HEADING_VARIANT

export const headingVariant: Record<HeadingVariant, string> = {
  h1: 'text-black text-[3em]',
  h2: 'text-black text-[2.25em]',
  h3: 'text-black text-[1.625em]',
}

export interface HeadingProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  children?: ReactNode
  variant?: HeadingVariant
  bold?: boolean
  customClasses?: string
}

export const Heading = ({ variant = 'h1', children, bold, label, customClasses }: HeadingProps) => {
  const Heading = variant === 'h2' ? 'h2' : variant === 'h3' ? 'h3' : 'h1'
  return (
    <Heading className={`${headingVariant[variant]} ${bold ? 'font-semibold' : 'font-normal'} ${customClasses}`}>
      {children ? children : label}
    </Heading>
  )
}
