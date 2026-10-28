import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';

import { AppHeader } from '@/components/AppHeader';
import { Card } from '@/components/Card';
import { SparkleIcon, TrendIcon } from '@/components/dashboard-icons';
import type { DashboardSummary } from '@/data/mock';
import { getDashboardSummary } from '@/services/dashboard-service';
import { brand, chartColors } from '@/theme';
import './DashboardPage.css';

const nf0 = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const axisTick = { fontSize: 10, fill: brand.grayDark } as const;
const tooltipStyle = { fontSize: 12, borderRadius: 4, border: `1px solid ${brand.border}` } as const;

function pct(value: number, max: number) {
  return `${max > 0 ? (value / max) * 100 : 0}%`;
}

function CardHead({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <div className="dash-card__head">
      <div className="dash-card__head-left">
        <h2 className="dash-card__title">{title}</h2>
        {subtitle ? <p className="dash-card__subtitle">{subtitle}</p> : null}
      </div>
      {right}
    </div>
  );
}

export function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getDashboardSummary()
      .then((data) => {
        if (active) setSummary(data);
      })
      .catch((err: unknown) => {
        if (active) setError(err instanceof Error ? err.message : 'Gagal memuat data dashboard.');
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="dash">
      <AppHeader />

      <main className="dash__main">
        <div className="dash__heading">
          <h1 className="dash__title">Ringkasan Emisi</h1>
          <p className="dash__subtitle">Pantau jejak karbon organisasi Anda hari ini</p>
        </div>

        {error ? <p className="dash__state" role="alert">{error}</p> : null}
        {!error && !summary ? (
          <p className="dash__state" role="status" aria-live="polite">
            Memuat…
          </p>
        ) : null}

        {summary ? <DashboardContent data={summary} /> : null}
      </main>
    </div>
  );
}

