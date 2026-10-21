/// <reference types="node" />
// Runs once before the test workers start.
// Fixing the time zone keeps date tests independent of the machine they run on.
export function setup() {
  process.env.TZ = 'Europe/Stockholm'
}