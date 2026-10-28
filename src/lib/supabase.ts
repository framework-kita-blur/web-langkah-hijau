import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * `null` selama kredensial Supabase belum diisi di `.env`; service akan memakai data mock.
 * Sesuai proposal, web memakai Supabase langsung (Auth + RLS + RPC) dengan anon key saja —
 * jangan pernah menaruh service_role key di sini.
 */
export const supabase: SupabaseClient | null = url && anonKey ? createClient(url, anonKey) : null;
