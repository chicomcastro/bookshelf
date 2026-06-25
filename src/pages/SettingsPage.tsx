import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Globe, Moon, Trash2, Upload } from 'lucide-react';
import { downloadBackup, exportBackup, importBackup, wipeAll } from '../data/backup';
import { seedSampleShelf } from '../data/seed';
import { useSettings } from '../store/settings';
import type { Locale, ThemePref } from '../data/types';
import { Page } from '../components/Page';
import { CollectionsManager } from '../components/CollectionsManager';
import { useToast } from '../store/toast';
import { cx } from '../lib/utils';

function Row({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl bg-surface p-4">{children}</div>;
}

export function SettingsPage() {
  const { t, i18n } = useTranslation();
  const show = useToast((s) => s.show);
  const { theme, setTheme } = useSettings();
  const fileRef = useRef<HTMLInputElement>(null);
  const [importMode, setImportMode] = useState<'merge' | 'replace'>('merge');

  const locale = i18n.language as Locale;

  async function handleExport() {
    downloadBackup(await exportBackup());
    show(t('settings.exported'));
  }

  async function handleImport(file: File) {
    try {
      await importBackup(file, importMode);
      show(t('settings.imported'));
    } catch {
      show('⚠️');
    }
  }

  return (
    <Page>
      <header className="px-5 pt-6">
        <h1 className="text-2xl font-semibold text-ink">{t('settings.title')}</h1>
      </header>

      <div className="space-y-6 px-5 py-5">
        <section className="space-y-2">
          <h2 className="px-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            <Globe size={13} className="mr-1 inline" /> {t('settings.language')}
          </h2>
          <Row>
            <div className="flex gap-2">
              {(['pt-BR', 'en'] as Locale[]).map((l) => (
                <button
                  key={l}
                  onClick={() => i18n.changeLanguage(l)}
                  className={cx(
                    'flex-1 rounded-xl py-2 text-sm',
                    locale === l ? 'bg-gold text-onaccent' : 'bg-elevated text-ink-soft'
                  )}
                >
                  {l === 'pt-BR' ? '🇧🇷 Português' : '🇺🇸 English'}
                </button>
              ))}
            </div>
          </Row>
        </section>

        <section className="space-y-2">
          <h2 className="px-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            <Moon size={13} className="mr-1 inline" /> {t('settings.theme')}
          </h2>
          <Row>
            <div className="flex gap-2">
              {(['dark', 'light', 'system'] as ThemePref[]).map((tp) => (
                <button
                  key={tp}
                  onClick={() => setTheme(tp)}
                  className={cx(
                    'flex-1 rounded-xl py-2 text-sm',
                    theme === tp ? 'bg-gold text-onaccent' : 'bg-elevated text-ink-soft'
                  )}
                >
                  {t(`settings.theme${tp[0].toUpperCase()}${tp.slice(1)}`)}
                </button>
              ))}
            </div>
          </Row>
        </section>

        <section className="space-y-2">
          <h2 className="px-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {t('settings.data')}
          </h2>
          <Row>
            <button onClick={handleExport} className="flex w-full items-center gap-3 py-2 text-ink">
              <Download size={18} className="text-gold" /> {t('settings.export')}
            </button>
            <div className="my-2 h-px bg-white/5" />
            <div className="mb-2 flex gap-2 text-xs">
              {(['merge', 'replace'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setImportMode(m)}
                  className={cx(
                    'rounded-full px-3 py-1',
                    importMode === m ? 'bg-gold text-onaccent' : 'bg-elevated text-ink-soft'
                  )}
                >
                  {m === 'merge' ? t('settings.importMerge') : t('settings.importReplace')}
                </button>
              ))}
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              className="flex w-full items-center gap-3 py-2 text-ink"
            >
              <Upload size={18} className="text-gold" /> {t('settings.import')}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void handleImport(f);
                e.target.value = '';
              }}
            />
          </Row>
          <Row>
            <button
              onClick={() => seedSampleShelf().then(() => show(t('search.added')))}
              className="w-full py-1 text-left text-sm text-ink-soft"
            >
              {t('settings.loadSample')}
            </button>
          </Row>
          <Row>
            <button
              onClick={() => {
                if (confirm(t('settings.wipeConfirm'))) void wipeAll().then(() => show('🗑️'));
              }}
              className="flex w-full items-center gap-3 py-1 text-sm text-danger/80"
            >
              <Trash2 size={16} /> {t('settings.wipe')}
            </button>
          </Row>
        </section>

        <section className="space-y-2">
          <h2 className="px-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {t('collections.title')}
          </h2>
          <Row>
            <CollectionsManager />
          </Row>
        </section>

        <section className="space-y-2">
          <h2 className="px-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {t('settings.about')}
          </h2>
          <Row>
            <p className="text-sm leading-relaxed text-ink-soft">{t('settings.aboutText')}</p>
            <p className="mt-3 text-xs text-gold">{t('settings.privacy')}</p>
          </Row>
        </section>
      </div>
    </Page>
  );
}
