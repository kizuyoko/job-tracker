import type { Interview } from '../types/interview'

type Props = {
  interview: Interview
}

export default function InterviewRow({ interview }: Props) {
  const date = interview.interview_date
    ? new Date(interview.interview_date).toLocaleString('sv-SE', {
        dateStyle: 'short',
        timeStyle: 'short',
    })
    : 'The date is not settled yet.'

  return (
    <div className="rounded border border-gray-300 p-3 dark:border-gray-600">
      <p className="font-medium text-gray-900 dark:text-gray-100">{date}</p>
      {interview.notes && (
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          {interview.notes}
        </p>
      )}
    </div>
  )
}