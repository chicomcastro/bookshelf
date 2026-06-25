import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import type { Book } from '../data/types';
import { BookCover } from './BookCover';

export function BookCard({ book, index = 0 }: { book: Book; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.3), duration: 0.3 }}
    >
      <Link to={`/book/${book.id}`} className="group block">
        <div className="relative">
          <BookCover
            title={book.title}
            coverUrl={book.coverUrl}
            className="shadow-soft transition-transform duration-300 group-active:scale-95"
          />
          {book.isFavorite && (
            <div className="absolute right-1.5 top-1.5 rounded-full bg-base/60 p-1.5 backdrop-blur">
              <Heart size={14} className="fill-rose text-rose" />
            </div>
          )}
          {book.spice ? (
            <div className="absolute bottom-1.5 left-1.5 rounded-full bg-base/70 px-2 py-0.5 text-[11px] backdrop-blur">
              {'🌶️'.repeat(Math.min(book.spice, 3))}
            </div>
          ) : null}
        </div>
        <div className="mt-2 px-0.5">
          <p className="line-clamp-1 text-sm font-medium text-ink">{book.title}</p>
          <p className="line-clamp-1 text-xs text-ink-muted">{book.authors.join(', ')}</p>
          {book.rating ? (
            <div className="mt-1 flex items-center gap-1 text-xs text-gold">
              <Star size={12} className="fill-gold text-gold" />
              {book.rating}
            </div>
          ) : null}
        </div>
      </Link>
    </motion.div>
  );
}
