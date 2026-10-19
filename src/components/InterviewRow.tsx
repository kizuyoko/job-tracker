import type { Interview } from '../types/interview'
import Button from './ui/Button'

type Props = {
  interview: Interview
  onRemove: (id: string) => void
}

export default function InterviewRow({ interview, onRemove }: Props) {
  const date = interview.interview_date
    ? new Date(interview.interview_date).toLocaleString('sv-SE', {
        dateStyle: 'short',
        timeStyle: 'short',
      })
    : 'Date not settled yet.'

  return (
    <div className="rounded border border-gray-300 p-3 dark:border-gray-600">
      <div className="flex items-center justify-between">
        <p className="font-medium text-gray-900 dark:text-gray-100">{date}</p>
        <Button color="red" size="xs" onClick={() => onRemove(interview.id)}>Delete</Button>
      </div>
      {interview.notes && (
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          {interview.notes}
        </p>
      )}
    </div>
  )
}