function DashboardContent({ data }: { data: DashboardSummary }) {
  const {
    totalEmissionKg,
    changePercent,
    distanceKm,
    tripCount,
    studentCount,
    topFaculty,
    topFaculties,
    last5Hours,
    last5HoursTotalKg,
    facultyDistribution,
    facultyDistributionTotalKg,
    last7Days,
    last7DaysTotalKg,
    peakHours,
    recentTrips,
  } = data;

  const lower = changePercent < 0;
  const rankMax = Math.max(topFaculty.emissionKg, ...topFaculties.map((f) => f.emissionKg));
  const ranks = [...topFaculties].sort((a, b) => b.emissionKg - a.emissionKg);
  const faculties = [...facultyDistribution].sort((a, b) => b.emissionKg - a.emissionKg);
  const facultyMax = Math.max(0, ...faculties.map((f) => f.emissionKg));

  return (
    <div className="dash__grid">
      <Card className="dash__card dash__card--a">
        <div className="dash-total">
          <div>
            <p className="dash-total__label">Total emisi hari ini</p>
            <p className="dash-total__value">
              <span className="dash-total__number">{nf1.format(totalEmissionKg)}</span>
              <span className="dash-total__unit">kg CO₂e</span>
            </p>
            <p className="dash-total__delta">
              <TrendIcon />
              {nf1.format(Math.abs(changePercent))}% lebih {lower ? 'rendah' : 'tinggi'} dari kemarin
            </p>
          </div>
          <div className="dash-total__spark">
            <div
              className="dash-total__spark-chart"
              role="img"
              aria-label="Tren emisi total (kg CO₂e) selama 7 hari terakhir"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={last7Days}>
                  <Line
                    type="monotone"
                    dataKey="emissionKg"
                    dot={false}
                    stroke={chartColors[3]}
                    strokeWidth={1.8}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <span className="dash-total__spark-caption">TREN 7 HARI</span>
          </div>
        </div>

        <div className="dash-stats">
          <div className="dash-stats__item">
            <span className="dash-stats__label">Jarak tempuh</span>
            <span className="dash-stats__value">{nf0.format(distanceKm)} km</span>
          </div>
          <div className="dash-stats__item">
            <span className="dash-stats__label">Perjalanan</span>
            <span className="dash-stats__value">{nf0.format(tripCount)}</span>
          </div>
          <div className="dash-stats__item">
            <span className="dash-stats__label">Mahasiswa</span>
            <span className="dash-stats__value">{nf0.format(studentCount)}</span>
          </div>
        </div>
      </Card>

      <Card className="dash__card dash__card--b">
        <div className="dash-card__head">
          <div className="dash-card__head-left">
            <h2 className="dash-card__title">Fakultas tertinggi</h2>
            <p className="dash-rank-name">{topFaculty.name}</p>
            <p className="dash-card__subtitle">
              {nf1.format(topFaculty.emissionKg)} kg CO₂e · {nf1.format(topFaculty.sharePercent)}% dari total
            </p>
          </div>
          <span className="dash-badge">TOP 3</span>
        </div>
        <div className="dash-ranks">
          {ranks.map((f) => (
            <div className="dash-rank" key={f.name}>
              <div className="dash-rank__row">
                <span>{f.name}</span>
                <span className="dash-rank__value">{nf1.format(f.emissionKg)}</span>
              </div>
              <div className="dash-track">
                <div className="dash-track__fill" style={{ width: pct(f.emissionKg, rankMax) }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="dash__card dash__card--c">
        <CardHead
          title="Emisi 5 jam terakhir"
          subtitle="kg CO₂e / jam"
          right={<span className="dash-card__total">{nf1.format(last5HoursTotalKg)} kg</span>}
        />
        <div className="dash-chart dash-chart--sm" role="img" aria-label="Grafik batang emisi (kg CO₂e) per jam, 5 jam terakhir">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={last5Hours}>
              <XAxis dataKey="hour" tick={axisTick} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(value) => `${nf1.format(Number(value))} kg CO₂e`} />
              <Bar dataKey="emissionKg" fill={chartColors[0]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="dash__card dash__card--d">
        <CardHead
          title="Sebaran emisi per fakultas"
          subtitle="kg CO₂e · periode hari ini"
          right={
            <span className="dash-card__note">
              {facultyDistribution.length} fakultas · {nf1.format(facultyDistributionTotalKg)} kg
            </span>
          }
        />
        <div className="dash-bars">
          {faculties.map((f) => (
            <div className="dash-bar" key={f.name}>
              <span className="dash-bar__name">{f.name}</span>
              <span className="dash-track dash-bar__track">
                <span className="dash-track__fill" style={{ width: pct(f.emissionKg, facultyMax) }} />
              </span>
              <span className="dash-bar__value">{nf1.format(f.emissionKg)}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="dash__card dash__card--e">
        <CardHead
          title="Emisi 7 hari terakhir"
          subtitle="Tren emisi harian"
          right={<span className="dash-card__total">{nf1.format(last7DaysTotalKg)} kg</span>}
        />
        <div className="dash-chart" role="img" aria-label="Tren emisi harian (kg CO₂e) 7 hari terakhir">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={last7Days}>
              <defs>
                <linearGradient id="dash-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColors[1]} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={chartColors[1]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke={brand.border} />
              <XAxis dataKey="day" tick={axisTick} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(value) => `${nf1.format(Number(value))} kg CO₂e`} />
              <Area
                type="monotone"
                dataKey="emissionKg"
                stroke={chartColors[3]}
                strokeWidth={2}
                fill="url(#dash-area)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="dash__card dash__card--f">
        <CardHead title="Distribusi jam sibuk" subtitle="Rata-rata perjalanan per jam · 7 hari terakhir" />
        <div className="dash-chart" role="img" aria-label="Rata-rata jumlah perjalanan per jam sibuk dalam 7 hari terakhir">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={peakHours}>
              <XAxis dataKey="hour" tick={axisTick} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(value) => `${nf0.format(Number(value))} perjalanan`} />
              <Bar dataKey="trips" fill={chartColors[1]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="dash__card dash__card--g">
        <CardHead
          title="Perjalanan terbaru"
          right={
            <Link className="dash-see-all" to="/perjalanan">
              Lihat semua
            </Link>
          }
        />
        {recentTrips.length === 0 ? (
          <p className="dash__empty">Belum ada mobilitas yang tercatat</p>
        ) : (
          <table className="dash-table">
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
              {recentTrips.map((trip) => (
                <tr key={trip.id}>
                  <td>{trip.time}</td>
                  <td>{trip.faculty}</td>
                  <td>{nf1.format(trip.distanceKm)} km</td>
                  <td className="dash-table__strong">{nf2.format(trip.emissionKg)} kg</td>
                  <td>
                    <span className="dash-badge">{trip.label}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <p className="dash-note">
        <SparkleIcon />
        <span>
          Emisi hari ini {nf1.format(Math.abs(changePercent))}% lebih {lower ? 'rendah' : 'tinggi'} dari kemarin —
          kontribusi terbesar dari {topFaculty.name}.
        </span>
      </p>
    </div>
  );
}
