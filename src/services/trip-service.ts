/**
 * SERVICE daftar perjalanan.
 * TODO: ganti ke kueri Supabase (tabel `vehicle_activity`, hanya label "Unpad") saat backend siap.
 */
import { mockTrips, type Trip } from '@/data/mock';

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function getTrips(): Promise<Trip[]> {
  await wait(250);
  return mockTrips;
}
