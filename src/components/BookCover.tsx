import { useState } from 'react';
import { cx, coverGradient, initials } from '../lib/utils';

interface Props {
  title: string;
  coverUrl?: string;
  className?: string;
  rounded?: string;
}

export function BookCover({ title, coverUrl, className, rounded = 'rounded-lg' }: Props) {
  const [failed, setFailed] = useState(false);
  const showImage = coverUrl && !failed;

  if (showImage) {
    return (
      <div className={cx('relative aspect-[2/3] overflow-hidden bg-elevated', rounded, className)}>
        <img
          src={coverUrl}
          alt={title}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const { from, to } = coverGradient(title);
  return (
    <div
      className={cx(
        'relative flex aspect-[2/3] items-center justify-center overflow-hidden p-2 text-center',
        rounded,
        className
      )}
      style={{ background: `linear-gradient(145deg, ${from}, ${to})` }}
      aria-label={title}
    >
      <span className="font-display text-lg font-semibold leading-tight text-white/90 line-clamp-4">
        {title.length > 24 ? initials(title) : title}
      </span>
    </div>
  );
}
