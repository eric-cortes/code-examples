import { InputHTMLAttributes, useState, useEffect, SyntheticEvent } from 'react'

export const INPUT_VARIANT = {
  DEFAULT: 'default',
} as const
export type InputVariant = keyof typeof INPUT_VARIANT

export const inputVariant: Record<InputVariant, string> = {
  DEFAULT:
    'flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5 transition-all duration-400 rounded border border-1 border-[#373940] hover:outline outline-offset-0 outline-1',
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  placeholder?: string
  variant?: InputVariant
  isDisabled?: boolean
  isError?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string | number | string[]
  name?: string
  type?: string
  id: string
  supportingText?: string
  isRequired?: boolean
}

export const Input = ({
  placeholder,
  label,
  variant = 'DEFAULT',
  isDisabled = false,
  isError = false,
  onChange,
  value: propValue,
  name,
  type,
  id,
  supportingText,
  isRequired,
}: InputProps) => {
  const [value, setValue] = useState(propValue || '')

  useEffect(() => {
    setValue(propValue || '')
  }, [propValue])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = event.target
    setValue(inputValue)
    if (onChange) {
      onChange(event)
    }
  }

  const clearInputValue = () => {
    setValue('')
  }

  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const inputClasses = `h-[3.1em] w-full transition-colors px-[0.9em] hover:px-[0.9em] py-2 rounded-md 
  ${isRequired || isError ? 'border-red-500' : ''} 
  ${inputVariant[variant]} ${isDisabled ? 'cursor-not-allowed pointer-events-none' : ''}`

  return (
    <>
      <div
        className={`relative flex flex-col items-start justify-start 
        flex-grow-0 flex-shrink-0 w-full bg-white rounded-tl rounded-tr h-14 
        ${isDisabled && 'opacity-[0.3] cursor-not-allowed pointer-events-none'}`}
      >
        {label && (
          <div className="absolute label top-[-0.5em] left-[0.7em] flex items-center rounded justify-start px-1 bg-white">
            <p className={`text-xs text-left ${isRequired || isError ? 'text-red-500' : 'text-black'}`}>
              {label ? label : 'label'}
            </p>
          </div>
        )}
        <input
          id={id}
          value={value}
          name={name}
          //type={type}
          type={showPassword ? 'text' : type}
          onChange={handleChange}
          placeholder={placeholder}
          className={inputClasses}
          style={{ WebkitAppearance: 'none', appearance: 'none' }}
        />
        <div
          style={{ background: 'white' }}
          className="flex justify-center items-center h-[2em] mt-[0.6em] mr-[0.1em]
            flex-grow-0 flex-shrink-0 absolute gap-2.5 pl-[1em] pr-2 right-0"
        >
          {type == 'password' && (
            <button
              onClick={(event) => {
                event.preventDefault() // Prevent the default submit behavior
                togglePasswordVisibility()
              }}
              className="show-password"
            >
              {showPassword ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M12 6c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l1.65 1.65C10.66 6.09 11.32 6 12 6m-1.07 1.14L13 9.21c.57.25 1.03.71 1.28 1.28l2.07 2.07c.08-.34.14-.7.14-1.07C16.5 9.01 14.48 7 12 7c-.37 0-.72.05-1.07.14M2.01 3.87l2.68 2.68C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.98-.29 4.32-.82l3.42 3.42 1.41-1.41L3.42 2.45zm7.5 7.5 2.61 2.61c-.04.01-.08.02-.12.02-1.38 0-2.5-1.12-2.5-2.5 0-.05.01-.08.01-.13m-3.4-3.4 1.75 1.75c-.23.55-.36 1.15-.36 1.78 0 2.48 2.02 4.5 4.5 4.5.63 0 1.23-.13 1.77-.36l.98.98c-.88.24-1.8.38-2.75.38-3.79 0-7.17-2.13-8.82-5.5.7-1.43 1.72-2.61 2.93-3.53"
                    fill="#000000"
                  ></path>
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4m0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7"
                    fill="#000000"
                  ></path>
                </svg>
              )}
            </button>
          )}
          {isError ? (
            <div onClick={clearInputValue} className="hover:cursor-pointer">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z"
                  fill="#D10411"
                ></path>
              </svg>
            </div>
          ) : (
            <div onClick={clearInputValue} className="hover:cursor-pointer">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative flex-grow-0 flex-shrink-0 w-6 h-6 bg-white"
                preserveAspectRatio="none"
              >
                <g clipPath="url(#clip0_626_352)">
                  <path
                    d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
                    className={isRequired ? 'fill-red-500' : 'fill-black'}
                  />
                </g>
                <defs>
                  <clipPath id="clip0_626_352">
                    <rect width={24} height={24} fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          )}
        </div>
        {supportingText && (
          <p
            className={`flex-grow w-[178px] text-xs text-left text-[#52555e] ml-[1em] mt-[0.1em]
          bg-white px-[0.5em] ${isRequired || isError ? 'text-red-500' : 'text-black'}`}
          >
            {supportingText ? supportingText : 'supportingText'}
          </p>
        )}
      </div>
    </>
  )
}
