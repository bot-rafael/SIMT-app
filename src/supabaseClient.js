import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ujxcjxfnizqdwelxlwes.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqeGNqeGZuaXpxZHdlbHhsd2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MDc4MDAsImV4cCI6MjA2NjA4MzgwMH0.6q5jndPN7jUqdMaVNCIge982oFGWryyXfpV2QpRcoII';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
