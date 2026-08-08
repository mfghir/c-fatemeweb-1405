"use client";

// Original hand-drawn-style line-art character illustrations (own compositions,
// not copies of any reference art) — thick black outlines, black-filled hair and
// dark clothing, light fills for skin/clothing, one small brand-blue accent per
// scene. Colored with the site's own CSS variables so they hold up across themes.

const INK = "var(--illustration-ink, #1B1B1B)";
const SKIN = "var(--illustration-skin, #F4E4D4)";
const PAPER = "var(--card)";
const BLUE = "var(--primary)";

const STROKE = { stroke: INK, strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

// Person sitting, laptop on lap, one hand raised mid-thought — for "About".
export function AboutIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden fill="none">
      {/* bench */}
      <line x1="30" y1="168" x2="170" y2="168" {...STROKE} />
      {/* legs */}
      <path d="M78 150 Q70 168 55 172" fill={INK} {...STROKE} />
      <path d="M118 150 Q128 168 145 172" fill={INK} {...STROKE} />
      {/* torso / sweater */}
      <path d="M65 96 Q60 130 68 150 L128 150 Q136 130 130 96 Q98 78 65 96Z" fill={PAPER} {...STROKE} />
      {/* laptop on lap */}
      <path d="M70 128 L128 128 L120 148 L78 148 Z" fill={INK} />
      <rect x="72" y="118" width="52" height="14" rx="2" fill={BLUE} opacity="0.9" />
      {/* raised arm */}
      <path d="M70 104 Q42 92 28 74" {...STROKE} />
      <circle cx="24" cy="70" r="5" fill={PAPER} {...STROKE} />
      {/* other arm resting */}
      <path d="M126 106 Q140 118 128 130" {...STROKE} />
      {/* neck + head */}
      <rect x="90" y="76" width="16" height="14" fill={SKIN} {...STROKE} />
      <circle cx="98" cy="56" r="24" fill={SKIN} {...STROKE} />
      {/* hair */}
      <path d="M74 54 Q70 26 98 24 Q128 24 124 54 Q120 40 98 40 Q78 40 74 54Z" fill={INK} />
      {/* face */}
      <path d="M90 58 q4 3 8 0" {...STROKE} />
      <circle cx="106" cy="55" r="1.6" fill={INK} />
    </svg>
  );
}

// Person holding an oversized pencil like a tool — for "Expertise / Skills".
export function SkillsIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 220" className={className} aria-hidden fill="none">
      {/* legs */}
      <rect x="80" y="150" width="16" height="50" rx="6" fill={INK} />
      <rect x="104" y="150" width="16" height="50" rx="6" fill={INK} />
      {/* torso */}
      <path d="M72 96 Q66 130 74 154 L126 154 Q134 130 128 96 Q100 80 72 96Z" fill={PAPER} {...STROKE} />
      {/* raised arm holding pencil */}
      <path d="M118 104 Q142 90 150 62" {...STROKE} />
      <g transform="translate(150 30) rotate(28)">
        <rect x="-6" y="0" width="12" height="70" rx="4" fill={BLUE} />
        <path d="M-6 0 L6 0 L0 -16 Z" fill={SKIN} {...STROKE} />
        <rect x="-6" y="0" width="12" height="10" fill={INK} />
      </g>
      {/* other arm */}
      <path d="M78 108 Q56 118 60 138" {...STROKE} />
      <circle cx="62" cy="140" r="6" fill={SKIN} {...STROKE} />
      {/* neck + head */}
      <rect x="90" y="76" width="16" height="14" fill={SKIN} {...STROKE} />
      <circle cx="98" cy="56" r="23" fill={SKIN} {...STROKE} />
      <path d="M76 56 Q72 24 98 24 Q126 24 122 56 Q120 36 98 38 Q78 38 76 56Z" fill={INK} />
      <path d="M90 58 q4 3 8 0" {...STROKE} />
      <circle cx="106" cy="55" r="1.6" fill={INK} />
    </svg>
  );
}

