import { supabase } from "../../supabase-client";

export const validateSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
        return false;
    }
    return true
    
}