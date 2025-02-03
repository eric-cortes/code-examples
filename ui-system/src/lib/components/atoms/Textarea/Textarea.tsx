import { TextareaHTMLAttributes, ReactNode } from 'react'

export const TEXTAREA_VARIANT = {
  DEFAULT: 'default',
} as const
export type Textarea = keyof typeof TEXTAREA_VARIANT

export const textarea: Record<Textarea, string> = {
  DEFAULT:
    'flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5 transition-all duration-400 rounded border border-1 border-[#373940] hover:outline outline-offset-0 outline-1',
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement | HTMLLabelElement> {
  value?: string
  label?: string
  placeholder?: string
  variant?: Textarea
  isDisabled?: boolean
  isError?: boolean
  children?: ReactNode
  defaultValue?: string
  isRequired?: boolean
  supportingText?: string
  id: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const Textarea = ({
  value,
  placeholder,
  label,
  variant = 'DEFAULT',
  isDisabled = false,
  isError = false,
  defaultValue,
  isRequired,
  onChange,
  supportingText,
  id,
}: TextareaProps) => {
  const inputClasses = `h-[3.1em] w-full transition-colors px-[0.9em] hover:px-[0.9em] py-[0.7em] rounded-md 
  ${isRequired || isError ? 'border-red-500' : ''} 
  ${textarea[variant]} ${isDisabled ? 'cursor-not-allowed pointer-events-none' : ''}`

  return (
    <>
      <div
        className={`relative flex flex-col items-start justify-start w-full rounded-tl rounded-tr
       ${isDisabled && 'opacity-[0.3] cursor-not-allowed pointer-events-none'}`}
      >
        {label && (
          <div className="absolute label top-[-0.5em] left-[0.7em] h-[1em] flex items-center rounded justify-start px-1 bg-white">
            <p className={`text-xs text-left ${isRequired || isError ? 'text-red-500' : 'text-black'}`}>
              {label ? label : 'label'}
            </p>
          </div>
        )}
        <textarea
          id={id}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
          className={inputClasses}
        ></textarea>
        {supportingText && (
          <p
            className={`flex-grow w-[178px] h-[1em] text-[1em] text-left ml-[1em] mt-[0.1em]
             px-[0.5em] ${isRequired || isError ? 'text-red-500' : 'text-black'}`}
          >
            {supportingText ? supportingText : 'supportingText'}
          </p>
        )}
      </div>
    </>
  )
}
