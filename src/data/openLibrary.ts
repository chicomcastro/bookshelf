// Client da Open Library (ADR-0003). Sem chave; debounce/cache na camada de UI.

export interface OLResult {
  olWorkId: string;
  title: string;
  authors: string[];
  coverUrl?: string;
  publishedYear?: number;
  categories: string[];
}

interface OLDoc {
  key: string; // "/works/OL12345W"
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  subject?: string[];
}

export const coverUrl = (coverId: number, size: 'S' | 'M' | 'L' = 'M'): string =>
  `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;

export async function searchBooks(query: string, signal?: AbortSignal): Promise<OLResult[]> {
  const q = query.trim();
  if (!q) return [];
  const url = new URL('https://openlibrary.org/search.json');
  url.searchParams.set('q', q);
  url.searchParams.set('limit', '20');
  url.searchParams.set('fields', 'key,title,author_name,cover_i,first_publish_year,subject');

  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Open Library: ${res.status}`);
  const data: { docs?: OLDoc[] } = await res.json();

  return (data.docs ?? []).map((d) => ({
    olWorkId: d.key.replace('/works/', ''),
    title: d.title,
    authors: d.author_name ?? [],
    coverUrl: d.cover_i ? coverUrl(d.cover_i, 'M') : undefined,
    publishedYear: d.first_publish_year,
    categories: (d.subject ?? []).slice(0, 6),
  }));
}
