'use client';

/**
 * /login — Vaani Hub login page.
 * Left panel: heading quote + 4 institution logos (no Vaani branding — clean look)
 * Right panel: login card with Vaani logo mark
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

// ── Logo URLs ─────────────────────────────────────────────────
const VAANI_LOGO =
  'https://vaani.iisc.ac.in/_next/static/media/vaanilogo.0-oraabwmshye.png';
const IISC_LOGO =
  'https://vaani.iisc.ac.in/_next/static/media/IIScLogo.13ytnzjgncqy3.png';
const ARTPARK_LOGO =
  'https://vaani.iisc.ac.in/_next/static/media/ARTPARK.12e7o~rm0pv0i.png';
const GOOGLE_LOGO =
  'https://vaani.iisc.ac.in/_next/static/media/GoogleLogo.162pwy-4iu03s.png';
const BHASHINI_LOGO =
  'https://translation-plugin.bhashini.co.in/media-utilities/bhashini-logo.png';

// ─── 4 institution logos ──────────────────────────────────────

function Logos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10">

      {/* IISc */}
      <Image
        src={IISC_LOGO}
        alt="Indian Institute of Science"
        width={200}
        height={200}
        priority
        style={{ width: '100px', height: 'auto', objectFit: 'contain' }}
        className="opacity-90 hover:opacity-100 transition-opacity duration-300"
      />

      {/* ARTPARK */}
      <Image
        src={ARTPARK_LOGO}
        alt="ARTPARK"
        width={600}
        height={150}
        priority
        style={{ width: '220px', height: 'auto', objectFit: 'contain' }}
        className="opacity-90 hover:opacity-100 transition-opacity duration-300"
      />

      {/* Google */}
      <div className="flex flex-col items-center gap-1">
        <span
          className="text-[11px] text-gray-400 tracking-wide"
          style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}
        >
          Supported by
        </span>
        <Image
          src={GOOGLE_LOGO}
          alt="Google"
          width={600}
          height={150}
          priority
          style={{ width: '180px', height: 'auto', objectFit: 'contain' }}
          className="opacity-90 hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Bhashini */}
      <Image
        src={BHASHINI_LOGO}
        alt="Bhashini"
        width={400}
        height={120}
        priority
        style={{ width: '160px', height: 'auto', objectFit: 'contain' }}
        className="opacity-90 hover:opacity-100 transition-opacity duration-300"
      />
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

      {error && (
        <p className="text-xs text-red-500" style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}>
          {error}
        </p>
      )}

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
    <div className="flex min-h-screen bg-[#EDF2F8]">

      {/* ── LEFT — hero (hidden on mobile) ───────────────────── */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center gap-12 px-16 py-20">

        {/* Quote heading — matches vaani.iisc.ac.in style */}
        <div className="max-w-[560px] text-center">
          <h1
            className="text-[2.75rem] font-bold leading-[1.2] tracking-tight text-[#111827]"
            style={{ fontFamily: "'Inter var',Inter,ui-sans-serif,system-ui,sans-serif" }}
          >
            Capturing the language landscape for an inclusive{' '}
            <span className="text-[#4A80F0]">digital India</span>
          </h1>
        </div>

        {/* Institution logos — 4 logos, larger sizes */}
        <Logos />
      </div>

      {/* ── RIGHT — login card ────────────────────────────────── */}
      <div className="flex w-full items-center justify-center bg-white px-8 py-16 shadow-2xl lg:w-[420px] lg:min-h-screen">
        <div className="w-full max-w-sm">

          {/* Vaani logo — top of card */}
          <div className="mb-8 flex items-center gap-3">
            <Image
              src={VAANI_LOGO}
              alt="Vaani"
              width={150}
              height={150}
              priority
              style={{ width: '66px', height: '40px', objectFit: 'contain' }}
            />
            <div className="leading-none">
              <p
                className="text-xl font-bold tracking-tight text-[#1E40AF]"
                style={{ fontFamily: "'Inter var',Inter,sans-serif" }}
              >
                Vaani
              </p>
              <p
                className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase"
                style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}
              >
                Hub Platform
              </p>
            </div>
          </div>

          {/* Mobile logos (only below lg breakpoint) */}
          <div className="mb-8 lg:hidden">
            <Logos />
          </div>

          <div className="mb-8">
            <h2
              className="text-2xl font-bold text-slate-900"
              style={{ fontFamily: "'Inter var',Inter,sans-serif" }}
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

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-xs text-slate-300" style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}>
              IISc · ArtPark
            </span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

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
