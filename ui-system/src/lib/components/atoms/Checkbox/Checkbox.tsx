import React, { InputHTMLAttributes, ChangeEventHandler, useState, useEffect } from 'react'

export const CHECKBOX_VARIANT = {
  DEFAULT: 'primary',
} as const

export type CheckboxVariant = keyof typeof CHECKBOX_VARIANT

export const checkboxVariant: Record<CheckboxVariant, string> = {
  DEFAULT: 'bg-yellow-200 hover-bg-green-400 active-bg-green-500',
}

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  placeholder?: string
  variant?: CheckboxVariant
  isDisabled?: boolean
  isError?: boolean
  isRequired?: boolean
  checked?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  id: string
  readOnly?: boolean
}

export const Checkbox = ({
  placeholder,
  label,
  isDisabled = false,
  isError = false,
  isRequired = false,
  onChange,
  checked,
  id,
  readOnly,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked || false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setIsChecked(checked || false)
  }, [checked])

  return (
    <div
      className={`relative flex items-start justify-start gap-2 ${
        isDisabled ? 'opacity-50 pointer-events-none' : ''
      } bg-red`}
    >
      <svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`relative flex-grow-0 flex-shrink-0 w-5 h-5 ${isChecked ? 'text-black' : 'text-white'}`}
        preserveAspectRatio="none"
      >
        <rect
          x="0.5"
          y="0.5"
          width={19}
          height={19}
          rx="0"
          fill="white"
          stroke={isError || isRequired ? '#e2001a' : isHovered ? 'black' : '#AFB0B7'}
          strokeWidth={isHovered ? 3 : 1}
        />
        {(isChecked || checked) && (
          <path d="M13.9887 5L8.28867 10.8L5.78867 8.3L3.88867 10.1L8.28867 14.5L15.8887 6.9L13.9887 5Z" fill="black" />
        )}
      </svg>
      {label && (
        <p
          className={`flex items-center flex-grow-0 flex-shrink-0 w-auto h-5 text-base text-left 
                    ${isError || isRequired ? 'text-[#e2001a]' : 'text-black'}`}
        >
          {label}
        </p>
      )}
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={(e) => {
          setIsChecked(e.target.checked)
          onChange && onChange(e)
        }}
        readOnly={readOnly}
        // onClick={() => {
        //     setIsChecked((isChecked) => !isChecked) // Toggle the isChecked state
        // }}
        className="h-[1.2em] w-[1.2em] absolute opacity-0 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </div>
  )
}
