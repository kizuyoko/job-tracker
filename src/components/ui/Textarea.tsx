import type { TextareaHTMLAttributes } from 'react'

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> & {
  size?: 'sm' | 'md'
}

const sizes = {
  sm: 'px-2 py-1',
  md: 'px-3 py-2',
}

export default function Textarea({ size = 'md', className = '', ...props }: Props) {
  return <textarea className={`rounded border ${sizes[size]} ${className}`} {...props} />
}