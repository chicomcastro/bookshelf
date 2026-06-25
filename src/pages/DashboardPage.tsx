import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import { Sparkles } from 'lucide-react';
import { db } from '../data/db';
import { getMood, getTrope } from '../data/domain';
import type { Book, Locale } from '../data/types';
import { computeStats } from '../lib/stats';
import { greetingKey } from '../lib/utils';
import { Page } from '../components/Page';
import { StatCard } from '../components/StatCard';
import { ReadingGoalRing } from '../components/ReadingGoalRing';
import { ShelfVisualization } from '../components/ShelfVisualization';

export function DashboardPage() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as Locale;
  const books = useLiveQuery(() => db.books.toArray(), [], undefined as Book[] | undefined);

  const stats = useMemo(() => (books ? computeStats(books) : null), [books]);

  if (!books || !stats) return <Page><div className="p-10" /></Page>;

  if (books.length === 0) {
    return (
      <Page>
        <div className="flex flex-col items-center px-8 pt-28 text-center">
          <Sparkles size={34} className="mb-4 text-gold" />
          <h1 className="text-xl font-semibold text-ink">{t('shelf.empty.title')}</h1>
          <Link to="/search" className="mt-6 rounded-full bg-gold px-6 py-3 font-medium text-base shadow-glow">
            {t('shelf.empty.cta')}
          </Link>
        </div>
      </Page>
    );
  }

  const fmt = (n: number | null) => (n === null ? '—' : n.toFixed(1));

  return (
    <Page>
      <header className="px-5 pt-6">
        <p className="text-sm text-ink-muted">{t(`greeting.${greetingKey()}`)}</p>
        <h1 className="mt-0.5 text-3xl font-semibold text-ink">{t('dashboard.title')}</h1>
      </header>

      <div className="space-y-6 px-5 py-5">
        <ReadingGoalRing read={stats.readThisYear} />

        <div className="grid grid-cols-2 gap-3">
          <StatCard value={stats.readThisYear} label={t('dashboard.readThisYear')} index={0} />
          <StatCard value={stats.reading} label={t('dashboard.reading')} accent="rose" index={1} />
          <StatCard value={stats.total} label={t('dashboard.total')} accent="lavender" index={2} />
          <StatCard
            value={stats.avgRating === null ? '—' : `★ ${fmt(stats.avgRating)}`}
            label={t('dashboard.avgRating')}
            index={3}
          />
        </div>

        {stats.avgSpice !== null && (
          <div className="rounded-2xl bg-surface p-4">
            <p className="text-xs text-ink-muted">{t('dashboard.avgSpice')}</p>
            <p className="mt-1 text-lg">
              {'🌶️'.repeat(Math.round(stats.avgSpice))}{' '}
              <span className="text-sm text-ink-soft">{fmt(stats.avgSpice)}</span>
            </p>
          </div>
        )}

        <section>
          <h2 className="mb-3 px-1 font-display text-xl font-semibold text-ink">
            {t('dashboard.myBookshelf')}
          </h2>
          <div className="rounded-2xl bg-gradient-to-b from-[#1a140e] to-[#120d09] p-3">
            <ShelfVisualization books={books} />
          </div>
        </section>

        {stats.topTropes.length > 0 && (
          <section>
            <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
              {t('dashboard.topTropes')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {stats.topTropes.map(({ id, count }) => {
                const tr = getTrope(id);
                return tr ? (
                  <span key={id} className="rounded-full bg-surface px-3 py-1.5 text-sm text-ink-soft">
                    {tr.emoji} {tr.label[locale] ?? tr.label.en}
                    <span className="ml-1.5 text-gold">{count}</span>
                  </span>
                ) : null;
              })}
            </div>
          </section>
        )}

        {stats.topMoods.length > 0 && (
          <section>
            <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
              {t('dashboard.topMoods')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {stats.topMoods.map(({ id, count }) => {
                const m = getMood(id);
                return m ? (
                  <span key={id} className="rounded-full bg-surface px-3 py-1.5 text-sm text-ink-soft">
                    {m.emoji} {m.label[locale] ?? m.label.en}
                    <span className="ml-1.5 text-rose">{count}</span>
                  </span>
                ) : null;
              })}
            </div>
          </section>
        )}
      </div>
    </Page>
  );
}
