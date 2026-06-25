// Feedback tátil leve nas ações-chave (quando suportado). Respeita reduced-motion.
const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function tap(pattern: number | number[] = 8): void {
  if (reduced) return;
  navigator.vibrate?.(pattern);
}

export const celebrate = (): void => tap([12, 40, 18]);
