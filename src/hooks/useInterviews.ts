import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../supabase'
import type { Interview } from '../types/interview'

export function useInterviews(applicationId: string) {
  const [items, setItems] = useState<Interview[]>([])
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from('interviews')
      .select('*')
      .eq('application_id', applicationId)
      .order('interview_date', { ascending: true })
    if (error) setError(error.message)
    else setItems(data ?? [])
  }, [applicationId])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load()
  }, [load])

  async function add(interviewDate: string | null, notes: string) {
    const { error } = await supabase.from('interviews').insert({
      application_id: applicationId,
      interview_date: interviewDate,
      notes: notes || null,
    })
    if (error) setError(error.message)
    else load()
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this interview?')) return
    const { error } = await supabase.from('interviews').delete().eq('id', id)
    if (error) setError(error.message)
    else load()
  }

  return { items, error, add, remove }
}