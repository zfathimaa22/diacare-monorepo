import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oxafdoswqwnaxdmiztfo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94YWZkb3N3cXduYXhkbWl6dGZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNTEzNjUsImV4cCI6MjEwMjYyNzM2NX0.QZVEq5cmpnUi_GguG5z1ViPRZd3TSxIy7DXY-pkARBQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
