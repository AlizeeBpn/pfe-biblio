import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

/* ── Book data ── */
const BOOKS_DATA = [
  { color: '#3a7ca5', title: 'La Nuit\ndes Temps'  },
  { color: '#d4813a', title: 'Le Petit\nPrince'    },
  { color: '#2e8b57', title: 'Germinal'             },
  { color: '#7b4fa8', title: 'Les\nMiséra-\nbles'  },
  { color: '#b03232', title: 'Madame\nBovary'       },
];

const BW = 0.28;   // book width
const BH = 0.80;   // book height
const BD = 0.14;   // book depth (spine)
const GAP = 0.06;  // gap between books

/* ── Single book mesh with hover tilt ── */
function Book({ position, color, title }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    // Tilt forward on hover (negative X rotation = lean toward camera)
    const targetX = hovered ? -0.28 : 0;
    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) * Math.min(1, dt * 7);
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Book body */}
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true);  }}
        onPointerOut ={(e) => { e.stopPropagation(); setHovered(false); }}
        castShadow
      >
        <boxGeometry args={[BW, BH, BD]} />
        {/* material array: +X, -X spine, +Y, -Y, +Z front, -Z back */}
        <meshStandardMaterial attach="material-0" color={color} roughness={0.7} />
        <meshStandardMaterial attach="material-1" color={color} roughness={0.5} />
        <meshStandardMaterial attach="material-2" color={color} roughness={0.8} />
        <meshStandardMaterial attach="material-3" color={color} roughness={0.8} />
        <meshStandardMaterial attach="material-4" color={color} roughness={0.3} metalness={0.05} />
        <meshStandardMaterial attach="material-5" color={color} roughness={0.8} />
      </mesh>

      {/* Title on front face */}
      <Text
        position={[0, 0, BD / 2 + 0.005]}
        fontSize={0.065}
        color="rgba(255,255,255,0.92)"
        maxWidth={BW - 0.04}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        lineHeight={1.3}
      >
        {title}
      </Text>
    </group>
  );
}

/* ── Wooden shelf plank ── */
function Shelf() {
  const totalW = BOOKS_DATA.length * (BW + GAP) + 0.24;
  return (
    <mesh position={[0, -BH / 2 - 0.05, 0]} receiveShadow>
      <boxGeometry args={[totalW, 0.08, BD + 0.12]} />
      <meshStandardMaterial color="#6b3a1f" roughness={0.85} />
    </mesh>
  );
}

/* ── Scene contents ── */
function Scene() {
  const totalW = BOOKS_DATA.length * (BW + GAP) - GAP;
  const startX = -totalW / 2 + BW / 2;

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]}  intensity={1.4} castShadow />
      <directionalLight position={[-3, 2, 3]} intensity={0.35} />

      {BOOKS_DATA.map((book, i) => (
        <Book
          key={i}
          position={[startX + i * (BW + GAP), 0, 0]}
          color={book.color}
          title={book.title}
        />
      ))}

      <Shelf />

      <OrbitControls
        enablePan={false}
        minDistance={1.5}
        maxDistance={5}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}

/* ── Public component ── */
export default function Bookshelf({ style }) {
  return (
    <div style={{ width: '100%', height: '360px', ...style }}>
      <Canvas
        shadows
        camera={{ position: [0, 0.2, 2.6], fov: 45 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
