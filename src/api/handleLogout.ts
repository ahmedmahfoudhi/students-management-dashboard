import { supabase } from "../../supabase-client"

export const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
        throw new Error(error.message)
    }
}