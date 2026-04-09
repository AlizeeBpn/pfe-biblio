import { motion } from 'framer-motion'
import Badge from './Badge'

/**
 * BookCard — central element for home lists / catalogue
 *
 * title       : string
 * author      : string
 * cover       : string (image URL)
 * library     : string — branch name e.g. "Bibliothèque Mériadeck"
 * availability: 'available' | 'borrowed' | 'reserved'
 * returnDate  : string (optional) — e.g. "12 janvier 2024"
 * progress    : number 0-100 (optional) — reading progress %
 * onClick     : () => void
 */
export default function BookCard({
  title,
  author,
  cover,
  library,
  availability = 'available',
  returnDate,
  progress,
  onClick,
  className = '',
}) {
  const availMap = {
    available: { label: 'En rayon',  variant: 'success' },
    borrowed:  { label: 'Emprunté',  variant: 'warning' },
    reserved:  { label: 'Réservé',   variant: 'info'    },
  }

  const { label, variant } = availMap[availability]

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        flex gap-[var(--gap-lg)] items-start
        bg-white rounded-[var(--br-layout)]
        p-[var(--pad-2md)]
        shadow-[var(--shadow-card)]
        cursor-pointer select-none
        ${className}
      `}
    >
      {/* Cover */}
      <div className="shrink-0 w-[60px] h-[84px] rounded-[var(--br-sm)] overflow-hidden bg-[var(--neutral-3)]">
        {cover ? (
          <img
            src={cover}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--neutral-7)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-[var(--gap-xs)] min-w-0">
        <Badge variant={variant} size="sm">{label}</Badge>

        <h3 className="m-0 text-[var(--text-body-md)] font-semibold text-[var(--color-text-title)] leading-snug line-clamp-2">
          {title}
        </h3>

        <p className="m-0 text-[var(--text-body-sm)] text-[var(--color-text-subtle)] truncate">
          {author}
        </p>

        {library && (
          <p className="m-0 text-[var(--text-caption-sm)] text-[var(--color-text-subtle)] truncate">
            {library}
          </p>
        )}

        {/* Reading progress bar */}
        {progress !== undefined && (
          <div className="mt-[var(--gap-xs)]">
            <div className="w-full h-[4px] bg-[var(--neutral-3)] rounded-[var(--br-round)] overflow-hidden">
              <div
                className="h-full bg-[var(--primary-9)] rounded-[var(--br-round)] transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
            <p className="m-0 mt-[var(--gap-2xs)] text-[var(--text-caption-sm)] text-[var(--primary-9)] font-semibold">
              {progress} %
            </p>
          </div>
        )}

        {returnDate && (
          <p className="m-0 text-[var(--text-caption-sm)] text-[var(--color-text-subtle)]">
            Retour : {returnDate}
          </p>
        )}
      </div>
    </motion.div>
  )
}
