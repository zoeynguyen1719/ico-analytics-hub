// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bsygpfvjdbbmditzpkbf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzeWdwZnZqZGJibWRpdHpwa2JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwODMxMDksImV4cCI6MjA1MDY1OTEwOX0.qUw99hOzRVrb90fFo3-mwJbDyV_IV0puZFTW03LBMlY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);