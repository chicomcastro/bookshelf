import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookHeart, Search, Settings } from 'lucide-react';
import { cx } from '../lib/utils';

const items = [
  { to: '/', icon: BookHeart, key: 'shelf' as const, end: true },
  { to: '/search', icon: Search, key: 'search' as const, end: false },
  { to: '/settings', icon: Settings, key: 'settings' as const, end: false },
];

export function BottomNav() {
  const { t } = useTranslation();
  return (
    <nav className="glass fixed inset-x-0 bottom-0 z-40 border-t border-white/5 pb-safe">
      <div className="mx-auto flex max-w-md items-stretch justify-around px-4 pt-2">
        {items.map(({ to, icon: Icon, key, end }) => (
          <NavLink
            key={key}
            to={to}
            end={end}
            className={({ isActive }) =>
              cx(
                'flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] transition-colors',
                isActive ? 'text-gold' : 'text-ink-muted'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={22} className={isActive ? 'fill-gold/10' : ''} />
                {t(`nav.${key}`)}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
