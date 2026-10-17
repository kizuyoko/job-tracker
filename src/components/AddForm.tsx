import { useState } from 'react'

type Props = {
  onAdd: (company: string, description: string | null) => void
}

export default function AddForm({ onAdd }: Props) {
  const [company, setCompany] = useState('')
  const [description, setDescription] = useState('')

  function submit() {
    if (!company.trim()) return
    onAdd(company, description)
    setCompany('')
    setDescription('')
  }

  return (
    <section className="mb-4">
      <div className="mb-2 flex gap-2">
        <input
          className="flex-1 rounded border px-3 py-2"
          placeholder="Company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          onClick={submit}
        >
          Add
        </button>
      </div>
      <textarea
          className="w-full rounded border px-3 py-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
    </section>
  )
}