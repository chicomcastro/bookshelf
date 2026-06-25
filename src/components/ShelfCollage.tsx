import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toPng } from 'html-to-image';
import { motion } from 'framer-motion';
import { Download, Loader2, Share2, X } from 'lucide-react';
import type { Book } from '../data/types';
import { BookCover } from './BookCover';

// Colagem "minha estante" pronta pro story (ADR-0009 / v1.1).
export function ShelfCollage({ books, onClose }: { books: Book[]; onClose: () => void }) {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  // prioriza lidos/favoritos; limita a um grid bonito
  const picks = [...books]
    .sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite) || (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 12);
  const year = new Date().getFullYear();

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
        a.download = `minha-estante-${year}.png`;
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
      const file = new File([blob], 'estante.png', { type: 'image/png' });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: t('share.shelfTitle') });
      } else {
        await handleDownload();
      }
    } catch {
      /* cancelado */
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-base/90 backdrop-blur-md"
    >
      <header className="flex items-center justify-between px-5 pt-safe">
        <div className="pt-4">
          <h2 className="text-lg font-semibold text-ink">{t('share.collageTitle')}</h2>
          <p className="text-xs text-ink-muted">{t('share.subtitle')}</p>
        </div>
        <button onClick={onClose} className="mt-4 rounded-full bg-surface p-2" aria-label={t('common.close')}>
          <X size={20} className="text-ink" />
        </button>
      </header>

      <div className="flex flex-1 items-center justify-center overflow-auto px-6 py-4">
        <div
          ref={cardRef}
          className="flex w-[320px] shrink-0 flex-col overflow-hidden rounded-3xl p-6"
          style={{ aspectRatio: '4 / 5', background: 'linear-gradient(160deg, #16161A, #0E0E10)' }}
        >
          <div className="mb-4 text-center">
            <p className="font-display text-2xl font-semibold text-ink">{t('share.shelfTitle')}</p>
            <p className="text-sm text-gold-hi">{year}</p>
          </div>
          <div className="grid flex-1 grid-cols-4 gap-1.5">
            {picks.map((b) => (
              <BookCover key={b.id} title={b.title} coverUrl={b.coverUrl} rounded="rounded-md" />
            ))}
          </div>
          <p className="mt-4 text-center text-xs font-medium tracking-wide text-gold-hi">
            ✦ {t('share.watermark')}
          </p>
        </div>
      </div>

      <footer className="flex gap-3 px-6 pb-8">
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
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold py-3.5 font-medium text-base shadow-glow"
        >
          <Share2 size={18} />
          {t('share.shareBtn')}
        </button>
      </footer>
    </motion.div>
  );
}
