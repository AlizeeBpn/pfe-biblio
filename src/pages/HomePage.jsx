import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconBuildingBridge2,
  IconChevronRight,
  IconCalendarStar,
  IconRss,
  IconCalendarTime,
  IconCalendarEvent,
  IconArrowRight,
  IconSchoolBell,
  IconShoppingBagCheck,
} from '@tabler/icons-react';

import { BarButton }        from '../components/ui/BarButton';
import { BottomNavigation } from '../components/ui/BottomNavigation';
import { BookListPage }     from '../components/BookListPage';
import { BOOKS as ALL_BOOKS } from '../data/books';

/* ── Book cover asset (Figma MCP — 7-day TTL) ── */
const imgBookCover = 'https://www.figma.com/api/mcp/asset/435c7b2d-e051-4870-802b-ea1a5cf05cbf';

/* ── Sample data ── */
const RESERVED_BOOKS = ALL_BOOKS.slice(0, 5);

/* ════════════════════════════════════════════════════
   SHADOWS  (exact Figma values)
   ════════════════════════════════════════════════════ */
const SHADOW_DEPTH =       // depth-neutral-2 (header & cards)
  '0px 18px 7px 0px var(--alpha-grey-01), 0px 10px 6px 0px var(--alpha-grey-05), 0px 4px 4px 0px var(--alpha-grey-09), 0px 1px 2px 0px var(--alpha-grey-10)';

const SHADOW_OBJECT =       // object-depth-neutral-2 (book cover)
  '0px 16px 9px 0px var(--alpha-grey-05), 0px 7px 7px 0px var(--alpha-grey-09), 0px 2px 4px 0px var(--alpha-grey-10), 0px -11px 4px 0px var(--alpha-grey-01), 0px -6px 4px 0px var(--alpha-grey-05), 0px -3px 3px 0px var(--alpha-grey-09), 0px -1px 2px 0px var(--alpha-grey-10)';

/* ════════════════════════════════════════════════════
   EXACT PIXEL VALUES FROM FIGMA DEV MODE
   (fallback values extracted directly from each node)

   Badge  → h:28px  p:6px  gap:6px  radius:2px
   Card   → p:8px   radius:12px
   Cover  → radius:6px
   Header → p:16px
   ════════════════════════════════════════════════════ */

/* ── DateBadge — faithful to Figma node 311:773
   icon stroke: #7D193E = secondary-10
   text color : #2B0815 = secondary-12
*/
function DateBadge({ icon: Icon, children }) {
  return (
    <div
      className="inline-flex items-center"
      style={{
        alignSelf:       'flex-start',           // hug: never stretch in flex-col parent
        height:          '28px',
        padding:         '6px',
        gap:             '6px',
        backgroundColor: 'var(--secondary-3)',   // #F8E2EA
        borderRadius:    '2px',
      }}
    >
      {Icon && (
        <Icon
          size={20}
          strokeWidth={2}
          color="var(--secondary-10)"            // #7D193E — matches Figma vector border
          style={{ flexShrink: 0 }}
        />
      )}
      <span style={{
        fontSize:   '12px',
        fontWeight: 600,
        lineHeight: 1,
        color:      'var(--secondary-12)',       // #2B0815
        whiteSpace: 'nowrap',
      }}>
        {children}
      </span>
    </div>
  );
}

/* ── Section title — Lora Bold 20px color-text-brand ── */
function SectionTitle({ children }) {
  return (
    <p style={{
      fontFamily: 'var(--font-brand)',   // Lora
      fontWeight: 700,
      fontSize:   '20px',
      lineHeight: 1.5,
      color:      'var(--color-text-brand)', // #204140
      margin:     0,
      whiteSpace: 'nowrap',
    }}>
      {children}
    </p>
  );
}

/* ── Card shell ── */
const CARD = {
  backgroundColor: 'var(--neutral-1)',   // #fcfcfd
  borderRadius:    '12px',               // br-lg fallback
  border:          '1px solid var(--neutral-3)',
  boxShadow:       SHADOW_DEPTH,
};

