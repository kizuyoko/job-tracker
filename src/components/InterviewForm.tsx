import { useState } from 'react'

type Props = {
  onAdd: (interviewDate: string | null, notes: string) => void
}

export default function InterviewForm({ onAdd }: Props) {
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')

  function submit() {
    if (!date && !notes.trim()) return
    onAdd(date ? new Date(date).toISOString() : null, notes)
    setDate('')
    setNotes('')
  }

  return (
    <div className="mt-3 flex gap-2">
      <input
        type="datetime-local"
        className="rounded border px-2 py-1 text-sm"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        className="flex-1 rounded border px-2 py-1 text-sm"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button
        className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
        onClick={submit}
      >
        Add
      </button>
    </div>
  )
}