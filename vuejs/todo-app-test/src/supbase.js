import { createClient } from '@supabase/supabase-js' // importeer de createClient functie van de Supabase JavaScript client library

const url = 'https://jacuibdtphkoeanlwtnu.supabase.co '  
const key = 'sb_publishable_sh97E7W4XxV70BXEYQaVxA_4nVWS2Lk'                

export const supabase = createClient(url, key) // maak een nieuwe Supabase client aan met de opgegeven URL en API-sleutel