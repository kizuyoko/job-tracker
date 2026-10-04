import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './supabase'
import { useApplications } from './hooks/useApplications'
import ApplicationRow from './components/ApplicationRow'
import AddForm from './components/AddForm'
import Login from './components/Login'
import SignOutButton from './components/SignOutButton'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const { items, error, add, updateStatus, remove } = useApplications(!!session)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  if (!session) return <Login />

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Tracker</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <SignOutButton />
        </div>
      </div>
      {error && <p className="text-red-600 dark:text-red-400">Error: {error}</p>}
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