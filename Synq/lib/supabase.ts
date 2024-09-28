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
};

export const organizationSignUp = async (email, passsword, org_name, website) => {
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
};

export const login = async (email, password) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
  })
}

export const logout = async () => {
  let { error } = await supabase.auth.signOut()
}

export const getPersonalProfile = async (setLoading, session) => {
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

  export const getOrganizationProfile = async (setLoading: (loading) => {}, session: Session) => {
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