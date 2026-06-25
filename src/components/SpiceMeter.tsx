import { cx } from '../lib/utils';

interface Props {
  value: number; // 0..5
  onChange?: (value: number) => void;
  size?: number;
  readOnly?: boolean;
}

export function SpiceMeter({ value, onChange, size = 22, readOnly }: Props) {
  const interactive = !readOnly && !!onChange;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(value === i ? i - 1 : i)}
          className={cx(
            'transition-all',
            interactive && 'active:scale-90',
            i <= value ? 'opacity-100' : 'opacity-25 grayscale'
          )}
          style={{ fontSize: size }}
          aria-label={`${i}`}
        >
          🌶️
        </button>
      ))}
    </div>
  );
}
