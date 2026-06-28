// Client da Google Books (ADR-0020). Só ativo quando há API key injetada no build
// (import.meta.env.VITE_GOOGLE_BOOKS_KEY). Sem key, é no-op e a busca usa só a
// Open Library — então o app funciona hoje e "liga" o Google quando a key existir.
import type { SearchResult } from './search';

const KEY = (import.meta.env.VITE_GOOGLE_BOOKS_KEY ?? '').trim();
export const hasGoogleKey = KEY.length > 0;

function langRestrict(locale: string): string | undefined {
  const l = locale.toLowerCase();
  if (l.startsWith('pt')) return 'pt';
  if (l.startsWith('en')) return 'en';
  return undefined;
}

interface GBVolume {
  id: string;
  volumeInfo?: {
    title?: string;
    subtitle?: string;
    authors?: string[];
    publishedDate?: string;
    categories?: string[];
    imageLinks?: { thumbnail?: string; smallThumbnail?: string };
  };
}

function cover(vi: NonNullable<GBVolume['volumeInfo']>): string | undefined {
  const raw = vi.imageLinks?.thumbnail ?? vi.imageLinks?.smallThumbnail;
  if (!raw) return undefined;
  // https + remove o "dobrado" (edge=curl) para uma capa limpa
  return raw.replace(/^http:/, 'https:').replace('&edge=curl', '');
}

export async function searchGoogleBooks(
  query: string,
  locale = 'pt-BR',
  signal?: AbortSignal
): Promise<SearchResult[]> {
  if (!hasGoogleKey) return [];

  const url = new URL('https://www.googleapis.com/books/v1/volumes');
  url.searchParams.set('q', query);
  url.searchParams.set('maxResults', '20');
  url.searchParams.set('printType', 'books');
  url.searchParams.set('country', locale.toLowerCase().startsWith('pt') ? 'BR' : 'US');
  const lr = langRestrict(locale);
  if (lr) url.searchParams.set('langRestrict', lr);
  url.searchParams.set('key', KEY);

  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Google Books: ${res.status}`);
  const data: { items?: GBVolume[] } = await res.json();

  return (data.items ?? []).map((v) => {
    const vi = v.volumeInfo ?? {};
    const year = vi.publishedDate ? Number(vi.publishedDate.slice(0, 4)) : undefined;
    return {
      id: `gb:${v.id}`,
      title: vi.subtitle ? `${vi.title}: ${vi.subtitle}` : (vi.title ?? '—'),
      authors: vi.authors ?? [],
      coverUrl: cover(vi),
      publishedYear: Number.isFinite(year) ? year : undefined,
      categories: (vi.categories ?? []).slice(0, 6),
    };
  });
}
