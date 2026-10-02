import { useEffect, useState } from 'react'
import { supabase } from './supabase'

type Application = {
  id: string
  company: string
  status: string
  notes: string | null
  created_at: string
}

export default function App() {
  const [items, setItems] = useState<Application[]>([])
  const [error, setError] = useState<string | null>(null)
  const [company, setCompany] = useState('')

  async function load() {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) setError(error.message)
    else setItems(data ?? [])
  }

  async function add() {
    if (!company.trim()) return
    const { error } = await supabase.from('applications').insert({ company })
    if (error) setError(error.message)
    else {
      setCompany('')
      load()
    }
  }
  
  async function updateStatus(id: string, status: string) {
    const { error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', id)
    if (error) setError(error.message)
    else load()
  }

  async function remove(id: string) {
    const { error } = await supabase
      .from('applications')
      .delete()
      .eq('id', id)
    if (error) setError(error.message)
    else load()
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Job Tracker</h1>
      {error && <p className="text-red-600">Error: {error}</p>}
      {items.length === 0 && !error && (
        <p className="text-gray-500">No applications yet</p>
      )}
      <div className="mb-4 flex gap-2">
        <input
          className="flex-1 rounded border px-3 py-2"
          placeholder="Company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <button className="rounded bg-black px-4 py-2 text-white" onClick={add}>
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((a) => (
          <li key={a.id} className="rounded border p-3">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{a.company}</div>
              <button
                className="text-sm text-red-600 hover:underline"
                onClick={() => remove(a.id)}
              >
                Delete
              </button>
            </div>
            <select
              className="mt-1 rounded border px-2 py-1 text-sm"
              value={a.status}
              onChange={(e) => updateStatus(a.id, e.target.value)}
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="rejected">Rejected</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  )
}