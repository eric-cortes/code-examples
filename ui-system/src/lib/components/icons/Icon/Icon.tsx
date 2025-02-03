import { HTMLProps } from 'react'
import { iconMapping, IconMapping } from '../iconMapping'

export const ICON_VARIANT = {
  DEFAULT: 'default',
} as const
export type IconVariant = keyof typeof ICON_VARIANT

export const iconVariant: Record<IconVariant, string> = {
  DEFAULT: 'bg-black hover:bg-black-800 active:bg-grey-900',
}

export interface IconProps extends HTMLProps<HTMLSpanElement> {
  name: IconMapping
  variant?: IconVariant
  isOutlined?: boolean
  isDisabled?: boolean
  fillColor?: string
}

export const Icon = ({ name, isOutlined, isDisabled, fillColor }: IconProps) => {
  return (
    <div>
      <span>{iconMapping[name](isOutlined == false, isDisabled == true, fillColor ? fillColor : 'black')}</span>
    </div>
  )
}
