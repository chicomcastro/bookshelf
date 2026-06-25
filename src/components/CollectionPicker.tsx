import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import { FolderPlus, Plus } from 'lucide-react';
import { db } from '../data/db';
import { createCollection, toggleBookInCollection } from '../data/repositories';
import type { Collection } from '../data/types';
import { cx } from '../lib/utils';
import { tap } from '../lib/haptics';

export function CollectionPicker({ bookId }: { bookId: string }) {
  const { t } = useTranslation();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');

  const collections = useLiveQuery(
    () => db.collections.orderBy('updatedAt').reverse().toArray(),
    [],
    [] as Collection[]
  );

  async function handleCreate() {
    if (!name.trim()) {
      setCreating(false);
      return;
    }
    const c = await createCollection(name);
    await toggleBookInCollection(c.id, bookId);
    setName('');
    setCreating(false);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {collections.map((c) => {
        const active = c.bookIds.includes(bookId);
        return (
          <button
            key={c.id}
            onClick={() => {
              tap();
              void toggleBookInCollection(c.id, bookId);
            }}
            className={cx(
              'rounded-full border px-3 py-1.5 text-sm transition-all active:scale-95',
              active
                ? 'border-gold/60 bg-gold/15 text-gold-hi'
                : 'border-white/10 bg-surface text-ink-soft hover:border-white/20'
            )}
          >
            {c.emoji ? `${c.emoji} ` : ''}
            {c.name}
          </button>
        );
      })}

      {creating ? (
        <div className="flex items-center gap-1 rounded-full bg-surface px-2 py-1">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            onBlur={handleCreate}
            placeholder={t('collections.namePlaceholder')}
            className="w-32 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
          />
          <button onClick={handleCreate} aria-label={t('common.add')}>
            <Plus size={16} className="text-gold" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-1 rounded-full border border-dashed border-white/15 px-3 py-1.5 text-sm text-ink-soft active:scale-95"
        >
          <FolderPlus size={15} /> {t('collections.new')}
        </button>
      )}
    </div>
  );
}
