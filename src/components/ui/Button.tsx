import type { ReactNode } from 'react'

type Props = {
    color: 'green' | 'red' | 'gray' | 'darkgray' | 'blue'
    size?: 'xs' | 'sm' | 'md'
    onClick: () => void
    children: ReactNode
    className?: string
}

const colors = {
    green: 'bg-green-600 hover:bg-green-700',
    red: 'bg-red-600 hover:bg-red-700',
    gray: 'bg-gray-500 hover:bg-gray-600',
    darkgray: 'bg-gray-600 hover:bg-gray-700',
    blue: 'bg-blue-600 hover:bg-blue-700',
}

const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
}

export default function Button({ color, size = 'sm', onClick, children, className = '' }: Props) {
    return (
        <button
            className={`rounded text-white ${sizes[size]} ${colors[color]} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}