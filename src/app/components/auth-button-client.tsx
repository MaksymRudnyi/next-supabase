'use client';

import { createClientComponentClient, Session} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthButtonClient({ session}: { session: Session | null}) {
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();

   
    const handleSignIn = async () => {
        const { error, ...dat } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback'
            }
        })
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    }


    return session 
        ? <button onClick={handleSignOut}>Sign out</button>
        : <button onClick={handleSignIn}>Sign in</button>
}