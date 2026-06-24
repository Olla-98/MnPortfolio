import { createClient } from '@supabase/supabase-js' // importeer de createClient functie van de Supabase JavaScript client library

const url = 'https://jacuibdtphkoeanlwtnu.supabase.co '  
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphY3VpYmR0cGhrb2Vhbmx3dG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2OTQxODIsImV4cCI6MjA5NzI3MDE4Mn0.Ov9rd7NmR_PH6zwN_cw1JaBUJSI-v35wxkKMQasrLxc'                

export const supabase = createClient(url, key) // maak een nieuwe Supabase client aan met de opgegeven URL en API-sleutel