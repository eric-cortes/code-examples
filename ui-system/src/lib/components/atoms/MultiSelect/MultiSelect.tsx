import { SelectHTMLAttributes, useState, useRef, useEffect, ChangeEvent, SyntheticEvent } from 'react'
import { Checkbox } from '../Checkbox/Checkbox'

export const MULTISELECT_VARIANT = {
  DEFAULT: 'default',
} as const

export type MultiSelectVariant = keyof typeof MULTISELECT_VARIANT

export const multiSelectVariant: Record<MultiSelectVariant, string> = {
  DEFAULT: 'bg-black hover:bg-black-800 active:bg-grey-900',
}

export interface MultiSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id?: string
  selectedOptions?: any
  onSelectionChange: (selectedOption: any) => void
  options?: any
  isDisabled?: boolean
  label?: string
  variant?: MultiSelectVariant
}

export const MultiSelect = ({
  id,
  selectedOptions,
  onSelectionChange,
  options,
  isDisabled,
  label,
  variant = 'DEFAULT',
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleMouseLeave = () => {
    if (isOpen) {
      setIsOpen(false)
    }
  }

  return (
    <div
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        setIsOpen(true)
      }}
      className={`cursor-pointer relative py-[0.7em] px-[1em] border border-black rounded h-[3.1em]
                ${isDisabled ? 'bg-brand-grey-light pointer-events-none' : 'bg-brand-white pointer-events-auto'}`}
    >
      <div className="absolute top-[-0.5em] left-[0.7em] flex items-center rounded justify-start px-1 bg-white">
        <p className="text-xs text-left text-black">{label}</p>
      </div>
      <p>Auswählen</p>
      <div className="flex justify-center items-center ml-auto absolute top-[0.2em] right-0 gap-2.5 p-2">
        {isOpen ? (
          <div className="transition-all rotate-0 duration-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative flex-grow-0 flex-shrink-0 w-6 h-6"
              preserveAspectRatio="none"
            >
              <g clipPath="url(#clip0_626_593)">
                <path d="M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14L12 8Z" fill="black" />
              </g>
              <defs>
                <clipPath id="clip0_626_593">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        ) : (
          <div className="transition-all -rotate-180 duration-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative flex-grow-0 flex-shrink-0 w-6 h-6"
              preserveAspectRatio="none"
            >
              <g clipPath="url(#clip0_626_593)">
                <path d="M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14L12 8Z" fill="black" />
              </g>
              <defs>
                <clipPath id="clip0_626_593">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        )}
      </div>
      <div
        className={`overflow-hidden w-full ${isOpen ? 'h-[15em]' : 'h-[0em]'} absolute ml-[-1em] mt-[0.85em] rounded-b`}
      >
        <ul
          id="status"
          className={`${isOpen ? 'h-[15em] opacity-100 z-10' : 'h-[0em] opacity-0 z-0'}
                    bg-[#f0eff1] rounded-b left-0 top-[0em] cursor-pointer overflow-y-auto overflow-x-hidden
                    absolute w-[110%] outline-none focus:border-red-500`}
          ref={selectRef}
        >
          {options.map((option: any) => {
            const highLightBg =
              selectedOptions.includes(option.id) ||
              selectedOptions.includes(option.carId) ||
              selectedOptions.includes(option)

            return (
              <li
                className={`border-b border-[#d8e6f2] px-[1em] flex items-center min-w-[20em] max-w-[90%] last:border-transparent justify-between
                            py-1 h-10 m-0 ${highLightBg ? 'bg-[#d8e6f2]' : ''} hover:bg-slate-100`}
                key={option.id}
                title={option.name || option.carId || option.loginUsername}
                onClick={() => {
                  onSelectionChange(option)
                }}
              >
                {option.name || option.carId || option.loginUsername}
                <div className="mr-[0em]">
                  <Checkbox id="test" checked={highLightBg} onChange={() => onSelectionChange(option)} />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
