import React, { InputHTMLAttributes, ChangeEventHandler, useState, useEffect } from 'react'

export const RADIO_VARIANT = {
  DEFAULT: 'primary',
} as const

export type RadioVariant = keyof typeof RADIO_VARIANT

export const radioboxVariant: Record<RadioVariant, string> = {
  DEFAULT: 'bg-yellow-200 hover-bg-green-400 active-bg-green-500',
}

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  placeholder?: string
  variant?: RadioVariant
  isDisabled?: boolean
  isError?: boolean
  isRequired?: boolean
  checked?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  id?: string
  readOnly?: boolean
}

export const Radio = ({
  placeholder,
  label,
  isDisabled = false,
  isError = false,
  isRequired = false,
  onChange,
  checked,
  id,
  readOnly,
}: RadioProps) => {
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
          rx="10"
          fill="white"
          stroke={isError || isRequired ? '#e2001a' : isHovered ? 'black' : '#AFB0B7'}
          strokeWidth={isHovered ? 1 : 1}
        />
        {isHovered && <circle cx={10} cy={10} r={6} fill="lightgrey" />}
        {isChecked && <circle cx={10} cy={10} r={6} fill={isChecked ? 'black' : 'white'} />}
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
