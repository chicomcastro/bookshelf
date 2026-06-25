import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import { Quote, StickyNote, Trash2 } from 'lucide-react';
import { db } from '../data/db';
import { addNote, deleteNote } from '../data/repositories';
import type { Note } from '../data/types';
import { cx } from '../lib/utils';

export function NotesSection({ bookId }: { bookId: string }) {
  const { t } = useTranslation();
  const [type, setType] = useState<'note' | 'quote'>('note');
  const [body, setBody] = useState('');
  const [isSpoiler, setIsSpoiler] = useState(false);

  const notes = useLiveQuery(
    () =>
      db.notes
        .where('bookId')
        .equals(bookId)
        .filter((n) => n.type !== 'review')
        .reverse()
        .sortBy('createdAt'),
    [bookId],
    [] as Note[]
  );

  async function handleAdd() {
    if (!body.trim()) return;
    await addNote(bookId, { type, body: body.trim(), isSpoiler });
    setBody('');
    setIsSpoiler(false);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-surface p-3">
        <div className="mb-2 flex gap-2">
          {(['note', 'quote'] as const).map((tp) => (
            <button
              key={tp}
              onClick={() => setType(tp)}
              className={cx(
                'flex items-center gap-1 rounded-full px-3 py-1 text-xs',
                type === tp ? 'bg-gold text-base' : 'bg-elevated text-ink-soft'
              )}
            >
              {tp === 'note' ? <StickyNote size={12} /> : <Quote size={12} />}
              {tp === 'note' ? t('book.addNote') : t('book.addQuote')}
            </button>
          ))}
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={type === 'note' ? t('book.notePlaceholder') : t('book.quotePlaceholder')}
          rows={2}
          className="w-full resize-none bg-transparent text-ink outline-none placeholder:text-ink-muted"
        />
        <div className="mt-2 flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-ink-soft">
            <input
              type="checkbox"
              checked={isSpoiler}
              onChange={(e) => setIsSpoiler(e.target.checked)}
              className="accent-gold"
            />
            {t('book.spoiler')}
          </label>
          <button
            onClick={handleAdd}
            disabled={!body.trim()}
            className="rounded-full bg-gold px-4 py-1.5 text-xs font-medium text-base disabled:opacity-40"
          >
            {t('common.add')}
          </button>
        </div>
      </div>

      <ul className="space-y-2">
        {notes.map((n) => (
          <NoteItem key={n.id} note={n} />
        ))}
      </ul>
    </div>
  );
}

function NoteItem({ note }: { note: Note }) {
  const { t } = useTranslation();
  const [revealed, setRevealed] = useState(!note.isSpoiler);
  const isQuote = note.type === 'quote';
  return (
    <li
      className={cx(
        'group relative rounded-2xl p-3 text-sm',
        isQuote ? 'border-l-2 border-gold bg-surface italic text-ink-soft' : 'bg-surface text-ink'
      )}
    >
      {note.isSpoiler && !revealed ? (
        <button onClick={() => setRevealed(true)} className="text-ink-muted">
          {t('book.spoilerHidden')}
        </button>
      ) : (
        <p className="whitespace-pre-wrap pr-6">{isQuote ? `“${note.body}”` : note.body}</p>
      )}
      <button
        onClick={() => deleteNote(note.id)}
        className="absolute right-2 top-2 opacity-0 transition group-hover:opacity-100"
        aria-label={t('common.delete')}
      >
        <Trash2 size={14} className="text-danger/70" />
      </button>
    </li>
  );
}
