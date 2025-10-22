import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Erzeugt einen Supabase-Client für die Client-Seite.
// Erwartet NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_ANON_KEY in der Umgebung.
export const createSupabaseClient = (): SupabaseClient => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // TS: wir lassen dies zur Laufzeit, aber stellen sicher, dass devs wissen, dass ENV benötigt werden
    console.warn('NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not set');
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  );
};