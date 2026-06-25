import { Star } from 'lucide-react';
import { cx } from '../lib/utils';

interface Props {
  value: number; // 0..5, meias
  onChange?: (value: number) => void;
  size?: number;
  readOnly?: boolean;
}

export function RatingStars({ value, onChange, size = 22, readOnly }: Props) {
  const interactive = !readOnly && !!onChange;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, value - (i - 1)));
        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => onChange?.(value === i ? i - 0.5 : i)}
            className={cx('relative', interactive && 'transition-transform active:scale-90')}
            aria-label={`${i}`}
          >
            <Star size={size} className="text-ink-muted/40" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star size={size} className="fill-gold text-gold" />
            </span>
          </button>
        );
      })}
    </div>
  );
}
