// Camada de busca que orquestra provedores (ADR-0020).
// Google Books é o principal QUANDO há API key no build; a Open Library é sempre
// a base/fallback (keyless). Sem key, o comportamento é exatamente a Open Library.

import { searchOpenLibrary } from './openLibrary';
import { hasGoogleKey, searchGoogleBooks } from './googleBooks';

export interface SearchResult {
  id: string; // id qualificado por fonte: "OL...W" (Open Library) ou "gb:<id>" (Google)
  title: string;
  authors: string[];
  coverUrl?: string;
  publishedYear?: number;
  categories: string[];
}

const norm = (s: string): string =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^a-z0-9]/g, '');

const dedupeKey = (r: SearchResult): string => `${norm(r.title)}|${norm(r.authors[0] ?? '')}`;

export async function searchBooks(
  query: string,
  locale = 'pt-BR',
  signal?: AbortSignal
): Promise<SearchResult[]> {
  const q = query.trim();
  if (!q) return [];

  // Provedores em ordem de prioridade. Google primeiro quando há key.
  const tasks: Array<Promise<SearchResult[]>> = [];
  if (hasGoogleKey) tasks.push(searchGoogleBooks(q, locale, signal).catch(() => []));
  tasks.push(searchOpenLibrary(q, locale, signal).catch(() => []));

  const groups = await Promise.all(tasks);

  // Mescla deduplicando por título+autor (mesma obra em fontes diferentes).
  const seen = new Set<string>();
  const out: SearchResult[] = [];
  for (const group of groups) {
    for (const r of group) {
      const key = dedupeKey(r);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(r);
    }
  }
  return out.slice(0, 24);
}
