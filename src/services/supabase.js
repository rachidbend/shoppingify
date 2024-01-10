import { createClient } from '@supabase/supabase-js';
export const supabase_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vZ2hzdWt4ZnpueGxtaGVuYmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4MzU2NTgsImV4cCI6MjAyMDQxMTY1OH0.ez2ULk1Z1bACj7JYvDJpDjesFAtmUBmn8EQva65MhG8';
export const supabase_URL = 'https://noghsukxfznxlmhenbko.supabase.co';

export const supabase = createClient(supabase_URL, supabase_KEY);
