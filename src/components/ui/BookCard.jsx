import { useState } from 'react'
import { motion } from 'framer-motion'
import { IconStarFilled, IconBook2 } from '@tabler/icons-react'
import Badge from './Badge'

/**
 * BookCard — Figma node 356:7052
 *
 * Strictly the same component used across all book lists.
 * Badge content (variant/label/icon) is passed explicitly by the parent.
 *
 * cover        : string (image URL)
 * title        : string
 * author       : string
 * genres       : string — "Roman, Science-fiction, ..."
 * badgeVariant : Badge variant string
 * badgeLabel   : string — badge text
 * badgeIcon    : ReactNode — icon inside the badge
 * rating       : number (optional)
 * onClick      : () => void
 */

const SHADOW_CARD =
  '0px 2px 10px 0px rgba(142,141,143,0.07)'

const SHADOW_COVER =
  '0px 28px 8px 0px rgba(125,120,120,0),' +
  '0px 18px 7px 0px rgba(125,120,120,0.01),' +
  '0px 10px 6px 0px rgba(125,120,120,0.05),' +
  '0px 4px 4px 0px rgba(125,120,120,0.09),' +
  '0px 1px 2px 0px rgba(125,120,120,0.1)'

export default function BookCard({
  cover,
  title,
  author,
  genres,
  badgeVariant = 'success',
  badgeLabel   = 'Disponible',
  badgeIcon,
  rating,
  onClick,
  className = '',
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex items-stretch overflow-hidden cursor-pointer select-none ${className}`}
      style={{
        backgroundColor: 'var(--neutral-1)',
        border:          '1px solid var(--neutral-3)',
        borderRadius:    'var(--br-lg)',
        boxShadow:       SHADOW_CARD,
        paddingTop:      '8px',
        paddingLeft:     '8px',
        paddingRight:    '8px',
        paddingBottom:   0,
        gap:             'var(--gap-2md)', /* 12px */
        height:          '141px',
      }}
    >
      {/* Cover — 127px wide, fills full card height, top radius only */}
      <div
        className="shrink-0 self-stretch relative overflow-hidden"
        style={{
          width:                   '127px',
          borderTopLeftRadius:     'var(--br-sm)',
          borderTopRightRadius:    'var(--br-sm)',
          borderBottomLeftRadius:  0,
          borderBottomRightRadius: 0,
          backgroundColor:         'var(--neutral-3)',
          boxShadow:               SHADOW_COVER,
        }}
      >
        {cover && !imgError ? (
          <img
            src={cover}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover object-top"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ gap: '6px' }}>
            <IconBook2 size={32} color="var(--neutral-6)" strokeWidth={1.5} />
            <span style={{
              fontSize:   '10px',
              fontWeight: 500,
              color:      'var(--neutral-7)',
              textAlign:  'center',
              padding:    '0 8px',
              lineHeight: 1.3,
              overflow:   'hidden',
              display:    '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}>
              {title}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className="flex flex-col flex-1 min-w-0"
        style={{ gap: 'var(--gap-md)', paddingBottom: '12px' }}
      >
        {/* Badge + Rating row */}
        <div className="flex items-center" style={{ gap: '8px', minWidth: 0 }}>
          <Badge variant={badgeVariant} size="large" icon={badgeIcon}>
            {badgeLabel}
          </Badge>

          {rating != null && (
            <div className="flex-1 flex items-center justify-end shrink-0" style={{ gap: '4px' }}>
              <span style={{
                fontSize:   '12px',
                fontWeight: 500,
                lineHeight: 1,
                color:      'var(--color-text-subtle)',
                whiteSpace: 'nowrap',
              }}>
                {rating}/5
              </span>
              <IconStarFilled size={16} color="var(--secondary-11)" />
            </div>
          )}
        </div>

        {/* Text block */}
        <div className="flex flex-col min-w-0" style={{ gap: '2px' }}>
          <p style={{
            fontSize:        '16px',
            fontWeight:      700,
            lineHeight:      1.5,
            color:           'var(--color-text-title)',
            margin:          0,
            overflow:        'hidden',
            textOverflow:    'ellipsis',
            display:         '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}>
            {title}
          </p>
          <p style={{
            fontSize:     '14px',
            fontWeight:   500,
            lineHeight:   1.5,
            color:        'var(--color-text-body)',
            margin:       0,
            overflow:     'hidden',
            textOverflow: 'ellipsis',
            whiteSpace:   'nowrap',
          }}>
            {author}
          </p>
          {genres && (
            <p style={{
              fontSize:     '12px',
              fontWeight:   400,
              lineHeight:   1,
              color:        'var(--color-text-subtle)',
              margin:       0,
              overflow:     'hidden',
              textOverflow: 'ellipsis',
              whiteSpace:   'nowrap',
            }}>
              {genres}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
