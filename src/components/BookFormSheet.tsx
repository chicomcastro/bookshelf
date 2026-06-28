import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ImagePlus, Link2, Loader2, X } from 'lucide-react';
import { addBook, updateBook } from '../data/repositories';
import type { Book, ReadingStatus } from '../data/types';
import { BookCover } from './BookCover';
import { fileToCompressedDataUrl } from '../lib/image';
import { cx } from '../lib/utils';
import { tap } from '../lib/haptics';

interface Props {
  mode: 'create' | 'edit';
  book?: Book;
  prefillTitle?: string;
  onClose: () => void;
  onSaved?: (msg?: string) => void;
}

export function BookFormSheet({ mode, book, prefillTitle = '', onClose, onSaved }: Props) {
  const { t } = useTranslation();
  const fileRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(book?.title ?? prefillTitle);
  const [author, setAuthor] = useState(book?.authors.join(', ') ?? '');
  const [year, setYear] = useState(book?.publishedYear ? String(book.publishedYear) : '');
  const [coverUrl, setCoverUrl] = useState(book?.coverUrl ?? '');
  const [status, setStatus] = useState<ReadingStatus>(book?.status ?? 'want_to_read');
  const [showUrl, setShowUrl] = useState(false);
  const [processing, setProcessing] = useState(false);

  async function handleFile(file: File) {
    setProcessing(true);
    try {
      setCoverUrl(await fileToCompressedDataUrl(file));
    } catch {
      /* ignora arquivo inválido */
    } finally {
      setProcessing(false);
    }
  }

  async function handleSave() {
    if (!title.trim()) return;
    const authors = author.trim()
      ? author.split(',').map((a) => a.trim()).filter(Boolean)
      : [];
    const common = {
      title: title.trim(),
      authors,
      coverUrl: coverUrl.trim() || undefined,
      publishedYear: year.trim() ? Number(year) : undefined,
    };
    if (mode === 'edit' && book) {
      await updateBook(book.id, common);
    } else {
      await addBook({ ...common, status });
    }
    tap();
    onSaved?.(mode === 'edit' ? t('book.saved') : t('search.added'));
    onClose();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end bg-base/80 backdrop-blur-sm sm:items-center sm:justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-md overflow-auto rounded-t-3xl bg-elevated p-5 sm:rounded-3xl"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)' }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">
            {mode === 'edit' ? t('book.edit') : t('manual.title')}
          </h2>
          <button onClick={onClose} className="rounded-full bg-surface p-1.5" aria-label={t('common.close')}>
            <X size={18} className="text-ink" />
          </button>
        </div>

        <div className="flex gap-4">
          <div className="w-24 shrink-0">
            <BookCover title={title || '?'} coverUrl={coverUrl} />
            <button
              onClick={() => fileRef.current?.click()}
              className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg bg-surface py-1.5 text-[11px] text-ink-soft active:scale-95"
            >
              {processing ? <Loader2 size={12} className="animate-spin" /> : <ImagePlus size={12} />}
              {t('manual.uploadCover')}
            </button>
            <button
              onClick={() => setShowUrl((v) => !v)}
              className="mt-1 flex w-full items-center justify-center gap-1 text-[11px] text-ink-muted"
            >
              <Link2 size={11} /> {t('manual.useUrl')}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void handleFile(f);
                e.target.value = '';
              }}
            />
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <input
              autoFocus={mode === 'create'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('manual.titleField')}
              className="w-full rounded-xl bg-surface px-3 py-2.5 text-ink outline-none ring-gold/40 focus:ring-1"
            />
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder={t('manual.authorField')}
              className="w-full rounded-xl bg-surface px-3 py-2.5 text-sm text-ink outline-none ring-gold/40 focus:ring-1"
            />
            <input
              value={year}
              onChange={(e) => setYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
              inputMode="numeric"
              placeholder={t('manual.yearField')}
              className="w-full rounded-xl bg-surface px-3 py-2.5 text-sm text-ink outline-none ring-gold/40 focus:ring-1"
            />
            {showUrl && (
              <input
                value={coverUrl.startsWith('data:') ? '' : coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                placeholder={t('manual.coverField')}
                className="w-full rounded-xl bg-surface px-3 py-2.5 text-sm text-ink outline-none ring-gold/40 focus:ring-1"
              />
            )}
          </div>
        </div>

        {mode === 'create' && (
          <div className="mt-4 flex gap-2">
            {(['want_to_read', 'reading', 'read'] as ReadingStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={cx(
                  'flex-1 rounded-xl py-2 text-xs font-medium',
                  status === s ? 'bg-gold text-onaccent' : 'bg-surface text-ink-soft'
                )}
              >
                {t(`status.${s}`)}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={!title.trim()}
          className="mt-4 w-full rounded-full bg-gold py-3.5 font-medium text-onaccent shadow-glow disabled:opacity-40"
        >
          {mode === 'edit' ? t('common.save') : t('common.add')}
        </button>
      </motion.div>
    </motion.div>
  );
}
