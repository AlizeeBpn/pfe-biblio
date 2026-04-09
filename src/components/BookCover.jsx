import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BookCover — gradient fallback + skeleton pendant le chargement + image par-dessus.
 */
export default function BookCover({ cover, title = '', style = {}, className = '', imgStyle = {} }) {
  const [failed,  setFailed]  = useState(false);
  const [loaded,  setLoaded]  = useState(false);

  const initial = title.trim()[0]?.toUpperCase() ?? '?';
  const showImage = cover && !failed;

  const hue = (initial.charCodeAt(0) * 37) % 360;
  const fallbackGradient = `linear-gradient(145deg, hsl(${hue} 35% 55%), hsl(${(hue + 40) % 360} 40% 40%))`;

  return (
    <div
      className={className}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
    >
      {/* Gradient + initial — toujours en base */}
      <div
        style={{
          position:       'absolute',
          inset:           0,
          background:      fallbackGradient,
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-brand)',
            fontSize:   'clamp(28px, 40%, 56px)',
            fontWeight: 700,
            color:      'rgba(255,255,255,0.9)',
            lineHeight:  1,
            userSelect: 'none',
          }}
        >
          {initial}
        </span>
      </div>

      {/* Skeleton pulsant — visible tant que l'image n'est pas chargée */}
      <AnimatePresence>
        {showImage && !loaded && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            animate={{ backgroundColor: ['var(--neutral-3)', 'var(--neutral-4)', 'var(--neutral-3)'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', inset: 0, zIndex: 2 }}
          />
        )}
      </AnimatePresence>

      {/* Image */}
      {showImage && (
        <img
          src={cover}
          alt={title}
          style={{
            position:      'absolute',
            inset:          0,
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: 'top',
            opacity:        loaded ? 1 : 0,
            transition:     'opacity 0.35s ease',
            zIndex:          3,
            ...imgStyle,
          }}
          onError={() => setFailed(true)}
          onLoad={(e) => {
            const img = e.currentTarget;
            if (img.naturalWidth <= 10 || img.naturalHeight <= 10) { setFailed(true); return; }
            setLoaded(true);
          }}
        />
      )}
    </div>
  );
}
