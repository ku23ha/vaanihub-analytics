'use client';

/**
 * /login — Vaani Hub login page.
 * Fonts: General Sans (page), Satoshi Bold / General Sans Bold (headings), Inter (body/buttons)
 * Logos: Accurate SVG recreations of IISc, ArtPark, Google, Bhashini
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

// ─── Vaani logo (speech-bubble + वा + waves) ─────────────────

function VaaniHeroLogo() {
  return (
    <div className="flex items-center gap-3">
      {/* Speech-bubble icon */}
      <svg width="56" height="56" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="32" height="28" rx="7" fill="#2563EB" />
        <polygon points="6,28 14,28 9,36" fill="#2563EB" />
        <text
          x="16" y="20"
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontWeight="700"
          fontFamily="'Noto Sans Devanagari','Arial Unicode MS',sans-serif"
          dominantBaseline="middle"
        >
          वा
        </text>
        <path d="M34 9 Q38 14 34 19" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M37 6 Q42 14 37 22" stroke="#BFDBFE" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
      {/* Wordmark */}
      <div className="leading-none">
        <p className="text-3xl font-bold tracking-tight text-[#1E40AF]"
           style={{ fontFamily: "'General Sans','Satoshi',Inter,sans-serif" }}>
          Vaani
        </p>
        <p className="text-xs font-medium tracking-widest text-slate-400 uppercase"
           style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}>
          Hub Platform
        </p>
      </div>
    </div>
  );
}

// ─── IISc Logo ────────────────────────────────────────────────

function IIScLogo() {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer decorative ring */}
        <circle cx="24" cy="24" r="22.5" stroke="#1B2E6E" strokeWidth="1.2" fill="#FFFDF4" />
        {/* Inner ring */}
        <circle cx="24" cy="24" r="16" stroke="#1B2E6E" strokeWidth="0.8" fill="none" />
        {/* Wreath leaves (left arc) */}
        {[-70,-55,-40,-25,-10].map((a, i) => (
          <ellipse
            key={`l${i}`}
            cx={24 + 19.5 * Math.cos((a) * Math.PI / 180)}
            cy={24 + 19.5 * Math.sin((a) * Math.PI / 180)}
            rx="2.2" ry="1.1"
            transform={`rotate(${a + 90} ${24 + 19.5 * Math.cos(a * Math.PI / 180)} ${24 + 19.5 * Math.sin(a * Math.PI / 180)})`}
            fill="#2D6A1F"
          />
        ))}
        {/* Wreath leaves (right arc) */}
        {[-110,-125,-140,-155,-170].map((a, i) => (
          <ellipse
            key={`r${i}`}
            cx={24 + 19.5 * Math.cos((a) * Math.PI / 180)}
            cy={24 + 19.5 * Math.sin((a) * Math.PI / 180)}
            rx="2.2" ry="1.1"
            transform={`rotate(${a - 90} ${24 + 19.5 * Math.cos(a * Math.PI / 180)} ${24 + 19.5 * Math.sin(a * Math.PI / 180)})`}
            fill="#2D6A1F"
          />
        ))}
        {/* Torch body */}
        <rect x="22" y="19" width="4" height="9" rx="1.5" fill="#8B6409" />
        {/* Torch handle */}
        <rect x="22.5" y="27" width="3" height="5" rx="0.8" fill="#6B4E0A" />
        {/* Flame */}
        <path d="M23 19 Q24 13 25 19" fill="#FFB800" />
        <path d="M22.5 18.5 Q24 14.5 25.5 18.5" fill="#FF6B00" opacity="0.7" />
        {/* Top star/decoration */}
        <circle cx="24" cy="3.5" r="1.5" fill="#B8860B" />
        {/* Bottom text arc — IISC */}
        <path id="bottomArc" d="M 8 33 A 17 17 0 0 0 40 33" fill="none" />
        <text fontSize="3.5" fill="#1B2E6E" fontWeight="600" fontFamily="serif" letterSpacing="0.3">
          <textPath href="#bottomArc" startOffset="10%">BANGALORE · 1909</textPath>
        </text>
      </svg>
      <span className="text-[9px] font-semibold text-[#1B2E6E] text-center leading-tight"
            style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}>
        Indian Institute<br />of Science
      </span>
    </div>
  );
}

// ─── ArtPark Logo ─────────────────────────────────────────────

function ArtparkLogo() {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width="52" height="36" viewBox="0 0 52 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Globe wireframe icon */}
        {/* Outer circle */}
        <circle cx="18" cy="18" r="15" stroke="#0D3B8E" strokeWidth="1.6" fill="none" />
        {/* Equator */}
        <ellipse cx="18" cy="18" rx="15" ry="6.5" stroke="#0D3B8E" strokeWidth="1.2" fill="none" />
        {/* Vertical meridian */}
        <ellipse cx="18" cy="18" rx="6.5" ry="15" stroke="#0D3B8E" strokeWidth="1.2" fill="none" />
        {/* Tropic lines */}
        <line x1="3.2" y1="12" x2="32.8" y2="12" stroke="#0D3B8E" strokeWidth="0.7" opacity="0.5" />
        <line x1="3.2" y1="24" x2="32.8" y2="24" stroke="#0D3B8E" strokeWidth="0.7" opacity="0.5" />
        {/* ARTPARK text */}
        <text x="36" y="13" fontSize="7" fontWeight="800" fill="#0D3B8E"
              fontFamily="var(--font-inter,Inter),sans-serif" letterSpacing="0.5">
          ARTPARK
        </text>
        <text x="36" y="22" fontSize="4.2" fontWeight="500" fill="#4A6394"
              fontFamily="var(--font-inter,Inter),sans-serif">
          AI &amp; Robotics
        </text>
        <text x="36" y="29" fontSize="4.2" fontWeight="500" fill="#4A6394"
              fontFamily="var(--font-inter,Inter),sans-serif">
          Technology Park
        </text>
      </svg>
    </div>
  );
}

