import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import { Plus, Share2, Sparkles } from 'lucide-react';
import { db } from '../data/db';
import { seedSampleShelf } from '../data/seed';
import type { Book, ReadingStatus } from '../data/types';
import { Page } from '../components/Page';
import { BookCard } from '../components/BookCard';
import { ShelfCollage } from '../components/ShelfCollage';
import { greetingKey } from '../lib/utils';
import { useToast } from '../store/toast';

type Filter = 'all' | ReadingStatus | 'favorites';
type Sort = 'recent' | 'title' | 'rating';

const FILTERS: Filter[] = ['all', 'reading', 'want_to_read', 'read', 'favorites'];

export function ShelfPage() {
  const { t } = useTranslation();
  const show = useToast((s) => s.show);
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState<Sort>('recent');
  const [collage, setCollage] = useState(false);

  const books = useLiveQuery(() => db.books.toArray(), [], undefined as Book[] | undefined);

  const filtered = useMemo(() => {
    if (!books) return undefined;
    let list = books;
    if (filter === 'favorites') list = list.filter((b) => b.isFavorite);
    else if (filter !== 'all') list = list.filter((b) => b.status === filter);
    const sorted = [...list];
    if (sort === 'recent') sorted.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    if (sort === 'title') sorted.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'rating') sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return sorted;
  }, [books, filter, sort]);

  const isEmpty = books?.length === 0;

  return (
    <Page>
      <header className="flex items-start justify-between px-5 pt-6">
        <div>
          <p className="text-sm text-ink-muted">{t(`greeting.${greetingKey()}`)}</p>
          <h1 className="mt-0.5 text-3xl font-semibold text-ink">{t('shelf.title')}</h1>
        </div>
        {!isEmpty && (
          <button
            onClick={() => setCollage(true)}
            className="mt-1 rounded-full bg-surface p-2.5 active:scale-90"
            aria-label={t('share.collageTitle')}
          >
            <Share2 size={20} className="text-ink-soft" />
          </button>
        )}
      </header>

      {isEmpty ? (
        <EmptyShelf onSample={async () => { await seedSampleShelf(); show(t('search.added')); }} />
      ) : (
        <>
          <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto px-5">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={
                  'whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-all ' +
                  (filter === f ? 'bg-gold text-base' : 'bg-surface text-ink-soft')
                }
              >
                {f === 'all'
                  ? t('shelf.all')
                  : f === 'favorites'
                    ? t('shelf.favorites')
                    : t(`status.${f}`)}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between px-5">
            <span className="text-xs text-ink-muted">
              {filtered ? t('shelf.count', { count: filtered.length }) : ''}
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-lg bg-surface px-2 py-1 text-xs text-ink-soft"
            >
              <option value="recent">{t('shelf.sort.recent')}</option>
              <option value="title">{t('shelf.sort.title')}</option>
              <option value="rating">{t('shelf.sort.rating')}</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3 px-5 py-4">
            {filtered?.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>
        </>
      )}

      <Link
        to="/search"
        className="fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-base shadow-glow transition-transform active:scale-90"
        aria-label={t('nav.search')}
      >
        <Plus size={26} />
      </Link>

      {collage && books && <ShelfCollage books={books} onClose={() => setCollage(false)} />}
    </Page>
  );
}

function EmptyShelf({ onSample }: { onSample: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center px-8 pt-24 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-surface">
        <Sparkles size={34} className="text-gold" />
      </div>
      <h2 className="text-xl font-semibold text-ink">{t('shelf.empty.title')}</h2>
      <p className="mt-2 text-sm text-ink-muted">{t('shelf.empty.subtitle')}</p>
      <Link
        to="/search"
        className="mt-7 rounded-full bg-gold px-6 py-3 font-medium text-base shadow-glow"
      >
        {t('shelf.empty.cta')}
      </Link>
      <button onClick={onSample} className="mt-3 text-sm text-ink-soft underline-offset-4 hover:underline">
        {t('shelf.empty.sample')}
      </button>
    </div>
  );
}
