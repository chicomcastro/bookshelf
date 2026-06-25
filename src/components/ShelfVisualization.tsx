import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Book } from '../data/types';
import { coverGradient } from '../lib/utils';

// Lombadas coloridas em prateleiras (referência da estante visual / IMG_0917).
function spineMetrics(book: Book): { height: number; width: number } {
  // altura por nº de páginas (quando há), senão por hash do título
  let hash = 0;
  for (let i = 0; i < book.title.length; i++) hash = (hash * 31 + book.title.charCodeAt(i)) | 0;
  const base = book.pageCount ? Math.min(book.pageCount, 700) / 700 : (Math.abs(hash) % 100) / 100;
  const height = 96 + Math.round(base * 56); // 96..152px
  const width = 26 + (Math.abs(hash) % 16); // 26..42px
  return { height, width };
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function ShelfVisualization({ books }: { books: Book[] }) {
  const rows = chunk(books, 6);
  return (
    <div className="space-y-1">
      {rows.map((row, ri) => (
        <div key={ri} className="relative">
          <div className="flex items-end gap-1.5 overflow-hidden px-1 pb-1.5">
            {row.map((book, i) => {
              const { height, width } = spineMetrics(book);
              const { from, to } = coverGradient(book.title);
              return (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (ri * 6 + i) * 0.02 }}
                >
                  <Link
                    to={`/book/${book.id}`}
                    className="flex items-center justify-center rounded-t-sm px-0.5 py-3 shadow-soft transition-transform active:scale-95"
                    style={{
                      height,
                      width,
                      background: `linear-gradient(180deg, ${from}, ${to})`,
                    }}
                    title={book.title}
                  >
                    <span
                      className="line-clamp-1 max-h-full text-[10px] font-medium leading-tight text-white/85"
                      style={{ writingMode: 'vertical-rl' }}
                    >
                      {book.title}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          {/* prateleira */}
          <div className="h-2 rounded-full bg-gradient-to-b from-[#3a2e22] to-[#241c14] shadow-soft" />
        </div>
      ))}
    </div>
  );
}