// Person kneeling, watering a small sprouting plant — growth/process metaphor.
export function ProcessIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 150" className={className} aria-hidden fill="none">
      {/* ground line */}
      <line x1="10" y1="132" x2="210" y2="132" {...STROKE} opacity="0.4" />
      {/* kneeling legs */}
      <path d="M56 108 Q40 118 34 132" fill={INK} {...STROKE} />
      <path d="M92 112 Q100 122 96 132" fill={INK} {...STROKE} />
      {/* torso leaning forward */}
      <path d="M46 60 Q34 86 50 108 Q72 118 98 106 Q100 82 88 62 Q66 48 46 60Z" fill={PAPER} {...STROKE} />
      {/* extended arm to plant */}
      <path d="M92 78 Q118 82 132 100" {...STROKE} />
      {/* plant + pot */}
      <path d="M120 116 L146 116 L142 132 L124 132 Z" fill={BLUE} />
      <path d="M133 116 Q133 96 133 90" {...STROKE} />
      <path d="M133 100 Q120 92 116 80" {...STROKE} />
      <path d="M133 96 Q146 88 150 76" {...STROKE} />
      {/* watering can, other hand */}
      <path d="M50 70 Q30 60 24 44" {...STROKE} />
      <path d="M8 30 L34 30 L30 44 L14 44 Z" fill={SKIN} {...STROKE} />
      <path d="M8 34 Q-4 30 -6 22" {...STROKE} />
      <circle cx="0" cy="26" r="4" fill={PAPER} {...STROKE} />
      {/* neck + head */}
      <rect x="58" y="46" width="14" height="12" fill={SKIN} {...STROKE} />
      <circle cx="65" cy="30" r="20" fill={SKIN} {...STROKE} />
      <path d="M46 30 Q42 4 65 2 Q90 2 87 30 Q84 14 65 16 Q48 16 46 30Z" fill={INK} />
      <path d="M58 32 q4 3 7 0" {...STROKE} />
    </svg>
  );
}

// Person mid-step, holding an open envelope/letter — for "Contact".
export function ContactIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 210" className={className} aria-hidden fill="none">
      {/* back leg */}
      <path d="M84 150 Q70 172 58 196" fill={INK} {...STROKE} />
      {/* front leg */}
      <path d="M110 150 Q118 172 112 196" fill={INK} {...STROKE} />
      {/* torso */}
      <path d="M70 96 Q62 128 74 152 L118 152 Q128 128 122 96 Q96 80 70 96Z" fill={PAPER} {...STROKE} />
      {/* arm holding envelope up */}
      <path d="M116 102 Q140 92 148 66" {...STROKE} />
      <g transform="translate(122 34) rotate(-10)">
        <rect x="0" y="0" width="52" height="36" rx="3" fill={PAPER} {...STROKE} />
        <path d="M0 0 L26 20 L52 0" {...STROKE} />
        <circle cx="44" cy="8" r="4" fill={BLUE} />
      </g>
      {/* other arm resting */}
      <path d="M72 106 Q54 116 58 136" {...STROKE} />
      <circle cx="58" cy="138" r="6" fill={SKIN} {...STROKE} />
      {/* neck + head */}
      <rect x="88" y="76" width="16" height="14" fill={SKIN} {...STROKE} />
      <circle cx="96" cy="56" r="23" fill={SKIN} {...STROKE} />
      <path d="M74 56 Q70 24 96 24 Q124 24 120 56 Q118 36 96 38 Q76 38 74 56Z" fill={INK} />
      <path d="M88 58 q4 3 8 0" {...STROKE} />
      <circle cx="104" cy="55" r="1.6" fill={INK} />
    </svg>
  );
}

// Person standing beside a stack of screens/cards, pointing — for "Work".
export function WorkIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 200" className={className} aria-hidden fill="none">
      {/* legs */}
      <rect x="66" y="150" width="15" height="46" rx="6" fill={INK} />
      <rect x="88" y="150" width="15" height="46" rx="6" fill={INK} />
      {/* torso */}
      <path d="M56 96 Q50 128 60 152 L108 152 Q116 128 110 96 Q84 80 56 96Z" fill={PAPER} {...STROKE} />
      {/* pointing arm toward the cards */}
      <path d="M104 104 Q128 100 140 108" {...STROKE} />
      <circle cx="142" cy="109" r="4" fill={SKIN} {...STROKE} />
      {/* other arm resting */}
      <path d="M60 108 Q44 116 48 136" {...STROKE} />
      {/* neck + head */}
      <rect x="74" y="76" width="15" height="13" fill={SKIN} {...STROKE} />
      <circle cx="81" cy="57" r="21" fill={SKIN} {...STROKE} />
      <path d="M61 57 Q57 30 81 28 Q107 28 103 57 Q101 40 81 42 Q63 42 61 57Z" fill={INK} />
      <path d="M74 58 q4 3 7 0" {...STROKE} />
      {/* stacked project cards */}
      <rect x="150" y="118" width="56" height="40" rx="6" fill={PAPER} {...STROKE} transform="rotate(-4 178 138)" />
      <rect x="160" y="96" width="56" height="40" rx="6" fill={BLUE} transform="rotate(4 188 116)" />
      <circle cx="176" cy="112" r="3" fill="#fff" opacity="0.8" transform="rotate(4 188 116)" />
      <circle cx="186" cy="112" r="3" fill="#fff" opacity="0.6" transform="rotate(4 188 116)" />
    </svg>
  );
}
