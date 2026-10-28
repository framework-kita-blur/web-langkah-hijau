# web-langkah-hijau

Dashboard web **Langkah Hijau** — pemantau emisi karbon mobilitas kampus untuk pihak manajemen (Sarpras/K3L).
Dibangun dengan **React + TypeScript + Vite**, grafik memakai **Recharts**.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
```

## Skrip

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | Server pengembangan (HMR) |
| `npm run build` | Typecheck lalu build produksi ke `dist/` |
| `npm run preview` | Pratinjau hasil build |
| `npm run typecheck` | Cek tipe saja (`tsc --noEmit`) |

## Supabase (opsional)

Salin `.env.example` menjadi `.env`, lalu isi:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Pakai **anon key saja** — jangan pernah menaruh `service_role` key di frontend. Selama keduanya
kosong, aplikasi berjalan dengan **data mock** (`src/data/mock.ts`) sehingga UI bisa dilihat tanpa backend.

## Struktur

```
src/
├── pages/        LoginPage, DashboardPage, TripsPage
├── components/   AppHeader, Card, Button, TextField, ikon
├── services/     akses data (placeholder mock → Supabase)
├── providers/    AuthProvider (sesi)
├── data/mock.ts  data contoh
└── theme.ts      token warna/font (sama dengan aplikasi mobile)
```

## Catatan

- Warna & font mengikuti brand aplikasi mobile (`mobile-langkah-hijau/src/constants/brand.ts`).
- Data masih mock. Agregasi Supabase (RPC `dashboard_summary`) dan kueri `vehicle_activity`
  belum dibuat — lihat `TODO` di `src/services/`.
- Login hanya untuk role `Web` (manajemen); role `Mobile` ditolak.
