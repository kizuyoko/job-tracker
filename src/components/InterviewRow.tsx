import { useState } from 'react'
import { activityTypes } from '../types/interview'
import type { ActivityType, Interview } from '../types/interview'
import Button from './ui/Button'
import Input from './ui/Input'
import Select from './ui/Select'

type Props = {
  interview: Interview
  onRemove: (id: string) => void
  onUpdate: (
    id: string,
    interviewDate: string | null,
    activityType: ActivityType,
    notes: string,
  ) => Promise<{ ok: boolean; message: string | null }>
}

function toLocalInput(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function InterviewRow({ interview, onRemove, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editDate, setEditDate] = useState(toLocalInput(interview.interview_date))  
  const [editActivityType, setEditActivityType] = useState<ActivityType>(interview.activity_type)
  const [editNotes, setEditNotes] = useState(interview.notes ?? '')
  const [helloMessage, setHelloMessage] = useState<string | null>(null)
  
  async function save() {
    const { ok, message } = await onUpdate(
      interview.id,
      editDate ? new Date(editDate).toISOString() : null,
      editActivityType,
      editNotes,
    )
    if (ok) {
      setHelloMessage(message)
      setTimeout(() => setHelloMessage(null), 3000)
      setIsEditing(false)
    }
  }

  function cancel() {
    setEditDate(toLocalInput(interview.interview_date))
    setEditActivityType(interview.activity_type)
    setEditNotes(interview.notes ?? '')
    setIsEditing(false)
  }

  const date = interview.interview_date
    ? new Date(interview.interview_date).toLocaleString('sv-SE', {
        dateStyle: 'short',
        timeStyle: 'short',
      })
    : 'Date not settled yet.'

  return (
    <div className="rounded border border-gray-300 p-3 dark:border-gray-600">
      <div className="flex items-center justify-between">
        {isEditing ? (
          <div className="mr-2 flex flex-1 gap-2">
            <Input
              size="sm"
              type="datetime-local"
              className="flex-1"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />
            <Select
              size="sm"
              className="flex-1"
              value={editActivityType}
              onChange={(e) => setEditActivityType(e.target.value as ActivityType)}
            >
              {activityTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </Select>
          </div>
        ) : (
          <p className="font-medium text-gray-900 dark:text-gray-100 w-full">
            {date}
            <span className="ml-2 rounded bg-gray-100 px-2 py-0.5 text-xs font-normal text-gray-700 dark:bg-gray-700 dark:text-gray-200">
              {interview.activity_type}
            </span>
          </p>
        )}
        {isEditing ? (
          <div className="flex gap-2">
            <Button color="green" size="xs" onClick={save}>Save</Button>
            <Button color="gray" size="xs" onClick={cancel}>Cancel</Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button color="green" size="xs" onClick={() => setIsEditing(true)}>Update</Button>
            <Button color="red" size="xs" onClick={() => onRemove(interview.id)}>Delete</Button>
          </div>
        )}
      </div>        
      {helloMessage && (
          <p className="mt-1 text-sm text-green-600">{helloMessage}</p>
        )} 
      {isEditing ? (
        <Input
          size="sm"
          className="mt-1 w-full"
          placeholder="Notes"
          value={editNotes}
          onChange={(e) => setEditNotes(e.target.value)}
        />
      ) : (
        interview.notes && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {interview.notes}
          </p>
        )
      )}
    </div>
  )
}