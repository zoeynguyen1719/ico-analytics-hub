import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bsygpfvjdbbmditzpkbf.supabase.co';
const supabaseAnonKey = 'YOUR-ANON-KEY'; // Replace with your actual anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);