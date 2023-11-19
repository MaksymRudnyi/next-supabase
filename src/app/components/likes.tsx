"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import {useOptimistic, useTransition} from "react";
export default function Likes({
  tweet,
  addOptimisticTweet,
}: {
  tweet: TweetWithAuthor;
  addOptimisticTweet: (newTweet: TweetWithAuthor) => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLikes = async () => {
    const supabase = createClientComponentClient<Database>();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      if (tweet.isUserLikedTweet) {
        
            addOptimisticTweet({
                ...tweet,
                likes: tweet.likes - 1,
                isUserLikedTweet: !tweet.isUserLikedTweet,
              });
        
        
        await supabase
          .from("likes")
          .delete()
          .match({ user_id: user.id, tweet_id: tweet.id });
      } else {
    
        addOptimisticTweet({
        ...tweet,
        likes: tweet.likes + 1,
        isUserLikedTweet: !tweet.isUserLikedTweet,
        });
    
        await supabase
          .from("likes")
          .insert({ user_id: user.id, tweet_id: tweet.id });
      }
      router.refresh();
    }
  };
  return <button onClick={() => startTransition(() => handleLikes())}>{tweet.likes} Likes</button>;
}