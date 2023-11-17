'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthButton() {
    const supabase = createClientComponentClient();

    const handleSignIn = async () => {
        supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback'
            }
        })
    }

    const handleSignOut = async () => {
        supabase.auth.signOut();
    }


    return (
        <>
            <button onClick={handleSignOut}>Sign out</button>
            <button onClick={handleSignIn}>Sign in</button>
        </>
    )
}