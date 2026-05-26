'use client';

/**
 * /login — Vaani Hub login page.
 *
 * Logos fetched directly from vaani.iisc.ac.in (same source as the official site).
 * Drop local replacements in public/assets/ and swap the src strings if needed:
 *   IISc    → /assets/IIScLogo.png
 *   ArtPark → /assets/ArtParkLogo.png
 *   Google  → /assets/GoogleLogo.png
 *
 * Vaani logo: official PNG from vaani.iisc.ac.in, rendered at 66×40 px
 * (width/height match the CSS computed values on the live site).
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

// ── Logo source constants ─────────────────────────────────────
// These point directly to the static-media PNGs on vaani.iisc.ac.in.
// To use local files instead, copy your PNGs to public/assets/ and
// replace these URLs with  "/assets/IIScLogo.png"  etc.

const VAANI_LOGO =
  'https://vaani.iisc.ac.in/_next/static/media/vaanilogo.0-oraabwmshye.png';

const IISC_LOGO =
  'https://vaani.iisc.ac.in/_next/static/media/IIScLogo.13ytnzjgncqy3.png';

const ARTPARK_LOGO =
  'https://vaani.iisc.ac.in/_next/static/media/ARTPARK.12e7o~rm0pv0i.png';

const GOOGLE_LOGO =
  'https://vaani.iisc.ac.in/_next/static/media/GoogleLogo.162pwy-4iu03s.png';

// ─── Vaani hero logo ──────────────────────────────────────────

function VaaniHeroLogo() {
  return (
    <div className="flex items-center gap-3">
      {/*
       * Official Vaani logo image — 66×40 px matches the computed CSS on
       * vaani.iisc.ac.in (width: 65.84 px, height: 39.86 px).
       * The image has an intrinsic ~150×150 export but renders narrower
       * due to the natural PNG dimensions; we mirror that exactly here.
       */}
      <Image
        src={VAANI_LOGO}
        alt="Vaani logo"
        width={150}
        height={150}
        priority
        style={{ width: '66px', height: '40px', objectFit: 'contain' }}
      />
      <div className="leading-none">
        <p
          className="text-3xl font-bold tracking-tight text-[#1E40AF]"
          style={{ fontFamily: "'General Sans','Satoshi',Inter,sans-serif" }}
        >
          Vaani
        </p>
        <p
          className="text-xs font-medium tracking-widest text-slate-400 uppercase"
          style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}
        >
          Hub Platform
        </p>
      </div>
    </div>
  );
}

// ─── Institution logos ────────────────────────────────────────

function Logos() {
  return (
    <div className="mt-2 flex items-center justify-center gap-10 flex-wrap">

      {/* IISc */}
      <div className="flex items-center justify-center">
        <Image
          src={IISC_LOGO}
          alt="IISc"
          width={150}
          height={150}
          priority
          style={{ width: '70px', height: 'auto', objectFit: 'contain' }}
          className="opacity-90 hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* ARTPARK */}
      <div className="flex items-center justify-center">
        <Image
          src={ARTPARK_LOGO}
          alt="ARTPARK"
          width={500}
          height={120}
          priority
          style={{ width: '190px', height: 'auto', objectFit: 'contain' }}
          className="opacity-90 hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Google */}
      <div className="flex flex-col items-center justify-center gap-1">
        <span
          className="text-xs text-gray-400 tracking-wide"
          style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}
        >
          Supported by
        </span>
        <Image
          src={GOOGLE_LOGO}
          alt="Google"
          width={500}
          height={120}
          priority
          style={{ width: '150px', height: 'auto', objectFit: 'contain' }}
          className="opacity-90 hover:opacity-100 transition-opacity duration-300"
        />
      </div>
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

      {error && (
        <p
          className="text-xs text-red-500"
          style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}
        >
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
        <Logos />
      </div>

      {/* ── RIGHT — login card ────────────────────────────────── */}
      <div className="flex w-full items-center justify-center bg-white px-8 py-16 shadow-2xl lg:w-[420px] lg:min-h-screen">
        <div className="w-full max-w-sm">

          {/* Mobile — show logo only on small screens */}
          <div className="mb-8 flex justify-center lg:hidden">
            <VaaniHeroLogo />
          </div>

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

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-100" />
            <span
              className="text-xs text-slate-300"
              style={{ fontFamily: "var(--font-inter,Inter),sans-serif" }}
            >
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
