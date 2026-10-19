export const activityTypes = [
  'Interview I',
  'Interview II',
  'Interview III',
  'Interview IV',
  'Got calling',
  'Got mail',
  'Other',
] as const

export type ActivityType = (typeof activityTypes)[number]

export type Interview = {
  id: string
  application_id: string
  interview_date: string | null
  notes: string | null
  activity_type: ActivityType
  created_at: string
}