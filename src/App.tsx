import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import ApplicationRow from './components/ApplicationRow'
import type { Application } from './types/application'
import type { Session } from '@supabase/supabase-js'
import Login from './components/Login'

export default function App() {
  const [items, setItems] = useState<Application[]>([])
  const [error, setError] = useState<string | null>(null)
  const [company, setCompany] = useState('')
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

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
    if (!window.confirm('Delete this application?')) return
    const { error } = await supabase
      .from('applications')
      .delete()
      .eq('id', id)
    if (error) setError(error.message)
    else load()
  }

  useEffect(() => {
     // eslint-disable-next-line react-hooks/set-state-in-effect
    load()
  }, [])

  if (!session) return <Login />

  return (
    <div className="mx-auto max-w-xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Tracker</h1>
        <button
          className="rounded border px-3 py-1 text-sm hover:bg-gray-50"
          onClick={() => supabase.auth.signOut()}
        >
          Sign out
        </button>
      </div>
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
        <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" onClick={add}>
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((a) => (
          <ApplicationRow
            key={a.id}
            item={a}
            onUpdateStatus={updateStatus}
            onRemove={remove}
          />
        ))}
      </ul>
    </div>
  )
}