// ─── Google Logo ──────────────────────────────────────────────

function GoogleLogo() {
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="78" height="30" viewBox="0 0 78 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text y="24" fontSize="26" fontFamily="Arial,Helvetica,sans-serif" fontWeight="400">
          <tspan fill="#4285F4">G</tspan>
          <tspan fill="#EA4335">o</tspan>
          <tspan fill="#FBBC05">o</tspan>
          <tspan fill="#4285F4">g</tspan>
          <tspan fill="#34A853">l</tspan>
          <tspan fill="#EA4335">e</tspan>
        </text>
      </svg>
      <span className="text-[9px] text-slate-400"
            style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}>
        Supported by
      </span>
    </div>
  );
}

// ─── Bhashini Logo ────────────────────────────────────────────

function BhashiniLogo() {
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="52" height="44" viewBox="0 0 52 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Tricolor speech/language swoosh arcs — outer (saffron) */}
        <path d="M6 36 C6 18 18 8 26 8 C34 8 46 18 46 36"
              stroke="#FF9933" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        {/* Middle arc (white / very light) */}
        <path d="M9.5 36 C9.5 20 19.5 11.5 26 11.5 C32.5 11.5 42.5 20 42.5 36"
              stroke="#E8E8E8" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* Inner arc (green) */}
        <path d="M13 36 C13 22 21 15 26 15 C31 15 39 22 39 36"
              stroke="#138808" strokeWidth="4.5" fill="none" strokeLinecap="round" />

        {/* Blue letter i */}
        <circle cx="26" cy="25" r="1.8" fill="#0033A0" />
        <rect x="24.5" y="28.5" width="3" height="9" rx="1.5" fill="#0033A0" />

        {/* Small wifi arcs inside the i — language waves */}
        <path d="M21 22 Q26 18 31 22" stroke="#0033A0" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5" />
      </svg>
      <span className="text-[10px] font-bold tracking-[0.15em] text-[#0033A0]"
            style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}>
        BHASHINI
      </span>
      <span className="text-[8px] text-slate-400"
            style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}>
        MeitY, Govt. of India
      </span>
    </div>
  );
}

// ─── Login form ───────────────────────────────────────────────

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('artpark@artpark.in');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    router.push('/');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-sm font-medium text-slate-700"
          style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none ring-0 transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
          style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-sm font-medium text-slate-700"
          style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPw ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-11 text-sm text-slate-800 outline-none ring-0 transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            tabIndex={-1}
          >
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p
          className="text-xs text-red-500"
          style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}
        >
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-1 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60"
        style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}
      >
        {loading ? 'Signing in…' : 'Log in'}
      </button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function LoginPage() {
  return (
    <div
      className="flex min-h-screen bg-[#EDF2F8]"
      style={{ fontFamily: "'General Sans',Inter,sans-serif" }}
    >
      {/* ── LEFT — hero ──────────────────────────────────────── */}
      <div className="hidden flex-1 flex-col items-center justify-center gap-10 p-16 lg:flex">

        {/* Vaani logo */}
        <VaaniHeroLogo />

        {/* Tagline */}
        <div className="max-w-lg text-center">
          <h1
            className="text-[2.6rem] font-bold leading-tight tracking-tight text-slate-900"
            style={{ fontFamily: "'Satoshi','General Sans',Inter,sans-serif" }}
          >
            Capturing the language landscape for an{' '}
            <span className="text-blue-600">inclusive digital India</span>
          </h1>
          <p
            className="mt-5 text-base leading-relaxed text-slate-500"
            style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}
          >
            Project Vaani is one of the largest datasets of Indian dialects ever
            to exist. Upon completion, it will contain more than{' '}
            <strong className="text-slate-700">150,000 hours</strong> of audio
            across all districts in India.
          </p>
        </div>

        {/* Institution logos */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-10">
          <IIScLogo />
          <ArtparkLogo />
          <GoogleLogo />
          <BhashiniLogo />
        </div>
      </div>

      {/* ── RIGHT — login card ────────────────────────────────── */}
      <div className="flex w-full items-center justify-center bg-white px-8 py-16 shadow-2xl lg:w-[420px] lg:min-h-screen">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="mb-8 flex justify-center lg:hidden">
            <VaaniHeroLogo />
          </div>

          {/* Card header */}
          <div className="mb-8">
            <h2
              className="text-2xl font-bold text-slate-900"
              style={{ fontFamily: "'Satoshi','General Sans',Inter,sans-serif" }}
            >
              Welcome back!
            </h2>
            <p
              className="mt-1 text-sm text-slate-500"
              style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}
            >
              Sign in to access the Vaani Hub platform.
            </p>
          </div>

          <LoginForm />

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-xs text-slate-300"
                  style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}>
              IISc · ArtPark
            </span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          {/* Footer */}
          <p
            className="text-center text-xs text-slate-400"
            style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}
          >
            © {new Date().getFullYear()} Project Vaani · Indian Institute of Science, Bangalore
          </p>
        </div>
      </div>
    </div>
  );
}
