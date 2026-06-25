import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2, PencilLine, Plus, Search as SearchIcon } from 'lucide-react';
import { searchBooks, type OLResult } from '../data/openLibrary';
import { addBook, findByWorkId } from '../data/repositories';
import type { ReadingStatus } from '../data/types';
import { Page } from '../components/Page';
import { BookCover } from '../components/BookCover';
import { ManualAddSheet } from '../components/ManualAddSheet';
import { useToast } from '../store/toast';
import { tap } from '../lib/haptics';

export function SearchPage() {
  const { t, i18n } = useTranslation();
  const show = useToast((s) => s.show);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<OLResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState<Record<string, boolean>>({});
  const [manualOpen, setManualOpen] = useState(false);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setError(false);
      return;
    }
    const ctrl = new AbortController();
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await searchBooks(q, i18n.language, ctrl.signal);
        setResults(res);
        setError(false);
      } catch {
        if (!ctrl.signal.aborted) setError(true);
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    }, 350);
    return () => {
      ctrl.abort();
      clearTimeout(timer);
    };
  }, [query, i18n.language]);

  async function handleAdd(r: OLResult, status: ReadingStatus) {
    try {
      if (await findByWorkId(r.olWorkId)) {
        show(t('search.already'));
        return;
      }
      await addBook({
        olWorkId: r.olWorkId,
        title: r.title,
        authors: r.authors,
        coverUrl: r.coverUrl,
        publishedYear: r.publishedYear,
        categories: r.categories,
        status,
      });
      setAdded((a) => ({ ...a, [r.olWorkId]: true }));
      tap();
      show(t('search.added'));
    } catch {
      show(t('search.error'));
    }
  }

  return (
    <Page>
      <header className="sticky top-0 z-10 glass px-5 pb-3 pt-6">
        <h1 className="text-2xl font-semibold text-ink">{t('search.title')}</h1>
        <div className="mt-3 flex items-center gap-2 rounded-full bg-surface px-4 py-2.5">
          <SearchIcon size={18} className="text-ink-muted" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="w-full bg-transparent text-ink outline-none placeholder:text-ink-muted"
          />
          {loading && <Loader2 size={18} className="animate-spin text-gold" />}
        </div>
      </header>

      <div className="px-5 py-4">
        {error && <p className="py-10 text-center text-sm text-ink-muted">{t('search.error')}</p>}
        {!error && query.trim().length < 2 && (
          <p className="py-16 text-center text-sm text-ink-muted">{t('search.hint')}</p>
        )}
        {!error && query.trim().length >= 2 && !loading && results.length === 0 && (
          <p className="pt-10 text-center text-sm text-ink-muted">{t('search.empty')}</p>
        )}

        <ul className="space-y-3">
          {results.map((r) => (
            <li key={r.olWorkId} className="flex gap-3 rounded-2xl bg-surface p-3">
              <BookCover title={r.title} coverUrl={r.coverUrl} className="w-16 shrink-0" />
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="line-clamp-2 font-medium text-ink">{r.title}</p>
                <p className="line-clamp-1 text-xs text-ink-muted">
                  {r.authors.join(', ')}
                  {r.publishedYear ? ` · ${r.publishedYear}` : ''}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {added[r.olWorkId] ? (
                    <span className="text-xs text-success">{t('search.added')}</span>
                  ) : (
                    (['want_to_read', 'reading', 'read'] as ReadingStatus[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => handleAdd(r, s)}
                        className="flex items-center gap-1 rounded-full bg-elevated px-2.5 py-1 text-[11px] text-ink-soft active:scale-95"
                      >
                        <Plus size={12} />
                        {t(`status.${s}`)}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {query.trim().length >= 2 && !loading && (
          <button
            onClick={() => setManualOpen(true)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 py-3 text-sm text-ink-soft active:scale-[0.99]"
          >
            <PencilLine size={16} className="text-gold" />
            {t('search.manualCta')}
          </button>
        )}
      </div>

      {manualOpen && (
        <ManualAddSheet
          prefillTitle={query.trim()}
          onClose={() => setManualOpen(false)}
          onAdded={() => show(t('search.added'))}
        />
      )}
    </Page>
  );
}
