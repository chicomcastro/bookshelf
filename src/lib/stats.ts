import type { Book } from '../data/types';

export interface ReadingStats {
  total: number;
  read: number;
  reading: number;
  wantToRead: number;
  readThisYear: number;
  pagesThisYear: number;
  avgRating: number | null;
  avgSpice: number | null;
  topTropes: Array<{ id: string; count: number }>;
  topMoods: Array<{ id: string; count: number }>;
}

function topTags(books: Book[], field: 'tropes' | 'moods', limit = 5) {
  const counts = new Map<string, number>();
  for (const b of books) for (const id of b[field]) counts.set(id, (counts.get(id) ?? 0) + 1);
  return [...counts.entries()]
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function computeStats(books: Book[], year = new Date().getFullYear()): ReadingStats {
  const read = books.filter((b) => b.status === 'read');
  const finishedThisYear = read.filter(
    (b) => b.finishedAt && new Date(b.finishedAt).getFullYear() === year
  );
  const rated = read.filter((b) => typeof b.rating === 'number');
  const spiced = books.filter((b) => typeof b.spice === 'number' && b.spice > 0);

  return {
    total: books.length,
    read: read.length,
    reading: books.filter((b) => b.status === 'reading').length,
    wantToRead: books.filter((b) => b.status === 'want_to_read').length,
    readThisYear: finishedThisYear.length,
    pagesThisYear: finishedThisYear.reduce((sum, b) => sum + (b.pageCount ?? 0), 0),
    avgRating: rated.length
      ? rated.reduce((s, b) => s + (b.rating ?? 0), 0) / rated.length
      : null,
    avgSpice: spiced.length
      ? spiced.reduce((s, b) => s + (b.spice ?? 0), 0) / spiced.length
      : null,
    topTropes: topTags(books, 'tropes'),
    topMoods: topTags(books, 'moods'),
  };
}
