import Dexie, { type Table } from 'dexie';
import type { AppSettings, Book, Character, Collection, Note } from './types';

export const SCHEMA_VERSION = 2;

export interface CachedCover {
  url: string;
  blob: Blob;
  savedAt: string;
}

class BookshelfDB extends Dexie {
  books!: Table<Book, string>;
  notes!: Table<Note, string>;
  characters!: Table<Character, string>;
  collections!: Table<Collection, string>;
  settings!: Table<AppSettings, string>;
  covers!: Table<CachedCover, string>;

  constructor() {
    super('bookshelf');
    this.version(1).stores({
      books: 'id, status, isFavorite, updatedAt, title',
      notes: 'id, bookId, type, updatedAt',
      characters: 'id, bookId',
      settings: 'id',
    });
    // v2: coleções/TBR temáticos (ADR-0017) + índice olWorkId
    // (necessário para findByWorkId; sem ele a deduplicação ao adicionar quebrava)
    this.version(2).stores({
      books: 'id, status, isFavorite, updatedAt, title, olWorkId',
      collections: 'id, updatedAt',
    });
    // v3: cache local de capas como blob (ADR-0018) — Open Library responde 302
    // sem max-age e via outro host, então o cache HTTP/SW não segura.
    this.version(3).stores({
      covers: 'url, savedAt',
    });
  }
}

export const db = new BookshelfDB();

export const uid = (): string =>
  globalThis.crypto?.randomUUID?.() ??
  `id-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e9).toString(36)}`;

export const now = (): string => new Date().toISOString();
