import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { addBook } from '../data/repositories';
import type { ReadingStatus } from '../data/types';
import { cx } from '../lib/utils';
import { tap } from '../lib/haptics';

export function ManualAddSheet({
  onClose,
  onAdded,
  prefillTitle = '',
}: {
  onClose: () => void;
  onAdded: () => void;
  prefillTitle?: string;
}) {
  const { t } = useTranslation();
  const [title, setTitle] = useState(prefillTitle);
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [status, setStatus] = useState<ReadingStatus>('want_to_read');

  async function handleSave() {
    if (!title.trim()) return;
    await addBook({
      title: title.trim(),
      authors: author.trim() ? author.split(',').map((a) => a.trim()).filter(Boolean) : [],
      coverUrl: coverUrl.trim() || undefined,
      publishedYear: year.trim() ? Number(year) : undefined,
      status,
    });
    tap();
    onAdded();
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
        className="w-full max-w-md rounded-t-3xl bg-elevated p-5 pb-8 sm:rounded-3xl"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)' }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">{t('manual.title')}</h2>
          <button onClick={onClose} className="rounded-full bg-surface p-1.5" aria-label={t('common.close')}>
            <X size={18} className="text-ink" />
          </button>
        </div>

        <div className="space-y-3">
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('manual.titleField')}
            className="w-full rounded-xl bg-surface px-4 py-3 text-ink outline-none ring-gold/40 focus:ring-1"
          />
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder={t('manual.authorField')}
            className="w-full rounded-xl bg-surface px-4 py-3 text-ink outline-none ring-gold/40 focus:ring-1"
          />
          <div className="flex gap-3">
            <input
              value={year}
              onChange={(e) => setYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
              inputMode="numeric"
              placeholder={t('manual.yearField')}
              className="w-28 rounded-xl bg-surface px-4 py-3 text-ink outline-none ring-gold/40 focus:ring-1"
            />
            <input
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder={t('manual.coverField')}
              className="flex-1 rounded-xl bg-surface px-4 py-3 text-ink outline-none ring-gold/40 focus:ring-1"
            />
          </div>

          <div className="flex gap-2">
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

          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="mt-1 w-full rounded-full bg-gold py-3.5 font-medium text-onaccent shadow-glow disabled:opacity-40"
          >
            {t('common.add')}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
