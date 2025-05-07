import { supabase } from "../../supabase-client";
export const handleLogin = async (email: string, password: string) => {
    
    const {data: session, error} = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        throw Error(error.message);
    }
    const token = session?.session?.access_token;
    if (!token) {
        throw Error("No token found");
    }
    
}