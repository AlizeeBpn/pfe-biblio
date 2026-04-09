import { motion } from 'framer-motion';

/**
 * RoundIcon — circular icon container for status or action
 *
 * icon    : Tabler icon component (e.g. IconHome)
 * size    : 'small' | 'medium' | 'large'
 * variant : 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral'
 * onClick : () => void — makes it tappable (optional)
 */

/*
 * Token mapping (Figma → our tokens.css)
 *   --padding-pad-sm                      → --pad-sm   (8px)
 *   --padding-pad-md                      → --pad-md   (12px)
 *   --border-radius-br-round              → --br-round (9999px)
 *   --color-primary-primary-solid-subtle-3 → --primary-3
 *   --color-primary-primary-solid-9       → --primary-9
 *   (same pattern for all semantic scales)
 */

const sizes = {
  small: {
    box:         '32px',
    padding:     'var(--pad-sm)',  // 8px
    iconSize:    16,
    strokeWidth: 1.8,
  },
  medium: {
    box:         '40px',
    padding:     '8px',
    iconSize:    20,
    strokeWidth: 2,
  },
  large: {
    box:         '44px',
    padding:     'var(--pad-md)', // 12px
    iconSize:    24,
    strokeWidth: 2,
  },
};

const variants = {
  primary:   { bg: 'var(--primary-3)',   color: 'var(--primary-9)'   },
  secondary: { bg: 'var(--secondary-3)', color: 'var(--secondary-9)' },
  success:   { bg: 'var(--success-3)',   color: 'var(--success-9)'   },
  warning:   { bg: 'var(--warning-3)',   color: 'var(--warning-9)'   },
  error:     { bg: 'var(--error-3)',     color: 'var(--error-9)'     },
  neutral:   { bg: 'var(--neutral-3)',   color: 'var(--neutral-9)'   },
};

export const RoundIcon = ({
  icon: Icon,
  size = 'medium',
  variant = 'primary',
  onClick,
}) => {
  const s = sizes[size];
  const v = variants[variant];

  const el = (
    <div
      className="inline-flex items-center justify-center shrink-0"
      style={{
        width:           s.box,
        height:          s.box,
        padding:         s.padding,
        backgroundColor: v.bg,
        color:           v.color,
        borderRadius:    'var(--br-round)',
      }}
    >
      {Icon && <Icon size={s.iconSize} strokeWidth={s.strokeWidth} />}
    </div>
  );

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        whileTap={{ scale: 0.92 }}
        className="outline-none cursor-pointer bg-transparent border-none p-0"
      >
        {el}
      </motion.button>
    );
  }

  return el;
};

export default RoundIcon;
