import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BarChart3, BookHeart, Search, Settings } from 'lucide-react';
import { cx } from '../lib/utils';
import { useInputFocused } from '../lib/useInputFocused';

const items = [
  { to: '/', icon: BookHeart, key: 'shelf' as const, end: true },
  { to: '/dashboard', icon: BarChart3, key: 'dashboard' as const, end: false },
  { to: '/search', icon: Search, key: 'search' as const, end: false },
  { to: '/settings', icon: Settings, key: 'settings' as const, end: false },
];

export function BottomNav() {
  const { t } = useTranslation();
  const inputFocused = useInputFocused();
  return (
    <nav
      className={cx(
        'glass fixed inset-x-0 bottom-0 z-40 border-t border-white/5 transition-transform duration-200',
        inputFocused && 'translate-y-full'
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-hidden={inputFocused}
    >
      <div className="mx-auto flex max-w-md items-stretch justify-around px-4 pt-1.5 pb-1">
        {items.map(({ to, icon: Icon, key, end }) => (
          <NavLink
            key={key}
            to={to}
            end={end}
            className={({ isActive }) =>
              cx(
                'flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1 text-[10px] transition-colors active:scale-95',
                isActive ? 'text-gold' : 'text-ink-muted'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={20} className={isActive ? 'fill-gold/10' : ''} />
                {t(`nav.${key}`)}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
