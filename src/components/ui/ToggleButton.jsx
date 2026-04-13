import { motion } from 'framer-motion'
import { IconX } from '@tabler/icons-react'

/**
 * ToggleButton — filter chip / tag (Figma node 159:364)
 *
 * size     : 'small' | 'medium' | 'large'
 * selected : bool
 * onChange : (selected: bool) => void
 * disabled : bool
 */

/*
 * Touch mode sizes:
 *   small  → h:var(--sz-sm)=28px   px:var(--pad-sm)=8px    gap:var(--gap-xs)=4px  radius:var(--br-xs)=6px  icon:16
 *   medium → h:var(--sz-lg)=40px   px:var(--pad-md)=12px   gap:var(--gap-sm)=6px  radius:var(--br-sm)=8px  icon:16
 *   large  → h:var(--sz-xl)=48px   px:var(--pad-2md)=16px  gap:var(--gap-md)=8px  radius:var(--br-sm)=8px  icon:20
 */
const SIZE = {
  small: {
    height:   'var(--sz-sm)',
    px:       'var(--pad-sm)',
    gap:      'var(--gap-xs)',
    radius:   'var(--br-xs)',
    fontSize: 'var(--text-body-sm)',
    iconSize: 16,
  },
  medium: {
    height:   'var(--sz-lg)',
    px:       'var(--pad-md)',
    gap:      'var(--gap-sm)',
    radius:   'var(--br-sm)',
    fontSize: 'var(--text-body-sm)',
    iconSize: 16,
  },
  large: {
    height:   'var(--sz-xl)',
    px:       'var(--pad-2md)',
    gap:      'var(--gap-md)',
    radius:   'var(--br-sm)',
    fontSize: 'var(--text-body-md)',
    iconSize: 20,
  },
}

export function ToggleButton({ children, selected = false, onChange, size = 'medium', disabled = false }) {
  const s = SIZE[size]

  return (
    <motion.button
      type="button"
      whileTap={disabled ? {} : { scale: 0.95 }}
      onClick={() => !disabled && onChange?.(!selected)}
      disabled={disabled}
      className="inline-flex items-center justify-center shrink-0 outline-none cursor-pointer overflow-hidden font-sans font-bold"
      style={{
        height:          s.height,
        paddingLeft:     s.px,
        paddingRight:    s.px,
        gap:             s.gap,
        borderRadius:    s.radius,
        fontSize:        s.fontSize,
        lineHeight:      1.5,
        border:          selected
          ? '1px solid var(--primary-8)'
          : '1px solid var(--neutral-6)',
        backgroundColor: selected ? 'var(--primary-3)' : 'var(--neutral-2)',
        color:           selected ? 'var(--primary-11)' : 'var(--neutral-11)',
        opacity:         disabled ? 0.5 : 1,
        whiteSpace:      'nowrap',
        transition:      'background-color 0.15s, border-color 0.15s, color 0.15s',
      }}
    >
      {children}
      {selected && (
        <IconX size={s.iconSize} strokeWidth={2} color="var(--primary-11)" />
      )}
    </motion.button>
  )
}

export default ToggleButton
