import { SelectHTMLAttributes, useState } from 'react'

export const SELECT_VARIANT = {
  DEFAULT: 'default',
} as const

export type SelectVariant = keyof typeof SELECT_VARIANT

export const selectVariant: Record<SelectVariant, string> = {
  DEFAULT: 'bg-black hover:bg-black-800 active:bg-grey-900',
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  options?: any[]
  selectedOptions?: any
  onSelectionChange: (selectedOption: any) => void
  label?: string
  prepopulatedId?: any
  boxText?: string
  isDisabled?: boolean
  variant?: SelectVariant
  topPull?: boolean
}

export const Select = ({
  id,
  options,
  selectedOptions,
  onSelectionChange,
  label,
  prepopulatedId,
  boxText,
  isDisabled,
  topPull,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleMouseLeave = () => {
    if (isOpen) {
      setIsOpen(false)
    }
  }

  const short = options && options.length > 4

  return (
    <div
      className={`flex relative flex-col justify-start items-start h-[3.1em] 
                self-stretch cursor-pointer gap-2.5 rounded border border-black 
                ${isDisabled ? 'bg-brand-grey-light pointer-events-none' : 'bg-brand-white pointer-events-auto'}`}
      //onMouseLeave={handleMouseLeave}
      onClick={toggleDropdown}
      tabIndex={0}
    >
      <div className="absolute top-[-0.5em] left-[0.7em] flex items-center rounded justify-start px-1 bg-white">
        <p className="text-xs text-left text-black">{label}</p>
      </div>
      <div className="flex items-center self-stretch justify-start py-1 pl-4 rounded-tl rounded-tr">
        <div className='overflow-hidden'>
          <div className="my-2 text-base text-left text-black dropdown-header w-[30em]">
            {boxText ? boxText : selectedOptions}
          </div>
        </div>
        <div className="flex justify-center items-center ml-auto relative gap-2.5 p-2">
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
      </div>
      <div
        className={`dropdown-list absolute  w-full overflow-y-scroll rounded-b top-[3.1em] z-[1] bg-[#f0eff1]
                        transition-all duration-100 
                        ${isOpen ? (short ? 'h-[13em]' : 'h-[5em]') : 'h-[0em] pointer-events-none'}`}
      >
        {isOpen && (
          <ul className={`dropdown-list absolute w-[100%] overflow-visible max-h-[30em] bg-brand-white}`}
          >
            {options?.map((option: any) => {
              return (
                <li
                  key={option.id}
                  className="flex items-start justify-center h-10 py-1 pl-4 flex-col 
                    bg-[#f0eff1] w-[100%] last:rounded-b last:border-transparent  
                    border-b border-[#d8e6f2] transition duration-200 delay-10 hover:bg-slate-100"
                  value={option.id}
                  title={option.name || option.carId || option.loginUsername}
                  onClick={() => {
                    onSelectionChange(option);
                    setTimeout(() => setIsOpen(false), 0);
                  }}
                >
                  <p className={`w-[50em]`}>
                    {option.name || option.carId || option.loginUsername}
                  </p>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