/* ════════════════════════════════════════════════════
   RESERVATION CARD — Figma 585:5563
   ════════════════════════════════════════════════════ */
const SHADOW_OBJECT_BOOK =
  '0px 16px 9px 0px rgba(142,141,143,0.05), 0px 7px 7px 0px rgba(142,141,143,0.09), 0px 2px 4px 0px rgba(142,141,143,0.10), 0px -11px 4px 0px rgba(142,141,143,0.01), 0px -6px 4px 0px rgba(142,141,143,0.05), 0px -3px 3px 0px rgba(142,141,143,0.09), 0px -1px 2px 0px rgba(142,141,143,0.10)';

function ReservationCard({ books = [], count = 5, onClick }) {
  const cover1 = books[0]?.cover;
  const cover2 = books[1]?.cover;

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{ ...CARD, display: 'flex', padding: '12px 12px 0', overflow: 'hidden', cursor: 'pointer' }}
    >
      {/* Cover area — same 127px slot as BookCard, two gently tilted books */}
      <div style={{ width: '127px', flexShrink: 0, position: 'relative', overflow: 'hidden', alignSelf: 'stretch', borderRadius: '8px 8px 0 0' }}>
        {/* Back book */}
        <div style={{
          position: 'absolute', left: '6px', top: '16px',
          transform: 'rotate(-10deg)', transformOrigin: 'bottom center',
          borderRadius: '6px', width: 59, height: 91,
          backgroundColor: '#af9494', boxShadow: SHADOW_OBJECT_BOOK, overflow: 'hidden',
        }}>
          {cover1 && <img src={cover1} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
        </div>
        {/* Front book */}
        <div style={{
          position: 'absolute', left: '46px', top: '6px',
          transform: 'rotate(8deg)', transformOrigin: 'bottom center',
          borderRadius: '6px', width: 59, height: 91,
          backgroundColor: '#af9494', boxShadow: SHADOW_OBJECT_BOOK, overflow: 'hidden',
        }}>
          {cover2 && <img src={cover2} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
        </div>
      </div>

      {/* Info — same padding as BookCard content, text aligns with cards below */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4, padding: '0 0 16px 12px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 6px', backgroundColor: 'var(--success-3)', borderRadius: 2, alignSelf: 'flex-start' }}>
          <IconShoppingBagCheck size={20} strokeWidth={1.8} color="var(--success-11)" />
          <span style={{ fontSize: 12, fontWeight: 600, lineHeight: 1, color: 'var(--success-12)', whiteSpace: 'nowrap' }}>
            Disponible à Mériadeck
          </span>
        </div>
        <p style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.5, color: 'var(--color-text-title)', margin: 0 }}>
          {count} titre{count > 1 ? 's' : ''} vous attendent
        </p>
        <p style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.5, color: 'var(--color-text-body)', margin: 0 }}>
          À récupérer avant le 15 janvier
        </p>
      </div>
    </motion.div>
  );
}

