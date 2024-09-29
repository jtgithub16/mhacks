import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Session } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'
import { Alert } from 'react-native'
import { OrganizationProfile, PersonalProfile } from './types'
    
const supabaseUrl ='https://egaxbxzsvwoeyjjcnnrn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnYXhieHpzdndvZXlqamNubnJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc1NTI1NzcsImV4cCI6MjA0MzEyODU3N30._IKpp8BPqkCLLS5VqxRhwUbi-V3oC6wJFTuHRbTU3Ao'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

export const personalSignUp = async (email, password, first_name, last_name) => {
  try{
    let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            first_name: first_name,
            last_name: last_name,
          },
        },
      })
      if(error){
        console.error("error signing up personal fetch", error);
      }
  } 
  catch(err){
    console.error(err); 
  }
  
};

export const checkSessionType = async (session:Session) => { // 1: personal, 0: organization
  if (!session?.user) throw new Error('No user on the session!')
  try{
    const {data,error} = await supabase
      .from('personalUsers')
      .select('*')
      .eq('personl_id', session?.user.id)      
    if(error){
      console.error("error checking session type", error)
      return false
    }
    if(data && data.length > 0){
      console.log("session is personal")
      return true
    }
    else{
      console.log("session is organization")
      return true
    }
  } catch (e){
    console.error("error checking session type, personal or org", e);
  }
};

export const organizationSignUp = async (email, passsword, org_name, website) => {
  try{
    let { data, error } = await supabase.auth.signUp({
            email: email,
            password: passsword,
            options: {
              data: {
                org_name: org_name,
                website: website
              }
            }
      })
      if(error){
        console.error("error signing up organization fetch", error);
      }
  }catch(e){
    console.error("error signing up organization", e);
  }
};

export const login = async (email, password) => {
  try{
    let { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
      })
    if(error){
      console.error("error login fetch", error)
    }
  }catch(e){
    console.error("error logging in", e);
  }
  
}

export const logout = async () => {
  try{
    let { error } = await supabase.auth.signOut()
    if(error){
      console.error("error signout fetch", error)
    }
  }catch(e){
    console.error("error logging out", e);

  }
  
}

export const getPersonalProfile = async (setLoading: React.Dispatch<React.SetStateAction<boolean>>, session:any) => {
  let personalProfile: PersonalProfile | null = null; // Declare it here
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('personal')
        .select(`first_name, last_name, email`)
        .eq('personal_id', session?.user.id)
        .single()
      
      if (error && status !== 406) {
        throw error
      }
      if (data) {
        const personalProfile: PersonalProfile = {
          personal_id: session?.user.id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
      };
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
    return personalProfile
  }

  export const getOrganizationProfile = async (setLoading: React.Dispatch<React.SetStateAction<boolean>>, session:any) => {
    let organizationProfile: OrganizationProfile | null = null; // Declare it here
      try {
        setLoading(true)
        if (!session?.user) throw new Error('No user on the session!')
  
        const { data, error, status } = await supabase
          .from('organization')
          .select(`org_name, website, email, description`)
          .eq('organization_id', session?.user.id)
          .single()
        
        if (error && status !== 406) {
          throw error
        }
        if (data) {
          const organizationProfile: OrganizationProfile = {
            organization_id: session?.user.id,
            org_name: data.org_name,
            website: data.website,
            email: data.email,
            description: data.description,
        };
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message)
        }
      } finally {
        setLoading(false)
      }
      return organizationProfile
    }


export const updatePersonalProfile = async ({
    setLoading,
    session,
    updatedProfile,
  }: {
    setLoading: (loading) => {},
    session: Session,
    updatedProfile: PersonalProfile,
  }) => {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { error } = await supabase.from('personal').upsert(updatedProfile)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

export const updateOrganizationProfile = async ({
    setLoading,
    session,
    updatedProfile,
  }: {
    setLoading: (loading) => {},
    session: Session,
    updatedProfile: OrganizationProfile,
  }) => {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { error } = await supabase.from('organization').upsert(updatedProfile)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }