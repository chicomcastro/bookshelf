import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';
import { useGoal } from '../store/goal';

export function ReadingGoalRing({ read }: { read: number }) {
  const { t } = useTranslation();
  const { goal, setGoal } = useGoal();
  const [editing, setEditing] = useState(false);

  const pct = Math.min(1, goal > 0 ? read / goal : 0);
  const r = 52;
  const c = 2 * Math.PI * r;
  const done = read >= goal && goal > 0;

  return (
    <div className="flex items-center gap-5 rounded-2xl bg-surface p-5">
      <div className="relative h-32 w-32 shrink-0">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="rgb(var(--bg-elevated))" strokeWidth="10" />
          <motion.circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke="rgb(var(--accent-gold))"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: c * (1 - pct) }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-semibold text-ink">{read}</span>
          <span className="text-xs text-ink-muted">/ {goal}</span>
        </div>
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium text-ink">
          {done ? `🎉 ${t('dashboard.goalDone')}` : t('dashboard.goalTitle')}
        </p>
        <p className="mt-1 text-xs text-ink-muted">
          {t('dashboard.goalSubtitle', { count: Math.max(0, goal - read) })}
        </p>
        {editing ? (
          <input
            type="number"
            autoFocus
            defaultValue={goal}
            min={1}
            onBlur={(e) => {
              setGoal(Number(e.target.value));
              setEditing(false);
            }}
            onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
            className="mt-2 w-20 rounded-lg bg-elevated px-2 py-1 text-sm text-ink outline-none"
          />
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="mt-2 flex items-center gap-1 text-xs text-gold"
          >
            <Pencil size={12} /> {t('dashboard.editGoal')}
          </button>
        )}
      </div>
    </div>
  );
}
