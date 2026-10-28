import { useEffect, useMemo, useState } from 'react';

import { AppHeader } from '@/components/AppHeader';
import { Card } from '@/components/Card';
import type { Trip, TripLabel } from '@/data/mock';
import { getTrips } from '@/services/trip-service';
import './TripsPage.css';

const nf1 = new Intl.NumberFormat('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const PAGE_SIZE = 10;

type Filter = 'Semua' | TripLabel;
const filters: Filter[] = ['Semua', 'Unpad', 'Pribadi'];

export function TripsPage() {
  const [trips, setTrips] = useState<Trip[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('Semua');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let active = true;
    getTrips()
      .then((data) => {
        if (active) setTrips(data);
      })
      .catch((err: unknown) => {
        if (active) setError(err instanceof Error ? err.message : 'Gagal memuat data perjalanan.');
      });
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(
    () => (trips ?? []).filter((trip) => filter === 'Semua' || trip.label === filter),
    [trips, filter],
  );
  const totalEmissionKg = useMemo(() => filtered.reduce((sum, trip) => sum + trip.emissionKg, 0), [filtered]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const rows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const changeFilter = (next: Filter) => {
    setFilter(next);
    setPage(1);
  };

  return (
    <div className="trips">
      <AppHeader />

      <main className="trips__main">
        <div className="trips__heading">
          <div>
            <h1 className="trips__title">Perjalanan</h1>
            <p className="trips__subtitle">Semua perjalanan yang tercatat dari aktivitas berkendara mahasiswa</p>
          </div>
          <div className="trips__filters" role="group" aria-label="Filter label perjalanan">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                className={`trips__filter${item === filter ? ' is-active' : ''}`}
                aria-pressed={item === filter}
                onClick={() => changeFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {error ? (
          <p className="trips__state" role="alert">
            {error}
          </p>
        ) : null}
        {!error && !trips ? (
          <p className="trips__state" role="status" aria-live="polite">
            Memuat…
          </p>
        ) : null}

        {trips ? (
          <Card className="trips__card">
            <div className="trips__summary">
              <span>{filtered.length} perjalanan</span>
              <span>{nf1.format(totalEmissionKg)} kg CO₂e</span>
            </div>

            {rows.length === 0 ? (
              <p className="trips__empty">Belum ada mobilitas yang tercatat</p>
            ) : (
              <div className="trips__table-wrap">
                <table className="trips-table">
                  <thead>
                    <tr>
                      <th scope="col">Waktu</th>
                      <th scope="col">Fakultas</th>
                      <th scope="col">Jarak</th>
                      <th scope="col">Emisi</th>
                      <th scope="col">Label</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((trip) => (
                      <tr key={trip.id}>
                        <td>
                          <span className="trips-table__time">{trip.time}</span>
                          <span className="trips-table__date">{trip.dateLabel}</span>
                        </td>
                        <td>{trip.faculty}</td>
                        <td>{nf1.format(trip.distanceKm)} km</td>
                        <td className="trips-table__strong">{nf2.format(trip.emissionKg)} kg</td>
                        <td>
                          <span className="trips-badge">{trip.label}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {filtered.length > PAGE_SIZE ? (
              <div className="trips__pager">
                <button
                  type="button"
                  className="trips__page-btn"
                  onClick={() => setPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  Sebelumnya
                </button>
                <span className="trips__page-info">
                  Halaman {currentPage} dari {totalPages}
                </span>
                <button
                  type="button"
                  className="trips__page-btn"
                  onClick={() => setPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                >
                  Berikutnya
                </button>
              </div>
            ) : null}
          </Card>
        ) : null}
      </main>
    </div>
  );
}
