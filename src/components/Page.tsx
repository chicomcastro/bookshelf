import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function Page({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="pt-safe"
    >
      {children}
    </motion.div>
  );
}
