import { useState } from 'react';

export default function Book3D({
  cover,
  title        = '',
  author:      _author      = '',
  width        = 120,
  height       = 186,
  isDetailView: _isDetailView = false,
  style        = {},
  className    = '',
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const showImage = cover && !imgFailed;

  const char  = title.trim()[0]?.toUpperCase() ?? '?';
  const hue   = (char.charCodeAt(0) * 37) % 360;
  const hue2  = (hue + 40) % 360;
  const grad  = `linear-gradient(145deg, hsl(${hue} 32% 54%), hsl(${hue2} 36% 40%))`;

  return (
    <div
      className={className}
      style={{
        width:        `${width}px`,
        height:       `${height}px`,
        flexShrink:    0,
        position:     'relative',
        overflow:     'hidden',
        borderRadius: '4px',
        background:    grad,
        ...style,
      }}
    >
      {/* Gloss top-right */}
      <div style={{
        position:      'absolute',
        top: 0, right: 0,
        width:         '60%',
        height:        '25%',
        background:    'linear-gradient(225deg, rgba(255,255,255,0.13) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex:         2,
      }} />

      {/* Placeholder — initiale + titre */}
      {!showImage && (
        <div style={{
          position:       'absolute',
          inset:           0,
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          gap:            '6px',
          padding:        '12px',
          zIndex:          1,
        }}>
          <span style={{
            fontFamily: 'var(--font-brand, Georgia, serif)',
            fontSize:   `clamp(18px, ${Math.round(width * 0.30)}px, 44px)`,
            fontWeight:  700,
            color:      'rgba(255,255,255,0.92)',
            lineHeight:  1,
            textAlign:  'center',
            userSelect: 'none',
            textShadow: '0 2px 6px rgba(0,0,0,0.25)',
          }}>
            {char}
          </span>
          {title && (
            <span style={{
              fontSize:        '7px',
              fontWeight:       600,
              color:           'rgba(255,255,255,0.70)',
              lineHeight:       1.35,
              textAlign:       'center',
              overflow:        'hidden',
              display:         '-webkit-box',
              WebkitLineClamp:  4,
              WebkitBoxOrient: 'vertical',
              userSelect:      'none',
            }}>
              {title}
            </span>
          )}
        </div>
      )}

      {/* Image de couverture */}
      {showImage && (
        <img
          src={cover}
          alt={title}
          style={{
            position:       'absolute',
            inset:           0,
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: 'top',
            opacity:         imgLoaded ? 1 : 0,
            transition:     'opacity 0.32s ease',
            zIndex:          3,
          }}
          onError={() => setImgFailed(true)}
          onLoad={(e) => {
            const img = e.currentTarget;
            if (img.naturalWidth > 10) setImgLoaded(true);
            else setImgFailed(true);
          }}
        />
      )}
    </div>
  );
}
