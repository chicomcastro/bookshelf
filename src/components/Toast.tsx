import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '../store/toast';

export function Toast() {
  const message = useToast((s) => s.message);
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4"
        >
          <div className="glass rounded-full px-5 py-3 text-sm font-medium text-ink shadow-soft">
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
