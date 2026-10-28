/**
 * DATA PLACEHOLDER.
 * Dipakai agar dashboard tampil sebelum Supabase (RPC agregasi) siap.
 * Bentuk data meniru keluaran agregasi pada proposal (DATA-005).
 */

export type Role = 'Web' | 'Mobile';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export type FacultyStat = { name: string; emissionKg: number };
export type HourlyPoint = { hour: string; emissionKg: number };
export type DailyPoint = { day: string; emissionKg: number };
export type PeakHourPoint = { hour: string; trips: number };
export type TripLabel = 'Unpad' | 'Pribadi';

export type RecentTrip = {
  id: string;
  time: string;
  faculty: string;
  distanceKm: number;
  emissionKg: number;
  label: TripLabel;
};

export type DashboardSummary = {
  totalEmissionKg: number;
  /** Persentase perubahan dibanding kemarin. Negatif berarti lebih rendah. */
  changePercent: number;
  distanceKm: number;
  tripCount: number;
  studentCount: number;
  topFaculty: { name: string; emissionKg: number; sharePercent: number };
  topFaculties: FacultyStat[];
  last5Hours: HourlyPoint[];
  last5HoursTotalKg: number;
  facultyDistribution: FacultyStat[];
  facultyDistributionTotalKg: number;
  last7Days: DailyPoint[];
  last7DaysTotalKg: number;
  peakHours: PeakHourPoint[];
  recentTrips: RecentTrip[];
};

export const mockUser: User = {
  id: 'user-1',
  name: 'Admin',
  email: 'admin@unpad.ac.id',
  role: 'Web',
};

export const mockDashboard: DashboardSummary = {
  totalEmissionKg: 1284.6,
  changePercent: -8.2,
  distanceKm: 8942,
  tripCount: 1736,
  studentCount: 1204,
  topFaculty: { name: 'Fakultas Teknik', emissionKg: 218.4, sharePercent: 17 },
  topFaculties: [
    { name: 'MIPA', emissionKg: 186.2 },
    { name: 'Teknik', emissionKg: 164.8 },
    { name: 'ISIP', emissionKg: 142.5 },
  ],
  last5Hours: [
    { hour: '09:00', emissionKg: 96.4 },
    { hour: '10:00', emissionKg: 134.2 },
    { hour: '11:00', emissionKg: 178.6 },
    { hour: '12:00', emissionKg: 210.8 },
    { hour: '13:00', emissionKg: 160.4 },
  ],
  last5HoursTotalKg: 780.4,
  facultyDistribution: [
    { name: 'Teknik', emissionKg: 218.4 },
    { name: 'MIPA', emissionKg: 186.2 },
    { name: 'Bisnis', emissionKg: 164.8 },
    { name: 'Hukum', emissionKg: 118.7 },
    { name: 'Pertanian', emissionKg: 96.4 },
    { name: 'Kedokteran Gigi', emissionKg: 81.2 },
    { name: 'ISIP', emissionKg: 142.5 },
  ],
  facultyDistributionTotalKg: 1008.7,
  last7Days: [
    { day: 'Sen 13', emissionKg: 1180.4 },
    { day: 'Rab 14', emissionKg: 1246.8 },
    { day: 'Kam 15', emissionKg: 1092.3 },
    { day: 'Jum 16', emissionKg: 1318.6 },
    { day: 'Sab 17', emissionKg: 842.1 },
    { day: 'Min 18', emissionKg: 726.5 },
    { day: 'Sen 19', emissionKg: 1819.7 },
  ],
  last7DaysTotalKg: 8226.4,
  peakHours: [
    { hour: '00', trips: 12 },
    { hour: '03', trips: 4 },
    { hour: '06', trips: 148 },
    { hour: '09', trips: 386 },
    { hour: '12', trips: 412 },
    { hour: '18', trips: 264 },
    { hour: '21', trips: 58 },
  ],
  recentTrips: [
    { id: 't1', time: '13.34', faculty: 'Umum', distanceKm: 8.4, emissionKg: 1.92, label: 'Unpad' },
    { id: 't2', time: '13.31', faculty: 'MIPA', distanceKm: 5.1, emissionKg: 1.16, label: 'Unpad' },
    { id: 't3', time: '13.28', faculty: 'Ekonomi', distanceKm: 12.7, emissionKg: 2.91, label: 'Pribadi' },
    { id: 't4', time: '13.24', faculty: 'Teknik', distanceKm: 6.2, emissionKg: 1.44, label: 'Unpad' },
    { id: 't5', time: '13.22', faculty: 'Hukum', distanceKm: 3.6, emissionKg: 0.82, label: 'Pribadi' },
  ],
};

export type Trip = {
  id: string;
  /** Label tanggal siap tampil, mis. "Senin, 20 Okt 2026". */
  dateLabel: string;
  /** Jam mulai, mis. "13.34". */
  time: string;
  faculty: string;
  distanceKm: number;
  emissionKg: number;
  label: TripLabel;
};

const tripDates = ['Senin, 20 Okt 2026', 'Minggu, 19 Okt 2026', 'Sabtu, 18 Okt 2026'];
const tripFaculties = ['Teknik', 'MIPA', 'Ekonomi', 'Hukum', 'Pertanian', 'ISIP', 'Kedokteran Gigi', 'Bisnis'];
const tripTimes = [
  '13.34',
  '13.31',
  '13.28',
  '13.24',
  '13.22',
  '12.58',
  '12.41',
  '12.05',
  '11.47',
  '11.12',
  '10.38',
  '09.55',
];

// shortcut: faktor emisi kasar untuk data contoh; ganti dengan koefisien kendaraan aktif (FR-011).
const MOCK_EMISSION_FACTOR = 0.2286;

export const mockTrips: Trip[] = Array.from({ length: 24 }, (_, index): Trip => {
  const distanceKm = Math.round((3.6 + ((index * 1.73) % 11)) * 10) / 10;
  return {
    id: `trip-${index + 1}`,
    dateLabel: tripDates[Math.floor(index / 8) % tripDates.length],
    time: tripTimes[index % tripTimes.length],
    faculty: tripFaculties[index % tripFaculties.length],
    distanceKm,
    emissionKg: Math.round(distanceKm * MOCK_EMISSION_FACTOR * 100) / 100,
    label: index % 4 === 0 ? 'Pribadi' : 'Unpad',
  };
});
