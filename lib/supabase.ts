import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://wqqxyupgndcpetqzudez.supabase.co'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxcXh5dXBnbmRjcGV0cXp1ZGV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwODkxMTIsImV4cCI6MjA3OTY2NTExMn0.QS83QorW71kDqlwH9r8NN87QOvA2XXDWpn4O-DSabzc'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

