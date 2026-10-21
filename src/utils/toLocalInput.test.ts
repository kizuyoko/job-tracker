import { describe, it, expect } from 'vitest'
import { toLocalInput } from './toLocalInput'

describe('toLocalInput', () => {
  it('returns an empty string for null', () => {
    expect(toLocalInput(null)).toBe('')
  })

  it('returns the correct local time for summer time (UTC+2)', () => {
    expect(toLocalInput('2026-10-20T22:30:00Z')).toBe('2026-10-21T00:30')
  })

  it('returns the correct local time for winter time (UTC+1)', () => {
    expect(toLocalInput('2026-12-20T22:30:00Z')).toBe('2026-12-20T23:30')
  })
})