import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import ApplicationRow from './components/ApplicationRow'
import type { Application } from './types/application'
import type { Session } from '@supabase/supabase-js'
import Login from './components/Login'
import SignOutButton from './components/SignOutButton'
import AddForm from './components/AddForm'

export default function App() {
  const [items, setItems] = useState<Application[]>([])
  const [error, setError] = useState<string | null>(null)
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

  async function add(company: string) {
    const { error } = await supabase.from('applications').insert({ company })
    if (error) setError(error.message)
    else load()
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
        <SignOutButton />
      </div>
      {error && <p className="text-red-600">Error: {error}</p>}
      {items.length === 0 && !error && (
        <p className="text-gray-500">No applications yet</p>
      )}
      <AddForm onAdd={add} />
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