import { addBook, addNote } from './repositories';
import { db } from './db';
import type { NewBookInput } from './repositories';

// Estante de exemplo para a primeira experiência (opcional, via Ajustes / empty state).
const SAMPLES: Array<NewBookInput & { _review?: string }> = [
  {
    title: 'Fourth Wing',
    authors: ['Rebecca Yarros'],
    coverUrl: 'https://covers.openlibrary.org/b/id/14315175-M.jpg',
    publishedYear: 2023,
    status: 'read',
    rating: 5,
    spice: 4,
    tropes: ['enemies-to-lovers', 'slow-burn', 'chosen-one'],
    moods: ['addictive', 'butterflies'],
    isFavorite: true,
    _review: 'Violet e Xaden viveram na minha cabeça por uma semana. Os dragões? Obcecada.',
  },
  {
    title: 'A Court of Thorns and Roses',
    authors: ['Sarah J. Maas'],
    coverUrl: 'https://covers.openlibrary.org/b/id/8231856-M.jpg',
    publishedYear: 2015,
    status: 'read',
    rating: 4.5,
    spice: 3,
    tropes: ['forbidden-love', 'morally-grey', 'found-family'],
    moods: ['book-hangover'],
  },
  {
    title: 'The Love Hypothesis',
    authors: ['Ali Hazelwood'],
    coverUrl: 'https://covers.openlibrary.org/b/id/12646537-M.jpg',
    publishedYear: 2021,
    status: 'reading',
    spice: 2,
    tropes: ['fake-dating', 'grumpy-sunshine'],
    moods: ['cozy', 'butterflies'],
  },
  {
    title: 'Iron Flame',
    authors: ['Rebecca Yarros'],
    coverUrl: 'https://covers.openlibrary.org/b/id/14483823-M.jpg',
    publishedYear: 2023,
    status: 'want_to_read',
    tropes: ['enemies-to-lovers'],
    moods: [],
  },
  {
    title: 'Haunting Adeline',
    authors: ['H. D. Carlton'],
    coverUrl: 'https://covers.openlibrary.org/b/id/13219371-M.jpg',
    publishedYear: 2021,
    status: 'want_to_read',
    tropes: ['morally-grey'],
    moods: ['spicy'],
  },
];

export async function seedSampleShelf(): Promise<void> {
  for (const { _review, ...input } of SAMPLES) {
    const book = await addBook(input);
    if (_review) {
      await addNote(book.id, { type: 'review', body: _review });
    }
  }
}

export async function isShelfEmpty(): Promise<boolean> {
  return (await db.books.count()) === 0;
}
