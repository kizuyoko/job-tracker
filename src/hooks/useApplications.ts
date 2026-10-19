import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../supabase'
import type { Application } from '../types/application'

export function useApplications(loggedIn: boolean) {
  const [items, setItems] = useState<Application[]>([])
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) setError(error.message)
    else setItems(data ?? [])
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (loggedIn) load()
  }, [loggedIn, load])
  
  async function add(company: string, description: string | null) {
    const { error } = await supabase.from('applications').insert({ company, description: description || null })
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

  async function update(id: string, company: string, description: string | null, status: string) {
    const { error } = await supabase
      .from('applications')
      .update({ status, company, description: description || null })
      .eq('id', id)
    if (error) setError(error.message)
    else {
      load()
      const { data, error: helloError } = await supabase.functions.invoke('hello')
      console.log('hello:', data, helloError)
    }
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

  return { items, error, add, update, updateStatus, remove }
}