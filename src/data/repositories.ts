import { db, now, uid } from './db';
import type { Book, Character, Note, ReadingStatus } from './types';

// --- Books ---

export type NewBookInput = Omit<
  Book,
  'id' | 'createdAt' | 'updatedAt' | 'tropes' | 'moods' | 'categories' | 'isFavorite'
> &
  Partial<Pick<Book, 'tropes' | 'moods' | 'categories' | 'isFavorite'>>;

export async function addBook(input: NewBookInput): Promise<Book> {
  const ts = now();
  const book: Book = {
    id: uid(),
    tropes: [],
    moods: [],
    categories: [],
    isFavorite: false,
    ...input,
    createdAt: ts,
    updatedAt: ts,
  };
  if (book.status === 'reading' && !book.startedAt) book.startedAt = ts;
  if (book.status === 'read' && !book.finishedAt) book.finishedAt = ts;
  await db.books.add(book);
  return book;
}

export async function updateBook(id: string, patch: Partial<Book>): Promise<void> {
  await db.books.update(id, { ...patch, updatedAt: now() });
}

export async function setStatus(id: string, status: ReadingStatus): Promise<void> {
  const patch: Partial<Book> = { status };
  const ts = now();
  if (status === 'reading') patch.startedAt = patch.startedAt ?? ts;
  if (status === 'read') patch.finishedAt = ts;
  await updateBook(id, patch);
}

export async function deleteBook(id: string): Promise<void> {
  await db.transaction('rw', db.books, db.notes, db.characters, async () => {
    await db.books.delete(id);
    await db.notes.where('bookId').equals(id).delete();
    await db.characters.where('bookId').equals(id).delete();
  });
}

export async function findByWorkId(olWorkId?: string): Promise<Book | undefined> {
  if (!olWorkId) return undefined;
  return db.books.where('olWorkId').equals(olWorkId).first();
}

// --- Notes ---

export async function addNote(
  bookId: string,
  data: Pick<Note, 'type' | 'body'> & Partial<Pick<Note, 'page' | 'isSpoiler'>>
): Promise<Note> {
  const ts = now();
  const note: Note = {
    id: uid(),
    bookId,
    isSpoiler: false,
    ...data,
    createdAt: ts,
    updatedAt: ts,
  };
  await db.notes.add(note);
  return note;
}

export async function updateNote(id: string, patch: Partial<Note>): Promise<void> {
  await db.notes.update(id, { ...patch, updatedAt: now() });
}

export const deleteNote = (id: string): Promise<void> => db.notes.delete(id);

// --- Characters ---

export async function addCharacter(
  bookId: string,
  data: Pick<Character, 'name'> & Partial<Pick<Character, 'role' | 'isBookBoyfriend' | 'note'>>
): Promise<Character> {
  const ts = now();
  const character: Character = {
    id: uid(),
    bookId,
    isBookBoyfriend: false,
    ...data,
    createdAt: ts,
    updatedAt: ts,
  };
  await db.characters.add(character);
  return character;
}

export const deleteCharacter = (id: string): Promise<void> => db.characters.delete(id);
