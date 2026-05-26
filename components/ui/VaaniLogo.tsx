'use client';

/**
 * VaaniLogo — faithful SVG recreation of the official Vaani branding.
 * Includes the speech-bubble icon and the "Vaani" wordmark side-by-side.
 *
 * Usage:
 *   <VaaniLogo iconOnly size={32} />           — icon only (sidebar)
 *   <VaaniLogo size={40} />                    — icon + wordmark
 *   <VaaniLogo size={56} textSize="2xl" />     — login hero
 */

interface VaaniLogoProps {
  /** Height of the icon in px (width auto-scales with aspect ratio) */
  size?: number;
  /** Show only the icon bubble without the "Vaani" text */
  iconOnly?: boolean;
  /** Tailwind text-size class for the wordmark; defaults to "base" */
  textSize?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  className?: string;
}

/** The standalone icon: blue speech-bubble + वा + sound-wave arcs */
export function VaaniIcon({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Vaani logo icon"
    >
      {/* ── Speech bubble body ─────────────────────────────── */}
      <rect x="0" y="0" width="32" height="28" rx="7" fill="#2563EB" />
      {/* Tail pointing down-left */}
      <polygon points="6,28 14,28 9,36" fill="#2563EB" />

      {/* ── वा — Devanagari ligature in white ─────────────── */}
      <text
        x="16"
        y="20"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="700"
        fontFamily="'Noto Sans Devanagari', 'Arial Unicode MS', sans-serif"
        dominantBaseline="middle"
      >
        वा
      </text>

      {/* ── Sound-wave arcs (right side of bubble) ─────────── */}
      {/* inner arc */}
      <path
        d="M34 9 Q38 14 34 19"
        stroke="#93C5FD"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* outer arc */}
      <path
        d="M37 6 Q42 14 37 22"
        stroke="#BFDBFE"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Full logo: icon + "Vaani" wordmark */
export default function VaaniLogo({
  size = 36,
  iconOnly = false,
  textSize = 'base',
  className = '',
}: VaaniLogoProps) {
  const textCls = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  }[textSize];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <VaaniIcon size={size} />
      {!iconOnly && (
        <span
          className={`font-bold tracking-tight text-[#1E40AF] ${textCls}`}
          style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
        >
          Vaani
        </span>
      )}
    </div>
  );
}
