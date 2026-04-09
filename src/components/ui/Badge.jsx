
/**
 * Badge — compact label for status / categorisation
 *
 * size    : 'small' | 'medium' | 'large'
 * variant : 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral'
 * icon    : ReactNode (optional — Tabler icon)
 */

const sizes = {
  small: {
    height:   'var(--sz-2xs)',   // 20px
    padding:  '0 var(--pad-2xs)', // 0 4px
    gap:      'var(--gap-2xs)',   // 2px
    fontSize: '10px',
  },
  medium: {
    height:   'var(--sz-xs)',    // 24px
    padding:  '0 var(--pad-xs)', // 0 6px
    gap:      'var(--gap-xs)',   // 4px
    fontSize: '12px',
  },
  large: {
    height:   'var(--sz-sm)',    // 28px
    padding:  '0 var(--pad-sm)', // 0 8px
    gap:      'var(--gap-sm)',   // 6px
    fontSize: '12px',
  },
};

const variants = {
  primary:   { bg: 'var(--primary-3)',   text: 'var(--primary-11)'   },
  secondary: { bg: 'var(--secondary-3)', text: 'var(--secondary-11)' },
  success:   { bg: 'var(--success-3)',   text: 'var(--success-11)'   },
  warning:   { bg: 'var(--warning-3)',   text: 'var(--warning-11)'   },
  error:     { bg: 'var(--error-3)',     text: 'var(--error-11)'     },
  neutral:   { bg: 'var(--neutral-3)',   text: 'var(--neutral-11)'   },
};

export const Badge = ({ children, size = 'medium', variant = 'secondary', icon }) => {
  const s = sizes[size];
  const v = variants[variant];

  return (
    <div
      className="inline-flex items-center justify-center font-sans font-medium uppercase tracking-wider"
      style={{
        height:          s.height,
        padding:         s.padding,
        gap:             s.gap,
        backgroundColor: v.bg,
        color:           v.text,
        borderRadius:    'var(--br-2xs)',  // 4px
        fontSize:        s.fontSize,
      }}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </div>
  );
};

export default Badge;
