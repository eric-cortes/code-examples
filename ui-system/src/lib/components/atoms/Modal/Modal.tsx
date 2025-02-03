import { ButtonHTMLAttributes, ReactNode, useEffect } from 'react'

export const MODAL_VARIANT = {
  DEFAULT: 'default',
} as const
export type ModalVariant = keyof typeof MODAL_VARIANT

export interface ModalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  variant?: ModalVariant
  isDisabled?: boolean
  width?: string
  height?: string
  onClick?: () => void
  customClasses?: string
}

export const Modal = ({ children, onClick, width, height, customClasses }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  console.log('modal')

  return (
    <>
      <div
        onClick={onClick}
        className={`fixed inset-0 z-50 transition-opacity bg-black bg-opacity-60`}
        style={{ opacity: '0.6' }}
      ></div>
      <div
        className={`fixed z-50 p-8 overflow-hidden bg-white
        -translate-x-1/2 -translate-y-1/2 border border-white rounded-md top-1/2 left-1/2
        ${customClasses}`}
        style={{ width: `${width ? width : ''}`, height: `${height ? height : ''}` }}
      >
        {children ? children : 'test'}
      </div>
    </>
  )
}
