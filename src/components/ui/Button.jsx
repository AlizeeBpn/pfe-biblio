import { motion } from 'framer-motion'

/**
 * Button — core interactive element
 *
 * variant : 'primary' | 'secondary' | 'outlined' | 'text' | 'success' | 'error'
 * size    : 'sm' | 'md' | 'lg'
 * iconLeft / iconRight : ReactNode (Tabler icon)
 * iconOnly : bool — square icon-only button
 * disabled : bool
 */

/* Shadow spec (object-depth-color-1) */
const COLOR_SHADOW = '0 -2px 10px 0 var(--alpha-primary-08), 0 2px 10px 0 var(--alpha-primary-08)'
const NEUTRAL_SHADOW = '0 -2px 10px 0 var(--alpha-grey-09), 0 2px 10px 0 var(--alpha-grey-09)'

/*
 * Size tokens (mapped from design spec fallback values):
 *   sm → h:32px  px:12px  gap:6px   radius:6px  (br-xs)
 *   md → h:40px  px:16px  gap:8px   radius:8px  (br-sm)
 *   lg → h:48px  px:20px  gap:12px  radius:12px
 */
const SIZE = {
  sm: {
    cls: 'h-[32px] px-[var(--pad-md)] gap-[var(--gap-sm)] text-[var(--text-body-sm)] rounded-[var(--br-xs)]',
    iconOnly: 'h-[32px] w-[32px] rounded-[var(--br-xs)]',
  },
  md: {
    cls: 'h-[40px] px-[var(--pad-2md)] gap-[var(--gap-md)] text-[var(--text-body-sm)] rounded-[var(--br-sm)]',
    iconOnly: 'h-[40px] w-[40px] rounded-[var(--br-sm)]',
  },
  lg: {
    cls: 'h-[48px] px-[var(--pad-lg)] gap-[var(--gap-2md)] text-[var(--text-body-md)] rounded-[12px]',
    iconOnly: 'h-[48px] w-[48px] rounded-[12px]',
  },
}

const VARIANT = {
  primary: {
    cls: `
      bg-[var(--primary-10)] text-white
      active:bg-[var(--primary-11)]
      disabled:bg-[var(--neutral-4)] disabled:text-[var(--neutral-8)] disabled:shadow-none
    `,
    shadow: COLOR_SHADOW,
  },
  secondary: {
    cls: `
      bg-[var(--secondary-9)] text-white
      active:bg-[var(--secondary-10)]
      disabled:bg-[var(--neutral-4)] disabled:text-[var(--neutral-8)] disabled:shadow-none
    `,
    shadow: NEUTRAL_SHADOW,
  },
  outlined: {
    cls: `
      bg-transparent border border-[var(--primary-9)] text-[var(--primary-9)]
      active:bg-[var(--primary-3)]
      disabled:border-[var(--neutral-6)] disabled:text-[var(--neutral-8)]
    `,
    shadow: null,
  },
  text: {
    cls: `
      bg-transparent text-[var(--primary-9)]
      active:bg-[var(--primary-3)]
      disabled:text-[var(--neutral-8)]
    `,
    shadow: null,
  },
  success: {
    cls: `
      bg-[var(--success-9)] text-white
      active:bg-[var(--success-10)]
      disabled:bg-[var(--neutral-4)] disabled:text-[var(--neutral-8)] disabled:shadow-none
    `,
    shadow: NEUTRAL_SHADOW,
  },
  error: {
    cls: `
      bg-[var(--error-9)] text-white
      active:bg-[var(--error-10)]
      disabled:bg-[var(--neutral-4)] disabled:text-[var(--neutral-8)] disabled:shadow-none
    `,
    shadow: NEUTRAL_SHADOW,
  },
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  iconOnly = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
}) {
  const { cls: sizeClass, iconOnly: iconOnlyClass } = SIZE[size]
  const { cls: variantClass, shadow } = VARIANT[variant]

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? {} : { scale: 0.95 }}
      style={shadow && !disabled ? { boxShadow: shadow } : undefined}
      className={`
        inline-flex items-center justify-center
        font-semibold
        select-none cursor-pointer
        transition-colors duration-100
        outline-none
        disabled:cursor-not-allowed
        ${iconOnly ? iconOnlyClass : sizeClass}
        ${variantClass}
        ${className}
      `}
    >
      {iconLeft  && <span className="flex items-center">{iconLeft}</span>}
      {!iconOnly && children}
      {iconRight && <span className="flex items-center">{iconRight}</span>}
      {iconOnly  && (iconLeft ?? iconRight ?? children)}
    </motion.button>
  )
}
