import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import AuthButton from './components/auth-button-server'

import NewTweet from './components/new-tweet';
import Tweets from './components/tweets';

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login')
  }
  const { data } = await supabase
    .from('tweets')
    .select('*, author: profiles(*), likes(user_id)')
    .order('created_at', { ascending: false })

  const tweets = data?.map((tweet) => ({
    ...tweet,
    isUserLikedTweet: !!tweet.likes.find((like) => like.user_id === session.user.id),
    likes: tweet.likes.length
  })) ?? [];

  return (
    <>
      <AuthButton />
      <NewTweet />
      <Tweets tweets={tweets}/>
    </>

  )
}
