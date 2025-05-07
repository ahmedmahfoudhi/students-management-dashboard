import { supabase } from '../../supabase-client'
export const uploadFile = async (file: File) => {
    // generate a unique file name
    const fileName = `private/${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage.from('avatars').upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
    })
    if (error) {
        console.error('Error uploading file:', error)
        throw error
    }
    return data
}

export const getPublicUrl = (path: string) => {
    try {
        
        const { data } = supabase
      .storage
      .from('avatars')
            .getPublicUrl(path)
        
        return data.publicUrl
    } catch (error) {
        console.error('Error getting public URL:', error)
        throw error
    }
}