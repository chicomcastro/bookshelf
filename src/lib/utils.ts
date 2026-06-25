import type { Locale } from '../data/types';

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

export function greetingKey(date = new Date()): 'morning' | 'afternoon' | 'evening' {
  const h = date.getHours();
  if (h < 12) return 'morning';
  if (h < 18) return 'afternoon';
  return 'evening';
}

// Paleta para capas sem imagem (sálvia, terracota, mostarda, rosa, índigo, creme).
const COVER_PALETTE = [
  ['#3b4a3f', '#6b8266'],
  ['#5a3a30', '#a9685a'],
  ['#5a4a22', '#c2a24b'],
  ['#5a2f3c', '#c98ca0'],
  ['#2f3a5a', '#7d8bc0'],
  ['#4a4438', '#b7a98c'],
];

export function coverGradient(seed: string): { from: string; to: string } {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  const [from, to] = COVER_PALETTE[Math.abs(hash) % COVER_PALETTE.length];
  return { from, to };
}

export function initials(title: string): string {
  return title
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

export function formatDate(iso: string | undefined, locale: Locale): string {
  if (!iso) return '';
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric' }).format(
    new Date(iso)
  );
}
