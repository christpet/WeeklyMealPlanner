
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://xihitkzfvvvdvkcdvypc.supabase.co', 
  ['SUPABASE_KEY']
);