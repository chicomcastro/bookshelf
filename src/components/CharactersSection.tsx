import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import { Heart, Trash2, UserPlus } from 'lucide-react';
import { db } from '../data/db';
import { addCharacter, deleteCharacter } from '../data/repositories';
import type { Character } from '../data/types';
import { cx } from '../lib/utils';

export function CharactersSection({ bookId }: { bookId: string }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [bf, setBf] = useState(false);

  const characters = useLiveQuery(
    () => db.characters.where('bookId').equals(bookId).toArray(),
    [bookId],
    [] as Character[]
  );

  async function handleAdd() {
    if (!name.trim()) return;
    await addCharacter(bookId, { name: name.trim(), role: role.trim() || undefined, isBookBoyfriend: bf });
    setName('');
    setRole('');
    setBf(false);
    setOpen(false);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {characters.map((c) => (
          <div
            key={c.id}
            className={cx(
              'group flex items-center gap-2 rounded-2xl px-3 py-2',
              c.isBookBoyfriend ? 'bg-rose/10' : 'bg-surface'
            )}
          >
            {c.isBookBoyfriend && <Heart size={14} className="fill-rose text-rose" />}
            <div className="min-w-0">
              <p className="text-sm text-ink">{c.name}</p>
              {c.role && <p className="text-xs text-ink-muted">{c.role}</p>}
            </div>
            <button onClick={() => deleteCharacter(c.id)} aria-label={t('common.delete')}>
              <Trash2 size={13} className="text-danger/60 opacity-0 transition group-hover:opacity-100" />
            </button>
          </div>
        ))}
      </div>

      {open ? (
        <div className="space-y-2 rounded-2xl bg-surface p-3">
          <input
            value={name}
            autoFocus
            onChange={(e) => setName(e.target.value)}
            placeholder={t('book.characterName')}
            className="w-full rounded-lg bg-elevated px-3 py-2 text-sm text-ink outline-none"
          />
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder={t('book.characterRole')}
            className="w-full rounded-lg bg-elevated px-3 py-2 text-sm text-ink outline-none"
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs text-ink-soft">
              <input type="checkbox" checked={bf} onChange={(e) => setBf(e.target.checked)} className="accent-rose" />
              {t('book.bookBoyfriend')}
            </label>
            <button onClick={handleAdd} className="rounded-full bg-gold px-4 py-1.5 text-xs font-medium text-base">
              {t('common.add')}
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className="flex items-center gap-2 text-sm text-gold">
          <UserPlus size={16} /> {t('book.addCharacter')}
        </button>
      )}
    </div>
  );
}
