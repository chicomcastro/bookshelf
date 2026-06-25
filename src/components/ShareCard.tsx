import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toPng } from 'html-to-image';
import { motion } from 'framer-motion';
import { Download, Loader2, Share2, Star, X } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../data/db';
import { getMood, getTrope } from '../data/domain';
import type { Book, Locale, Note } from '../data/types';
import { BookCover } from './BookCover';
import { coverGradient, cx } from '../lib/utils';

const TEMPLATES = ['midnight', 'rose'] as const;
type Template = (typeof TEMPLATES)[number];

export function ShareCard({ book, onClose }: { book: Book; onClose: () => void }) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;
  const cardRef = useRef<HTMLDivElement>(null);
  const [template, setTemplate] = useState<Template>('midnight');
  const [busy, setBusy] = useState(false);

  const notes = useLiveQuery(
    () => db.notes.where('bookId').equals(book.id).toArray(),
    [book.id],
    [] as Note[]
  );

  const quote =
    notes.find((n) => n.type === 'quote' && !n.isSpoiler)?.body ??
    notes.find((n) => n.type === 'review' && !n.isSpoiler)?.body ??
    '';

  const { from, to } = coverGradient(book.title);

  async function render(): Promise<string | null> {
    if (!cardRef.current) return null;
    return toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
  }

  async function handleDownload() {
    setBusy(true);
    try {
      const url = await render();
      if (url) {
        const a = document.createElement('a');
        a.href = url;
        a.download = `${book.title.slice(0, 30)}-bookshelf.png`;
        a.click();
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleShare() {
    setBusy(true);
    try {
      const url = await render();
      if (!url) return;
      const blob = await (await fetch(url)).blob();
      const file = new File([blob], 'bookshelf.png', { type: 'image/png' });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: book.title });
      } else {
        await handleDownload();
      }
    } catch {
      /* usuária cancelou */
    } finally {
      setBusy(false);
    }
  }

  // bloqueia scroll do body enquanto aberto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const bg =
    template === 'midnight'
      ? 'linear-gradient(160deg, #16161A, #0E0E10)'
      : `linear-gradient(160deg, ${from}, ${to})`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-base/90 backdrop-blur-md"
    >
      <header className="flex items-center justify-between px-5 pt-safe">
        <div className="pt-4">
          <h2 className="text-lg font-semibold text-ink">{t('share.title')}</h2>
          <p className="text-xs text-ink-muted">{t('share.subtitle')}</p>
        </div>
        <button onClick={onClose} className="mt-4 rounded-full bg-surface p-2" aria-label={t('common.close')}>
          <X size={20} className="text-ink" />
        </button>
      </header>

      <div className="flex flex-1 items-center justify-center overflow-auto px-6 py-4">
        {/* Card exportável — proporção 4:5 (story-friendly) */}
        <div
          ref={cardRef}
          className="relative flex w-[320px] shrink-0 flex-col justify-between overflow-hidden rounded-3xl p-7"
          style={{ aspectRatio: '4 / 5', background: bg }}
        >
          <div className="flex gap-4">
            <BookCover title={book.title} coverUrl={book.coverUrl} className="w-24 shrink-0 shadow-soft" rounded="rounded-xl" />
            <div className="min-w-0 pt-1">
              <h3 className="font-display text-xl font-semibold leading-tight text-white line-clamp-3">
                {book.title}
              </h3>
              <p className="mt-1 text-sm text-white/70 line-clamp-2">{book.authors.join(', ')}</p>
              <div className="mt-3 flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={16}
                    className={cx(i <= (book.rating ?? 0) ? 'fill-gold-hi text-gold-hi' : 'text-white/20')}
                  />
                ))}
              </div>
              {book.spice ? (
                <p className="mt-2 text-sm">{'🌶️'.repeat(book.spice)}</p>
              ) : null}
            </div>
          </div>

          {quote && (
            <p className="my-4 font-display text-lg italic leading-snug text-white/90 line-clamp-4">
              “{quote}”
            </p>
          )}

          <div>
            <div className="flex flex-wrap gap-1.5">
              {book.tropes.slice(0, 3).map((id) => {
                const tr = getTrope(id);
                return tr ? (
                  <span key={id} className="rounded-full bg-white/15 px-2.5 py-1 text-xs text-white">
                    {tr.emoji} {tr.label[locale] ?? tr.label.en}
                  </span>
                ) : null;
              })}
              {book.moods.slice(0, 2).map((id) => {
                const m = getMood(id);
                return m ? (
                  <span key={id} className="rounded-full bg-white/15 px-2.5 py-1 text-xs text-white">
                    {m.emoji} {m.label[locale] ?? m.label.en}
                  </span>
                ) : null;
              })}
            </div>
            <p className="mt-5 text-xs font-medium tracking-wide text-gold-hi">
              ✦ {t('share.watermark')}
            </p>
          </div>
        </div>
      </div>

      <footer className="space-y-3 px-6 pb-8">
        <div className="flex justify-center gap-2">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl}
              onClick={() => setTemplate(tpl)}
              className={cx(
                'h-9 w-9 rounded-full border-2 transition',
                template === tpl ? 'border-gold' : 'border-transparent'
              )}
              style={{
                background:
                  tpl === 'midnight'
                    ? 'linear-gradient(160deg, #16161A, #0E0E10)'
                    : `linear-gradient(160deg, ${from}, ${to})`,
              }}
              aria-label={tpl}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            disabled={busy}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-surface py-3.5 font-medium text-ink"
          >
            {busy ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
            {t('share.download')}
          </button>
          <button
            onClick={handleShare}
            disabled={busy}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold py-3.5 font-medium text-onaccent shadow-glow"
          >
            <Share2 size={18} />
            {t('share.shareBtn')}
          </button>
        </div>
      </footer>
    </motion.div>
  );
}