export default function HomePage({ activeTab: activeTabProp, onTabChange, onScanOpen }) {
  const [activeTabInternal, setActiveTabInternal] = useState('Accueil');
  const activeTab   = activeTabProp  ?? activeTabInternal;
  const setActiveTab = onTabChange   ?? setActiveTabInternal;
  const [activeSection,    setActiveSection]    = useState(0);
  const [reservationOpen,  setReservationOpen]  = useState(false);

  if (reservationOpen) {
    return (
      <BookListPage
        title="Mes réservations"
        count={RESERVED_BOOKS.length}
        books={RESERVED_BOOKS}
        actionLabel="Annuler la réservation"
        actionColor="var(--secondary-11)"
        actionOutlined
        onAction={() => {}}
        onBack={() => setReservationOpen(false)}
      />
    );
  }

  return (
    <div
      className="min-h-dvh font-sans flex flex-col"
      style={{
        background:    'linear-gradient(180deg, var(--secondary-2) 0%, var(--neutral-2) 49.04%), var(--neutral-2)',
        paddingBottom: 'var(--layout-12)',   // 160px — floating nav clearance
      }}
    >

      {/* ══════════════════════════════════════ HEADER
          node 405:3614
          bg: secondary/background-1 (#fffafc)
          p: pad-lg → 16px (Figma fallback)
          gap: gap-2md → 12px
      */}
      <header
        className="flex items-center shrink-0"
        style={{
          gap:        '8px',                   // header outer gap = 8px
          padding:    '16px',
          background: 'var(--secondary-1)',    // #fffafc
          boxShadow:  SHADOW_DEPTH,
        }}
      >
        {/* Container — flex-row gap:12px flex-grow:1 */}
        <div className="flex items-center flex-1" style={{ gap: '12px' }}>

          {/* Round icon — secondary-4 bg, building-bridge-2 24px stroke:2 secondary-11 */}
          <div
            className="shrink-0 flex items-center justify-center"
            style={{
              width:           '40px',
              height:          '40px',
              padding:         '8px',
              backgroundColor: 'var(--secondary-4)',  // #F4D2DE
              borderRadius:    'var(--br-round)',
            }}
          >
            <IconBuildingBridge2 size={24} strokeWidth={2} color="var(--secondary-11)" />
          </div>

          {/* Text Container — flex-col gap:2px */}
          <div className="flex flex-col flex-1" style={{ gap: '2px' }}>

            {/* Title row — body-medium 16px weight:500 */}
            <div className="flex items-center" style={{ gap: '3px' }}>
              <span style={{ fontSize: '16px', fontWeight: 500, lineHeight: 1.5, color: 'var(--color-text-title)' }}>
                Bibliothèque
              </span>
              <span style={{ fontSize: '16px', fontWeight: 500, lineHeight: 1.5, color: 'var(--secondary-10)' }}>
                Mériadeck
              </span>
            </div>

            {/* Subtitle row — caption-md 12px weight:500 */}
            <div className="flex items-center" style={{ gap: '4px' }}>
              <span style={{ fontSize: '12px', fontWeight: 500, lineHeight: 1, color: 'var(--success-11)' }}>
                Ouvert
              </span>
              <span style={{ fontSize: '12px', fontWeight: 500, lineHeight: 1, color: 'var(--color-text-subtle)' }}>
                Ferme à 20h00
              </span>
            </div>
          </div>
        </div>

        {/* Chevron right — stroke:2 neutral #656366 */}
        <IconChevronRight size={24} strokeWidth={2} color="var(--color-text-subtle)" />
      </header>

      {/* ══════════════════════════════════════ MAIN */}
      <main className="flex flex-col" style={{ padding: '24px 16px 0', gap: '24px' }}>

        {/* ── BarButton — calendar-star + rss ── */}
        <BarButton
          tabs={[
            { label: 'Raccourcie',  icon: IconCalendarStar },
            { label: 'Actualitées', icon: IconRss },
          ]}
          size="medium"
          value={activeSection}
          onChange={setActiveSection}
        />

        {/* ── Sections — gap: layout-5 = 32px ── */}
        <div className="flex flex-col" style={{ gap: '32px' }}>

          {/* ════ RÉSERVATIONS ════ */}
          <section className="flex flex-col" style={{ gap: '12px' }}>
            <SectionTitle>Réservations</SectionTitle>
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, type: 'spring', stiffness: 160, damping: 16 }}
            >
              <ReservationCard
                books={RESERVED_BOOKS}
                count={RESERVED_BOOKS.length}
                onClick={() => setReservationOpen(true)}
              />
            </motion.div>
          </section>

          {/* ════ REPRENDRE LA LECTURE ════
              node 290:4471
              Card p:8px, cover 127×195px radius:6px
          */}
          <section className="flex flex-col" style={{ gap: '12px' }}>
            <SectionTitle>Reprendre la lecture</SectionTitle>

            <motion.div
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 160, damping: 16 }}
              style={{ ...CARD, padding: '8px', cursor: 'pointer' }}
            >
              <div className="flex items-center" style={{ gap: '16px', height: '195px' }}>

                {/* Book cover 127×195 radius:6px object-depth shadow */}
                <div
                  className="shrink-0 overflow-hidden relative"
                  style={{
                    width:           '127px',
                    height:          '195px',
                    borderRadius:    '6px',         // br-sm fallback
                    boxShadow:       SHADOW_OBJECT,
                    backgroundColor: '#af9494',
                  }}
                >
                  <img src={imgBookCover} alt="" className="absolute inset-0 w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 h-full" style={{ gap: '8px' }}>

                  {/* Badge — calendar-time, h:28px, p:6px, radius:2px, semibold */}
                  <DateBadge icon={IconCalendarTime}>12 janvier 2024</DateBadge>

                  {/* Title + author */}
                  <div className="flex flex-col flex-1" style={{ gap: '2px' }}>
                    <p style={{ fontSize: '16px', fontWeight: 700, lineHeight: 1.5, color: 'var(--color-text-title)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Vingt Mille Lieues Sous Les Mers
                    </p>
                    <p style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1.5, color: 'var(--color-text-body)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Jules Vernes
                    </p>
                  </div>

                  {/* Progress */}
                  <div className="flex flex-col" style={{ gap: '0px' }}>
                    <div className="flex items-center" style={{ gap: '12px' }}>
                      {/* Track — success-3, h:10px */}
                      <div
                        className="flex-1 overflow-hidden"
                        style={{ height: '10px', borderRadius: 'var(--br-round)', backgroundColor: 'var(--success-3)' }}
                      >
                        <div style={{ width: '48%', height: '100%', borderRadius: 'var(--br-round)', backgroundColor: 'var(--success-10)' }} />
                      </div>
                      {/* "48 %" — Lora Bold 700, body-md 16px, leading 1.2, success-text-11 */}
                      <span style={{ fontFamily: 'var(--font-brand)', fontSize: '16px', fontWeight: 700, lineHeight: 1.2, color: 'var(--success-11)', flexShrink: 0 }}>
                        48 %
                      </span>
                    </div>
                    {/* Pages — regular 400, body-sm 14px, leading 1.5, color-text-subtle */}
                    <p style={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.5, color: 'var(--color-text-subtle)', margin: 0 }}>
                      (124/520 pages)
                    </p>
                  </div>

                </div>
              </div>
            </motion.div>
          </section>

          {/* ════ PROCHAIN RETOUR ════ */}
          <section className="flex flex-col" style={{ gap: '12px' }}>
            <SectionTitle>Prochain retour</SectionTitle>

            <div className="flex flex-col" style={{ gap: '16px' }}>

              {/* Card — exact Figma specs:
                  card     : padding 8px 8px 0px  (no bottom padding)
                  content  : padding-bottom 12px
                  book-img : 127×119px, padding 10px, radius 6px 6px 0 0
              */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 160, damping: 16 }}
                style={{
                  ...CARD,
                  display:        'flex',
                  flexDirection:  'row',
                  justifyContent: 'flex-end',
                  alignItems:     'center',
                  padding:        '8px 8px 0px',   // ← bottom = 0
                  gap:            '16px',            // card gap
                  height:         '127px',
                  overflow:       'hidden',
                  cursor:         'pointer',
                }}
              >
                {/* content-block — flex-row, gap 12px, stretch */}
                <div
                  className="flex flex-row items-center flex-1 self-stretch"
                  style={{ gap: '12px' }}
                >
                  {/* book-img — 127px wide, fills height, padding 10px, top radius 6px only */}
                  <div
                    className="shrink-0 self-stretch overflow-hidden relative"
                    style={{
                      width:                   '127px',
                      padding:                 '10px',
                      borderTopLeftRadius:     '6px',
                      borderTopRightRadius:    '6px',
                      borderBottomLeftRadius:  0,
                      borderBottomRightRadius: 0,
                      backgroundColor:         '#af9494',
                      boxShadow:               '0px 18px 7px rgba(125,120,120,0.01), 0px 10px 6px rgba(125,120,120,0.05), 0px 4px 4px rgba(125,120,120,0.09), 0px 1px 2px rgba(125,120,120,0.1)',
                    }}
                  >
                    <img src={imgBookCover} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  </div>

                  {/* content — padding-bottom 12px, gap 8px */}
                  <div
                    className="flex flex-col flex-1"
                    style={{ gap: '8px', paddingBottom: '12px', alignSelf: 'flex-start' }}
                  >
                    <DateBadge icon={IconCalendarTime}>12 janvier 2024</DateBadge>

                    {/* content-text — gap 2px */}
                    <div className="flex flex-col" style={{ gap: '2px' }}>
                      <p style={{
                        fontSize: '16px', fontWeight: 700, lineHeight: 1.5,
                        color: 'var(--color-text-title)', margin: 0,
                        overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>
                        Vingt Mille Lieues Sous Les Mers
                      </p>
                      <p style={{
                        fontSize: '14px', fontWeight: 500, lineHeight: 1.5,
                        color: 'var(--color-text-body)', margin: 0, whiteSpace: 'nowrap',
                      }}>
                        Jules Vernes
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* "Voir tout" — right-aligned, br-sm=8px, bg-primary-3, text-primary-11 bold */}
              <div className="flex justify-end">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center outline-none"
                  style={{
                    gap:          '6px',
                    height:       '40px',
                    padding:      '0 16px',
                    borderRadius: '8px',            // br-sm
                    background:   'var(--primary-3)',
                    color:        'var(--primary-11)',
                    fontSize:     '14px',
                    fontWeight:   700,               // Bold
                    lineHeight:   1.5,
                    flexShrink:   0,
                  }}
                >
                  Voir tout (2 autres retours)
                  <IconArrowRight size={16} strokeWidth={2} />
                </motion.button>
              </div>

            </div>
          </section>

          {/* ════ PROCHAIN SERVICE RÉSERVÉ ════ */}
          <section className="flex flex-col" style={{ gap: '12px' }}>
            <SectionTitle>Prochain service réservé</SectionTitle>

            <motion.div
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 160, damping: 16 }}
              style={{ ...CARD, display: 'flex', alignItems: 'center', padding: '8px', gap: '16px', cursor: 'pointer' }}
            >

              {/* Info — flex-1, gap:4px (Figma: Info Section gap=4px) */}
              <div className="flex flex-col flex-1" style={{ gap: '4px' }}>
                <DateBadge icon={IconCalendarEvent}>9 : 00 – 10:00 | 12 janvier 2024</DateBadge>
                <div className="flex flex-col" style={{ gap: '2px' }}>
                  <p style={{ fontSize: '16px', fontWeight: 700, lineHeight: 1.5, color: 'var(--color-text-title)', margin: 0 }}>
                    Salle d'étude 4
                  </p>
                  <p style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1.5, color: 'var(--color-text-subtle)', margin: 0, whiteSpace: 'nowrap' }}>
                    Bibliothèque Mériadeck
                  </p>
                </div>
              </div>

              {/* Round icon — secondary-4, school-bell 24px stroke:2 secondary-11(#4D0F26) */}
              <div
                className="shrink-0 flex items-center justify-center"
                style={{
                  width:           '40px',
                  height:          '40px',
                  padding:         '8px',
                  backgroundColor: 'var(--secondary-4)',
                  borderRadius:    'var(--br-round)',
                }}
              >
                <IconSchoolBell size={24} strokeWidth={2} color="var(--secondary-11)" />
              </div>
            </motion.div>
          </section>

        </div>
      </main>

      {/* ══════════════════════════════════════ BOTTOM NAV */}
      <BottomNavigation activeTab={activeTab} onChange={setActiveTab} />

    </div>
  );
}
