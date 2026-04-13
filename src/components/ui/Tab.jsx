import { motion } from 'framer-motion'

/**
 * Tab — single underline tab button (Figma node 382:3901)
 *
 * isActive : bool
 * onClick  : () => void
 */
export function Tab({ children, isActive = false, onClick }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center justify-center outline-none border-none bg-transparent cursor-pointer shrink-0"
      style={{
        gap:           'var(--gap-md)',  /* 8px */
        paddingLeft:   'var(--pad-sm)',  /* 6px */
        paddingRight:  'var(--pad-sm)',
        paddingTop:    'var(--pad-xs)',  /* 4px */
        paddingBottom: 'var(--pad-xs)',
      }}
    >
      <span style={{
        fontSize:   'var(--text-body-md)',
        fontWeight: 700,
        lineHeight: 1.5,
        color:      isActive ? 'var(--primary-11)' : 'var(--neutral-10)',
        whiteSpace: 'nowrap',
      }}>
        {children}
      </span>
      <div style={{
        height:          '4px',
        width:           '40px',
        borderRadius:    '2px',
        backgroundColor: isActive ? 'var(--primary-9)' : 'transparent',
        transition:      'background-color 0.15s',
      }} />
    </motion.button>
  )
}

/**
 * TabList — row of Tab buttons
 *
 * tabs     : string[]
 * value    : number — active index
 * onChange : (index: number) => void
 */
export function TabList({ tabs, value, onChange }) {
  return (
    <div className="flex items-start w-full">
      {tabs.map((tab, i) => (
        <Tab key={tab} isActive={value === i} onClick={() => onChange(i)}>
          {tab}
        </Tab>
      ))}
    </div>
  )
}

export default Tab
