import { db, SCHEMA_VERSION } from './db';
import type { BackupFile } from './types';

export async function exportBackup(): Promise<BackupFile> {
  const [books, notes, characters, settings] = await Promise.all([
    db.books.toArray(),
    db.notes.toArray(),
    db.characters.toArray(),
    db.settings.get('app'),
  ]);
  return {
    schemaVersion: SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    books,
    notes,
    characters,
    settings: settings ?? undefined,
  };
}

export function downloadBackup(backup: BackupFile): void {
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = backup.exportedAt.slice(0, 10);
  a.href = url;
  a.download = `bookshelf-backup-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function importBackup(file: File, mode: 'merge' | 'replace'): Promise<void> {
  const text = await file.text();
  const data = JSON.parse(text) as BackupFile;
  if (typeof data.schemaVersion !== 'number' || !Array.isArray(data.books)) {
    throw new Error('Arquivo de backup inválido.');
  }
  await db.transaction('rw', db.books, db.notes, db.characters, async () => {
    if (mode === 'replace') {
      await Promise.all([db.books.clear(), db.notes.clear(), db.characters.clear()]);
    }
    await db.books.bulkPut(data.books);
    if (Array.isArray(data.notes)) await db.notes.bulkPut(data.notes);
    if (Array.isArray(data.characters)) await db.characters.bulkPut(data.characters);
  });
}

export async function wipeAll(): Promise<void> {
  await db.transaction('rw', db.books, db.notes, db.characters, async () => {
    await Promise.all([db.books.clear(), db.notes.clear(), db.characters.clear()]);
  });
}
