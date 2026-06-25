// Modelo de dados local-first (ver docs/03-arquitetura.md e ADR-0007).

export type ReadingStatus = 'want_to_read' | 'reading' | 'read';

export interface Book {
  id: string;
  olWorkId?: string;
  title: string;
  authors: string[];
  coverUrl?: string;
  pageCount?: number;
  publishedYear?: number;
  categories: string[];
  status: ReadingStatus;
  rating?: number; // 0..5 (meias permitidas)
  spice?: number; // 0..5 (ADR-0007)
  tropes: string[]; // ids de trope
  moods: string[]; // ids de mood
  isFavorite: boolean;
  startedAt?: string;
  finishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  bookId: string;
  type: 'review' | 'note' | 'quote';
  body: string;
  page?: number;
  isSpoiler: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Character {
  id: string;
  bookId: string;
  name: string;
  role?: string;
  isBookBoyfriend: boolean;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export type ThemePref = 'dark' | 'light' | 'system';
export type Locale = 'pt-BR' | 'en';

export interface AppSettings {
  id: 'app';
  locale: Locale;
  theme: ThemePref;
  schemaVersion: number;
}

export interface BackupFile {
  schemaVersion: number;
  exportedAt: string;
  books: Book[];
  notes: Note[];
  characters: Character[];
  settings?: Partial<AppSettings>;
}
