import { useTranslation } from 'react-i18next';
import type { DomainTag } from '../data/domain';
import type { Locale } from '../data/types';
import { cx } from '../lib/utils';

interface Props {
  options: DomainTag[];
  selected: string[];
  onToggle: (id: string) => void;
}

export function TagPicker({ options, selected, onToggle }: Props) {
  const { i18n } = useTranslation();
  const locale = i18n.language as Locale;
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((tag) => {
        const active = selected.includes(tag.id);
        return (
          <button
            key={tag.id}
            type="button"
            onClick={() => onToggle(tag.id)}
            className={cx(
              'rounded-full border px-3 py-1.5 text-sm transition-all active:scale-95',
              active
                ? 'border-gold/60 bg-gold/15 text-gold-hi'
                : 'border-white/10 bg-surface text-ink-soft hover:border-white/20'
            )}
          >
            <span className="mr-1">{tag.emoji}</span>
            {tag.label[locale] ?? tag.label.en}
          </button>
        );
      })}
    </div>
  );
}

export function TagBadges({ tags }: { tags: DomainTag[] }) {
  const { i18n } = useTranslation();
  const locale = i18n.language as Locale;
  if (tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag.id}
          className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-ink-soft"
        >
          {tag.emoji} {tag.label[locale] ?? tag.label.en}
        </span>
      ))}
    </div>
  );
}
