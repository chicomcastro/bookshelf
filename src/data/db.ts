import Dexie, { type Table } from 'dexie';
import type { AppSettings, Book, Character, Note } from './types';

export const SCHEMA_VERSION = 1;

class BookshelfDB extends Dexie {
  books!: Table<Book, string>;
  notes!: Table<Note, string>;
  characters!: Table<Character, string>;
  settings!: Table<AppSettings, string>;

  constructor() {
    super('bookshelf');
    this.version(1).stores({
      books: 'id, status, isFavorite, updatedAt, title',
      notes: 'id, bookId, type, updatedAt',
      characters: 'id, bookId',
      settings: 'id',
    });
  }
}

export const db = new BookshelfDB();

export const uid = (): string =>
  globalThis.crypto?.randomUUID?.() ??
  `id-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e9).toString(36)}`;

export const now = (): string => new Date().toISOString();
