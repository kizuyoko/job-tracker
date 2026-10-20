import type { SelectHTMLAttributes } from 'react'

type Props = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> & {
  size?: 'sm' | 'md'
}

const sizes = {
  sm: 'py-1 pl-2 pr-8',
  md: 'py-2 pl-3 pr-9',
}

export default function Select({ size = 'md', className = '', children, ...props }: Props) {
  return (
    <div className={`relative ${className}`}>
      <select
        className={`w-full appearance-none rounded border bg-white text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200 ${sizes[size]}`}
        {...props}
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-300"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5.5 7.5 10 12l4.5-4.5" />
      </svg>
    </div>
  )
}