import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import { ChevronLeft, Heart, Pencil, Share2, Trash2 } from 'lucide-react';
import { db } from '../data/db';
import { MOODS, TROPES } from '../data/domain';
import {
  deleteBook,
  setStatus,
  updateBook,
} from '../data/repositories';
import type { Book, ReadingStatus } from '../data/types';
import { Page } from '../components/Page';
import { BookCover } from '../components/BookCover';
import { RatingStars } from '../components/RatingStars';
import { SpiceMeter } from '../components/SpiceMeter';
import { TagPicker } from '../components/TagPicker';
import { StatusSelect } from '../components/StatusSelect';
import { ReviewEditor } from '../components/ReviewEditor';
import { NotesSection } from '../components/NotesSection';
import { CharactersSection } from '../components/CharactersSection';
import { CollectionPicker } from '../components/CollectionPicker';
import { ShareCard } from '../components/ShareCard';
import { BookFormSheet } from '../components/BookFormSheet';
import { useToast } from '../store/toast';
import { formatDate } from '../lib/utils';
import { celebrate, tap } from '../lib/haptics';
import type { Locale } from '../data/types';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-white/5 px-5 py-5">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">{title}</h2>
      {children}
    </section>
  );
}

export function BookPage() {
  const { id = '' } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const show = useToast((s) => s.show);
  const [sharing, setSharing] = useState(false);
  const [editing, setEditing] = useState(false);

  const book = useLiveQuery(() => db.books.get(id), [id], undefined as Book | undefined | null);

  if (book === undefined) return <Page><div className="p-10" /></Page>;
  if (book === null) {
    return (
      <Page>
        <div className="p-10 text-center text-ink-muted">404</div>
      </Page>
    );
  }

  const toggle = (field: 'tropes' | 'moods', tagId: string) => {
    const set = new Set(book[field]);
    set.has(tagId) ? set.delete(tagId) : set.add(tagId);
    void updateBook(book.id, { [field]: [...set] });
  };

  const locale = i18n.language as Locale;

  return (
    <Page>
      <header className="flex items-center justify-between px-3 pt-5">
        <button onClick={() => navigate(-1)} className="rounded-full p-2 active:scale-90" aria-label={t('common.back')}>
          <ChevronLeft size={24} className="text-ink" />
        </button>
        <div className="flex gap-1">
          <button
            onClick={() => {
              tap();
              void updateBook(book.id, { isFavorite: !book.isFavorite });
            }}
            className="rounded-full p-2 active:scale-90"
            aria-label="favorite"
          >
            <Heart size={22} className={book.isFavorite ? 'fill-rose text-rose' : 'text-ink-soft'} />
          </button>
          <button onClick={() => setEditing(true)} className="rounded-full p-2 active:scale-90" aria-label={t('book.edit')}>
            <Pencil size={20} className="text-ink-soft" />
          </button>
          <button onClick={() => setSharing(true)} className="rounded-full p-2 active:scale-90" aria-label={t('book.share')}>
            <Share2 size={22} className="text-ink-soft" />
          </button>
        </div>
      </header>

      <div className="flex gap-4 px-5 pt-2">
        <BookCover title={book.title} coverUrl={book.coverUrl} className="w-28 shrink-0 shadow-soft" />
        <div className="flex flex-col pt-1">
          <h1 className="text-2xl font-semibold leading-tight text-ink">{book.title}</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {t('book.byline', { authors: book.authors.join(', ') || '—' })}
          </p>
          {book.publishedYear && <p className="mt-0.5 text-xs text-ink-muted">{book.publishedYear}</p>}
          <div className="mt-3">
            <StatusSelect
              value={book.status}
              onChange={(s: ReadingStatus) => {
                s === 'read' ? celebrate() : tap();
                void setStatus(book.id, s);
              }}
            />
          </div>
        </div>
      </div>

      <Section title={t('book.rating')}>
        <RatingStars value={book.rating ?? 0} onChange={(v) => updateBook(book.id, { rating: v })} />
      </Section>

      <Section title={t('book.spice')}>
        <SpiceMeter value={book.spice ?? 0} onChange={(v) => updateBook(book.id, { spice: v })} />
      </Section>

      <Section title={t('book.moods')}>
        <TagPicker options={MOODS} selected={book.moods} onToggle={(tag) => toggle('moods', tag)} />
      </Section>

      <Section title={t('book.tropes')}>
        <TagPicker options={TROPES} selected={book.tropes} onToggle={(tag) => toggle('tropes', tag)} />
      </Section>

      <Section title={t('book.review')}>
        <ReviewEditor bookId={book.id} />
      </Section>

      <Section title={t('book.characters')}>
        <CharactersSection bookId={book.id} />
      </Section>

      <Section title={t('collections.title')}>
        <CollectionPicker bookId={book.id} />
      </Section>

      <Section title={t('book.notes')}>
        <NotesSection bookId={book.id} />
      </Section>

      {(book.startedAt || book.finishedAt) && (
        <Section title="">
          <div className="flex gap-6 text-xs text-ink-muted">
            {book.startedAt && <span>{t('book.started')}: {formatDate(book.startedAt, locale)}</span>}
            {book.finishedAt && <span>{t('book.finished')}: {formatDate(book.finishedAt, locale)}</span>}
          </div>
        </Section>
      )}

      <div className="px-5 py-8">
        <button
          onClick={() => {
            if (confirm(t('book.removeConfirm'))) {
              void deleteBook(book.id).then(() => {
                show(t('common.delete'));
                navigate('/');
              });
            }
          }}
          className="flex items-center gap-2 text-sm text-danger/80"
        >
          <Trash2 size={16} /> {t('book.remove')}
        </button>
      </div>

      {sharing && <ShareCard book={book} onClose={() => setSharing(false)} />}
      {editing && (
        <BookFormSheet
          mode="edit"
          book={book}
          onClose={() => setEditing(false)}
          onSaved={(msg) => show(msg ?? t('book.saved'))}
        />
      )}
    </Page>
  );
}
