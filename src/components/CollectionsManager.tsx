import { useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import { Trash2 } from 'lucide-react';
import { db } from '../data/db';
import { deleteCollection } from '../data/repositories';
import type { Collection } from '../data/types';

export function CollectionsManager() {
  const { t } = useTranslation();
  const collections = useLiveQuery(
    () => db.collections.orderBy('updatedAt').reverse().toArray(),
    [],
    [] as Collection[]
  );

  if (collections.length === 0) {
    return <p className="text-sm text-ink-muted">{t('collections.empty')}</p>;
  }

  return (
    <ul className="space-y-1">
      {collections.map((c) => (
        <li key={c.id} className="flex items-center justify-between py-2">
          <span className="text-sm text-ink">
            {c.emoji ? `${c.emoji} ` : '📂 '}
            {c.name}
            <span className="ml-2 text-xs text-ink-muted">
              {t('shelf.count', { count: c.bookIds.length })}
            </span>
          </span>
          <button
            onClick={() => {
              if (confirm(t('collections.deleteConfirm', { name: c.name })))
                void deleteCollection(c.id);
            }}
            aria-label={t('common.delete')}
          >
            <Trash2 size={15} className="text-danger/70" />
          </button>
        </li>
      ))}
    </ul>
  );
}
