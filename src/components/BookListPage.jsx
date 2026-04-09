import { motion } from 'framer-motion';
import {
  IconArrowLeft,
  IconStar,
  IconCalendarCheck,
} from '@tabler/icons-react';
import Book3D from './Book3D';

const SHADOW_CARD = '0px 2px 10px rgba(142,141,143,0.07)';
const SHADOW_HEADER = '0px -2px 10px rgba(99,181,180,0.08), 0px 2px 10px rgba(99,181,180,0.08)';

/* ════════════════════════════════════════════════════
   BOOK CARD — même layout que ListBookCard (577:2955)
   ════════════════════════════════════════════════════ */
function BookCard({ book, actionLabel, actionBg, actionColor, actionOutlined, onAction, onBookSelect }) {
  return (
    <motion.div
      whileTap={{ scale: 0.99 }}
      onClick={() => onBookSelect?.(book)}
      style={{
        height:          '156px',
        position:        'relative',
        cursor:          'pointer',
        backgroundColor: 'var(--neutral-1)',
        border:          '1px solid var(--neutral-5)',
        borderRadius:    '14px',
        boxShadow:       SHADOW_CARD,
        display:         'flex',
        padding:         '12px 12px 0',
        overflow:        'hidden',
      }}
    >
      {/* Cover */}
      <div style={{ width: '127px', height: '100%', flexShrink: 0, borderRadius: '8px 8px 0 0', overflow: 'hidden', position: 'relative' }}>
        <Book3D
          cover={book.cover}
          title={book.title}
          author={book.author}
          width={127}
          height={144}
          style={{ borderRadius: '8px 8px 0 0', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 0 16px 12px' }}>

        {/* Badge + rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            display:         'flex', alignItems: 'center', gap: '6px',
            height:          '32px', padding: '0 8px', borderRadius: '4px', flexShrink: 0,
            backgroundColor: book.available !== false ? 'var(--success-3)' : 'var(--secondary-3)',
          }}>
            <IconCalendarCheck size={16} strokeWidth={1.8}
              color={book.available !== false ? 'var(--success-11)' : 'var(--secondary-11)'} />
            <span style={{ fontSize: '12px', fontWeight: 600, lineHeight: 1, whiteSpace: 'nowrap',
              color: book.available !== false ? 'var(--success-12)' : 'var(--secondary-12)' }}>
              {book.available !== false ? 'Disponible' : 'Indisponible'}
            </span>
          </div>
          {book.rating && (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
              <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text-subtle)' }}>{book.rating}/5</span>
              <IconStar size={14} strokeWidth={0} fill="var(--warning-9)" color="var(--warning-9)" />
            </div>
          )}
        </div>

        {/* Title / author / genres */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <p style={{ fontSize: '16px', fontWeight: 700, lineHeight: 1.5, color: 'var(--color-text-title)',
            margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {book.title}
          </p>
          <p style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1.5, color: 'var(--color-text-body)',
            margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {book.author}
          </p>
          {book.genres && (
            <p style={{ fontSize: '12px', fontWeight: 400, lineHeight: 1, color: 'var(--color-text-subtle)',
              margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {book.genres.join(', ')}
            </p>
          )}
        </div>

        {/* Action button */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={(e) => { e.stopPropagation(); onAction?.(book); }}
          style={{
            alignSelf:       'flex-end',
            height:          '32px',
            padding:         '0 12px',
            backgroundColor: actionOutlined ? 'transparent' : (actionBg ?? 'var(--secondary-3)'),
            border:          actionOutlined ? '1.5px solid var(--secondary-9)' : 'none',
            borderRadius:    '6px',
            fontSize:        '12px',
            fontWeight:      700,
            color:           actionColor ?? 'var(--secondary-11)',
            cursor:          'pointer',
            whiteSpace:      'nowrap',
          }}
        >
          {actionLabel}
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════
   BOOK LIST PAGE — full-screen (577:2955)
   ════════════════════════════════════════════════════ */
export function BookListPage({ title, count, books = [], actionLabel, actionBg, actionColor, actionOutlined, onAction, onBack, onBookSelect, pageActionLabel, pageActionBg, pageActionColor, onPageAction }) {
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
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={onPageAction}
              style={{
                flexShrink:      0,
                height:          '36px',
                padding:         '0 14px',
                backgroundColor: pageActionBg  ?? 'var(--secondary-3)',
                border:          'none',
                borderRadius:    '8px',
                fontSize:        '13px',
                fontWeight:      700,
                color:           pageActionColor ?? 'var(--secondary-11)',
                cursor:          'pointer',
                whiteSpace:      'nowrap',
              }}
            >
              {pageActionLabel}
            </motion.button>
          )}
        </div>

        {/* Book list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {books.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, type: 'spring', stiffness: 260, damping: 20 }}
            >
              <BookCard
                book={book}
                actionLabel={actionLabel}
                actionBg={actionBg}
                actionColor={actionColor}
                actionOutlined={actionOutlined}
                onAction={onAction}
                onBookSelect={onBookSelect}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookListPage;
