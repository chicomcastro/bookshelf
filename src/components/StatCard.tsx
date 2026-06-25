import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function StatCard({
  value,
  label,
  accent = 'gold',
  index = 0,
}: {
  value: ReactNode;
  label: string;
  accent?: 'gold' | 'rose' | 'lavender';
  index?: number;
}) {
  const color =
    accent === 'rose' ? 'text-rose' : accent === 'lavender' ? 'text-lavender' : 'text-gold';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="rounded-2xl bg-surface p-4"
    >
      <p className={`font-display text-3xl font-semibold tabular-nums ${color}`}>{value}</p>
      <p className="mt-1 text-xs text-ink-muted">{label}</p>
    </motion.div>
  );
}
