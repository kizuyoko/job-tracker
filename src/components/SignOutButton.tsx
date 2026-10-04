import { supabase } from '../supabase'

export default function SignOutButton() {
  return (
    <button
      className="rounded bg-gray-600 px-3 py-1 text-sm text-white hover:bg-gray-700"
      onClick={() => supabase.auth.signOut()}
    >
      Sign out
    </button>
  )
}