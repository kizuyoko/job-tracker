import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../supabase'
import type { ActivityType, Interview } from '../types/interview'

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

async function add(interviewDate: string | null, activityType: ActivityType, notes: string) {
  setError(null) 
  const { error } = await supabase.from('interviews').insert({
      application_id: applicationId,
      interview_date: interviewDate,
      activity_type: activityType,
      notes: notes || null,
    })
    if (error) setError(error.message)
    else load()
  }

async function remove(id: string): Promise<string | null> {
  const { error } = await supabase.from('interviews').delete().eq('id', id)
  if (error) return error.message
  load()
  return null
}

async function update(
    id: string,
    interviewDate: string | null,
    activityType: ActivityType,
    notes: string,
  ): Promise<{ ok: boolean; message: string | null }> {
    setError(null) 
    const { error } = await supabase
      .from('interviews')
      .update({
        interview_date: interviewDate,
        activity_type: activityType,
        notes: notes || null,
      })
      .eq('id', id)
    if (error) {
      return { ok: false, message: error.message }
    }
    load()
    const { data, error: helloError } = await supabase.functions.invoke('hello')
    console.log('hello:', data, helloError)
    return { ok: true, message: helloError ? null : data }
  }

  return { items, error, add, remove, update }
}

