/**
 * SERVICE autentikasi.
 * Memakai Supabase Auth bila kredensial tersedia; jika tidak, jatuh ke data mock.
 * Sesuai proposal (UC-004): hanya role "Web" yang boleh masuk portal manajemen.
 */
import { mockUser, type User } from '@/data/mock';
import { supabase } from '@/lib/supabase';

const FAKE_LATENCY_MS = 400;
const AUTH_STORAGE_KEY = 'langkah-hijau.auth';
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

type SupabaseUserLike = {
  id: string;
  email?: string | undefined;
  user_metadata?: Record<string, unknown> | undefined;
};

function toUser(user: SupabaseUserLike): User {
  const meta = user.user_metadata ?? {};
  return {
    id: user.id,
    name: String(meta.full_name ?? meta.name ?? 'Admin'),
    email: user.email ?? '',
    role: meta.role === 'Web' ? 'Web' : 'Mobile',
  };
}

/** Storage bisa melempar (mode privat / SSR), jadi setiap akses dibungkus. */
function stores(): Array<() => Storage> {
  return [() => localStorage, () => sessionStorage];
}

function parseUser(raw: string): User | null {
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object') return null;
    const candidate = value as Record<string, unknown>;
    const role = candidate.role === 'Web' || candidate.role === 'Mobile' ? candidate.role : null;
    if (
      typeof candidate.id === 'string' &&
      typeof candidate.name === 'string' &&
      typeof candidate.email === 'string' &&
      role
    ) {
      return { id: candidate.id, name: candidate.name, email: candidate.email, role };
    }
  } catch {
    // data rusak -> anggap tidak ada sesi.
  }
  return null;
}

/** Baca sesi mock yang tersimpan: localStorage dulu, lalu sessionStorage. */
function readStoredUser(): User | null {
  for (const store of stores()) {
    try {
      const raw = store().getItem(AUTH_STORAGE_KEY);
      const user = raw ? parseUser(raw) : null;
      if (user) return user;
    } catch {
      // storage tidak tersedia; lanjut ke storage berikutnya.
    }
  }
  return null;
}

function clearStoredUser(): void {
  for (const store of stores()) {
    try {
      store().removeItem(AUTH_STORAGE_KEY);
    } catch {
      // storage tidak tersedia; tidak ada yang perlu dibersihkan.
    }
  }
}

function persistUser(remember: boolean): void {
  clearStoredUser();
  try {
    const store = remember === true ? localStorage : sessionStorage;
    store.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));
  } catch {
    // storage tidak tersedia; sesi hanya bertahan selama halaman hidup.
  }
}

export async function signIn(email: string, password: string, remember = false): Promise<User> {
  if (!supabase) {
    await wait(FAKE_LATENCY_MS);
    persistUser(remember);
    return mockUser;
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error('Kredensial tidak valid.');

  const user = toUser(data.user);
  if (user.role !== 'Web') {
    await supabase.auth.signOut();
    throw new Error('Akun ini tidak punya akses ke portal manajemen.');
  }
  return user;
}

export async function signOut(): Promise<void> {
  clearStoredUser();
  if (!supabase) {
    await wait(100);
    return;
  }
  await supabase.auth.signOut();
}

/** Dipakai untuk memulihkan sesi saat halaman dimuat ulang. */
export async function getCurrentUser(): Promise<User | null> {
  if (!supabase) return readStoredUser();
  const { data } = await supabase.auth.getSession();
  return data.session ? toUser(data.session.user) : null;
}
