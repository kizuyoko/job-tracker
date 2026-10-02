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

  useEffect(() => {
    supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setItems(data ?? [])
      })
  }, [])

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Job Tracker</h1>
      {error && <p className="text-red-600">Error: {error}</p>}
      {items.length === 0 && !error && (
        <p className="text-gray-500">まだ応募はありません</p>
      )}
      <ul className="space-y-2">
        {items.map((a) => (
          <li key={a.id} className="rounded border p-3">
            <div className="font-semibold">{a.company}</div>
            <div className="text-sm text-gray-600">{a.status}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}