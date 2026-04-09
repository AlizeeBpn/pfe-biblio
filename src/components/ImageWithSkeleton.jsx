import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Composant d'image avec Skeleton intelligent
 * - Gère les ombres Figma sans les couper (boxShadow)
 * - Animation de pulsation fluide
 * - Fondu enchaîné (Cross-fade) lors du chargement
 */
export default function ImageWithSkeleton({ src, alt, className, style }) {
  const [loaded, setLoaded] = useState(false);

  // Extraction de l'ombre et des dimensions pour le conteneur parent
  // afin que l'ombre ne soit pas coupée par le overflow:hidden interne
  const { boxShadow, width, height, borderRadius, flexShrink, ...otherStyles } = style || {};

  return (
    <div 
      className={className}
      style={{ 
        ...otherStyles,
        width: width,
        height: height,
        boxShadow: boxShadow, 
        position: 'relative',
        flexShrink: flexShrink || 0,
        borderRadius: borderRadius || 'var(--br-sm)',
      }}
    >
      {/* COUCHE INTERNE : Gère l'arrondi et le rognage de l'image */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        borderRadius: borderRadius || 'inherit', 
        overflow: 'hidden',
        backgroundColor: 'var(--neutral-3)' 
      }}>
        
        {/* SKELETON (Pulsation) */}
        <AnimatePresence>
          {!loaded && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'var(--neutral-3)',
                zIndex: 2
              }}
              animate={{
                backgroundColor: ['var(--neutral-3)', 'var(--neutral-4)', 'var(--neutral-3)'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          )}
        </AnimatePresence>
        
        {/* VRAIE IMAGE */}
        <img
          src={src}
          alt={alt}
          onLoad={() => {
            // Un petit délai de 600ms permet de stabiliser l'affichage
            // et de montrer l'animation de chargement même en cas de cache rapide.
            setTimeout(() => setLoaded(true), 600);
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
        />
      </div>
      
      {/* ESPACEUR : Donne la taille réelle au div parent pour le layout React */}
      <div style={{ width: width, height: height }} />
    </div>
  );
}