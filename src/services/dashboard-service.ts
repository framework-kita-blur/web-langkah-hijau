/**
 * SERVICE data dashboard.
 * TODO: ganti isi fungsi ke `supabase.rpc('dashboard_summary')` sesuai proposal
 * (agregasi di backend, filter label "Unpad", hanya role Web lewat RLS).
 */
import { mockDashboard, type DashboardSummary } from '@/data/mock';
import { supabase } from '@/lib/supabase';

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Pesan ramah untuk UI; detail teknis tidak pernah ditampilkan ke pengguna. */
const LOAD_ERROR = 'Gagal memuat data dashboard.';

const NUMERIC_FIELDS = [
  'totalEmissionKg',
  'changePercent',
  'distanceKm',
  'tripCount',
  'studentCount',
  'last5HoursTotalKg',
  'facultyDistributionTotalKg',
  'last7DaysTotalKg',
] as const;

const ARRAY_FIELDS = [
  'topFaculties',
  'last5Hours',
  'facultyDistribution',
  'last7Days',
  'peakHours',
  'recentTrips',
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

/** Cek bentuk keluaran RPC sebelum dipakai UI (tanpa schema library). */
function isDashboardSummary(value: unknown): value is DashboardSummary {
  if (!isRecord(value)) return false;
  if (!NUMERIC_FIELDS.every((field) => isFiniteNumber(value[field]))) return false;
  if (!ARRAY_FIELDS.every((field) => Array.isArray(value[field]))) return false;
  const top = value.topFaculty;
  return (
    isRecord(top) && typeof top.name === 'string' && isFiniteNumber(top.emissionKg) && isFiniteNumber(top.sharePercent)
  );
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  if (!supabase) {
    await wait(300);
    return mockDashboard;
  }
  const { data, error } = await supabase.rpc('dashboard_summary');
  if (error) {
    console.error('dashboard_summary gagal:', error.message);
    throw new Error(LOAD_ERROR);
  }
  if (!isDashboardSummary(data)) {
    console.error('dashboard_summary: bentuk data tidak sesuai', data);
    throw new Error(LOAD_ERROR);
  }
  return data;
}
