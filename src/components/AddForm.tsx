import { useState } from 'react'
import Button from './ui/Button'
import Input from './ui/Input'
import Textarea from './ui/Textarea'

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
        <Input
          className="flex-1"
          placeholder="Company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <Button color="blue" size="md" onClick={submit}>Add</Button>
      </div>
      <Textarea
          className="w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
    </section>
  )
}