import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import AuthButton from './components/auth-button-server'

export default async function Home() {
  const supabase = createServerComponentClient<Database>({cookies});

  const { data: {session} } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login')
  }
  const { data: tweets}  = await supabase.from('tweets').select();

  console.log('data: ', tweets)
  return (
    <>
      <AuthButton/>
      <pre>{JSON.stringify(tweets, null, 2)}</pre>
    </>
  
  )
}
