import { ButtonHTMLAttributes, MouseEventHandler } from 'react'

export const FILTERCHIP_VARIANT = {
  DEFAULT: 'default',
} as const
export type FilterChipVariant = keyof typeof FILTERCHIP_VARIANT

export const filterChipVariant: Record<FilterChipVariant, string> = {
  DEFAULT: 'bg-black hover:bg-black-800 active:bg-grey-900',
}

export interface FilterChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  isDisabled?: boolean
  variant?: FilterChipVariant
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const FilterChip = ({ label, isDisabled, variant = 'DEFAULT', onClick }: FilterChipProps) => {
  return (
    <button
      className={`justify-start items-start h-8 overflow-hidden rounded-lg bg-[#d8e6f2] hover:bg-[#c2d6e7] 
      transition-colors duration-300 w-auto inline-block ${
        isDisabled && 'opacity-[0.3] cursor-not-allowed pointer-events-none'
      }`}
      onClick={onClick}
    >
      <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2 pl-3 pr-2 py-1.5">
        <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-center text-black">{label}</p>
        <svg
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-grow-0 flex-shrink-0 w-[18px] h-[18px] relative"
          preserveAspectRatio="xMidYMid meet"
        >
          <g clipPath="url(#clip0_412_1849)">
            <path
              d="M14.25 4.8075L13.1925 3.75L9 7.9425L4.8075 3.75L3.75 4.8075L7.9425 9L3.75 13.1925L4.8075 14.25L9 10.0575L13.1925 14.25L14.25 13.1925L10.0575 9L14.25 4.8075Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_412_1849">
              <rect width={18} height={18} fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </button>
  )
}
