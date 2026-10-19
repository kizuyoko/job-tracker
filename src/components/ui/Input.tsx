import type { InputHTMLAttributes } from 'react'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: 'sm' | 'md'
}

const sizes = {
  sm: 'px-2 py-1',
  md: 'px-3 py-2',
}

export default function Input({ size = 'md', className = '', ...props }: Props) {
  return <input className={`rounded border ${sizes[size]} ${className}`} {...props} />
}