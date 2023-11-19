import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { useRouter } from "next/navigation";
import { revalidatePath } from 'next/cache'

export default function NewTweet() {
    const addTweet = async (formData: FormData) => {
        "use server"
        const title = formData.get('title')
        const supabase = createServerActionClient({ cookies});
        const { data: {user}} = await supabase.auth.getUser();
        console.log('title: ', title, user)
        await supabase.from('tweets').insert({title, user_id: user.id})
        console.log('submit tweet');
        revalidatePath('/')
    }
    return (
        <form action={addTweet}>
            <input name="title" className='bg-inherit'/>
        </form>
    )
}