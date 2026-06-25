import { useTranslation } from 'react-i18next';
import type { ReadingStatus } from '../data/types';
import { cx } from '../lib/utils';

const ORDER: ReadingStatus[] = ['want_to_read', 'reading', 'read'];

export function StatusSelect({
  value,
  onChange,
}: {
  value: ReadingStatus;
  onChange: (s: ReadingStatus) => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="inline-flex rounded-full bg-surface p-1">
      {ORDER.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={cx(
            'rounded-full px-3 py-1.5 text-xs font-medium transition-all',
            value === s ? 'bg-gold text-base shadow-glow' : 'text-ink-soft'
          )}
        >
          {t(`status.${s}`)}
        </button>
      ))}
    </div>
  );
}

export function StatusChip({ status }: { status: ReadingStatus }) {
  const { t } = useTranslation();
  const tone =
    status === 'read'
      ? 'bg-success/15 text-success'
      : status === 'reading'
        ? 'bg-gold/15 text-gold-hi'
        : 'bg-white/5 text-ink-soft';
  return (
    <span className={cx('rounded-full px-2.5 py-1 text-[11px] font-medium', tone)}>
      {t(`status.${status}`)}
    </span>
  );
}
