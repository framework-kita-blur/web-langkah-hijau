/** Token warna & font. Disalin dari `mobile-langkah-hijau/src/constants/brand.ts` agar web dan mobile seragam. */
export const brand = {
  primary: '#266210',
  primaryDark: '#063B00',
  lime: '#90B800',
  yellow: '#E1E100',
  cream: '#F9FBF3',
  softGreen: '#E8EFD5',
  white: '#FFFFFF',
  border: '#E5E5E5',
  gray: '#737373',
  grayDark: '#4B5563',
  text: '#1F2937',
  black: '#0A0A0A',
  danger: '#D33C33',
  dangerSoft: '#F9E6E3',
} as const;

/** Urutan warna untuk seri grafik (Recharts). */
export const chartColors = [brand.primary, brand.lime, brand.yellow, brand.primaryDark, brand.gray] as const;
