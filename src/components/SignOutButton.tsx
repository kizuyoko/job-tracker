import { supabase } from '../supabase'
import Button from './ui/Button'

export default function SignOutButton() {
  return (
    <Button color="darkgray" onClick={() => supabase.auth.signOut()}>
      Sign out
    </Button>
  )
}