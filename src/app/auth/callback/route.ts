import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
    const requrestUrl = new URL(request.url);
    const code = requrestUrl.searchParams.get('code');

    if(code) {
        const supabase = createRouteHandlerClient({cookies});
        await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(requrestUrl.origin)
}