import { motion } from 'framer-motion';
import { IconArrowLeft } from '@tabler/icons-react';
import BookCard from './ui/BookCard';
import Button   from './ui/Button';

const SHADOW_HEADER = '0px -2px 10px rgba(99,181,180,0.08), 0px 2px 10px rgba(99,181,180,0.08)';

/* ════════════════════════════════════════════════════
   BOOK LIST PAGE — full-screen (577:2955)
   Props:
     title            : string
     count            : number
     books            : array — items from ALL_BOOKS
     cardAvailability : 'available' | 'borrowed' | 'reserved'  (applied to all cards)
     pageActionLabel  : string (optional) — button shown next to title
     pageActionVariant: Button variant (default 'primary')
     onPageAction     : () => void
     onBack           : () => void
     onBookSelect     : (book) => void
   ════════════════════════════════════════════════════ */
export function BookListPage({
  title,
  count,
  books = [],
  cardAvailability = 'available',
  pageActionLabel,
  pageActionVariant = 'primary',
  onPageAction,
  onBack,
  onBookSelect,
}) {
  return (
    <div
      className="min-h-dvh font-sans flex flex-col"
      style={{
        background:    'linear-gradient(180deg, var(--primary-2) 0%, var(--neutral-2) 49%), var(--neutral-2)',
        paddingBottom: '40px',
      }}
    >
      {/* Header */}
      <div style={{
        backgroundColor: 'var(--primary-1)',
        boxShadow:       SHADOW_HEADER,
        padding:         '16px 20px',
        display:         'flex',
        alignItems:      'center',
        gap:             '12px',
        flexShrink:      0,
      }}>
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          style={{
            width: '40px', height: '40px', borderRadius: '9999px',
            backgroundColor: 'var(--neutral-4)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <IconArrowLeft size={24} strokeWidth={2} color="var(--color-text-title)" />
        </motion.button>
      </div>

      {/* Body */}
      <div style={{ padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Title + count + optional page action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: 'var(--font-brand)', fontSize: '20px', fontWeight: 700,
              lineHeight: 1.5, color: 'var(--color-text-brand)', margin: '0 0 2px' }}>
              {title}
            </p>
            <p style={{ fontSize: '14px', fontWeight: 600, lineHeight: 1.5,
              color: 'var(--color-text-body)', margin: 0 }}>
              {count} titre{count !== 1 ? 's' : ''}
            </p>
          </div>
          {pageActionLabel && (
            <Button
              variant={pageActionVariant}
              size="sm"
              onClick={onPageAction}
            >
              {pageActionLabel}
            </Button>
          )}
        </div>

        {/* Book list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {books.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, type: 'spring', stiffness: 260, damping: 20 }}
            >
              <BookCard
                title={book.title}
                author={book.author}
                cover={book.cover}
                availability={cardAvailability}
                onClick={() => onBookSelect?.(book)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookListPage;
