import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * BarButton — Segmented Control
 *
 * tabs    : string[] | { label: string, icon?: ComponentType }[]
 * size    : 'small' | 'medium' | 'large'
 * value   : number — controlled active index
 * onChange: (index: number) => void
 */

const configs = {
  small: {
    padding:   'var(--pad-xs)',   // 6px
    gap:       'var(--gap-2xs)',  // 2px
    radius:    'var(--br-md)',    // 10px
    btnRadius: 'var(--br-xs)',    // 6px
    height:    '32px',
    fontSize:  '12px',
    iconSize:  16,
  },
  medium: {
    padding:   'var(--pad-xs)',   // 6px — Figma: padding 6px
    gap:       'var(--gap-2xs)',  // 2px
    radius:    'var(--br-md)',    // 10px — Figma: border-radius 10px
    btnRadius: 'var(--br-sm)',    // 8px  — Figma: border-radius 8px
    height:    '40px',            // Figma: height 40px
    fontSize:  '14px',
    iconSize:  20,                // Figma: icon 20×20px
  },
  large: {
    padding:   'var(--pad-xs)',   // 6px
    gap:       'var(--gap-2xs)',  // 2px
    radius:    'var(--br-md)',    // 10px
    btnRadius: 'var(--br-sm)',    // 8px
    height:    '48px',
    fontSize:  '14px',
    iconSize:  20,
  },
};

export const BarButton = ({
  tabs = ['Bouton', 'Bouton'],
  size = 'medium',
  value,
  onChange,
}) => {
  const [internalActive, setInternalActive] = useState(0);
  const isControlled = value !== undefined;
  const activeIndex  = isControlled ? value : internalActive;

  const handleClick = (index) => {
    if (!isControlled) setInternalActive(index);
    onChange?.(index);
  };

  const c = configs[size];

  return (
    <div
      className="flex items-center w-full"
      style={{
        backgroundColor: 'var(--neutral-3)',
        padding:         c.padding,
        gap:             c.gap,
        borderRadius:    c.radius,
      }}
    >
      {tabs.map((tab, index) => {
        const isActive = activeIndex === index;
        const label    = typeof tab === 'string' ? tab : tab.label;
        const Icon     = typeof tab === 'string' ? null : tab.icon;

        return (
          <motion.button
            key={index}
            type="button"
            onClick={() => handleClick(index)}
            whileTap={{ scale: 0.96 }}
            className="flex-1 flex items-center justify-center font-sans font-bold transition-colors duration-150 outline-none"
            style={{
              height:          c.height,
              fontSize:        c.fontSize,
              gap:             'var(--gap-sm)',    // 6px — Figma: gap-sm
              borderRadius:    c.btnRadius,
              backgroundColor: isActive ? 'var(--neutral-1)' : 'transparent',
              color:           'var(--neutral-11)',
              border:          isActive ? '2px solid var(--neutral-7)' : '2px solid transparent',
              paddingLeft:     'var(--pad-2md)',   // 16px — Figma: padding 0px 16px
              paddingRight:    'var(--pad-2md)',
            }}
          >
            {Icon && <Icon size={c.iconSize} strokeWidth={2} color="var(--neutral-10)" />}
            {label}
          </motion.button>
        );
      })}
    </div>
  );
};

export default BarButton;
