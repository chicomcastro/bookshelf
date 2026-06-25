import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLiveQuery } from 'dexie-react-hooks';
import { Check } from 'lucide-react';
import { db } from '../data/db';
import { addNote, updateNote } from '../data/repositories';
import type { Note } from '../data/types';

// Resenha = uma única nota tipo 'review' por livro, com auto-save (ADR-0010).
export function ReviewEditor({ bookId }: { bookId: string }) {
  const { t } = useTranslation();
  const review = useLiveQuery(
    () => db.notes.where('bookId').equals(bookId).filter((n) => n.type === 'review').first(),
    [bookId],
    undefined as Note | undefined
  );

  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const loadedFor = useRef<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Carrega o conteúdo inicial uma vez por nota.
  useEffect(() => {
    if (review && loadedFor.current !== review.id) {
      setText(review.body);
      loadedFor.current = review.id;
    }
  }, [review]);

  function handleChange(value: string) {
    setText(value);
    setSaved(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      if (review) await updateNote(review.id, { body: value });
      else if (value.trim()) {
        const created = await addNote(bookId, { type: 'review', body: value });
        loadedFor.current = created.id;
      }
      setSaved(true);
    }, 600);
  }

  return (
    <div className="relative">
      <textarea
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={t('book.reviewPlaceholder')}
        rows={4}
        className="w-full resize-none rounded-2xl bg-surface p-4 text-ink outline-none ring-gold/40 transition placeholder:text-ink-muted focus:ring-1"
      />
      {saved && (
        <span className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-success">
          <Check size={13} /> {t('book.saved')}
        </span>
      )}
    </div>
  );
}
