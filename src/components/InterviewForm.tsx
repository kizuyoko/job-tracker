import { useState } from 'react'
import Button from './ui/Button'
import { activityTypes } from '../types/interview'
import type { ActivityType } from '../types/interview'
import Input from './ui/Input'
import Select from './ui/Select'

type Props = {
  onAdd: (interviewDate: string | null, activityType: ActivityType, notes: string) => void
}

export default function InterviewForm({ onAdd }: Props) {
  const [date, setDate] = useState('')
  const [activityType, setActivityType] = useState<ActivityType>(activityTypes[0])
  const [notes, setNotes] = useState('')

  function submit() {
    if (!date && !notes.trim()) return
    onAdd(date ? new Date(date).toISOString() : null, activityType, notes)
    setDate('')
    setActivityType(activityTypes[0])
    setNotes('')
  }

  return (
    <div className="mt-3 space-y-2">
      <div className="flex items-start gap-2">
        <Input
          size="sm"
          type="datetime-local"
          className="flex-1"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Select
          size="sm"
          className="flex-1"
          value={activityType}
          onChange={(e) => setActivityType(e.target.value as ActivityType)}
        >
          {activityTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </Select>
        <Button color="blue" onClick={submit}>
          Add
        </Button>
      </div>
      <Input
        size="sm"
        className="w-full"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>
  )
}