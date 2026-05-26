'use client';

/**
 * /login — Vaani Hub login page.
 * Matches the official Vaani landing + login card layout from the screenshot.
 * No sidebar (auth route excluded from AppShell).
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import VaaniLogo from '@/components/ui/VaaniLogo';

// ─── Institution logo placeholders ───────────────────────────

function IIScLogo() {
  return (
    <div className="flex flex-col items-center">
      {/* Simplified emblem shape */}
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="20" stroke="#1a365d" strokeWidth="2" fill="none" />
        <circle cx="22" cy="22" r="13" stroke="#1a365d" strokeWidth="1.5" fill="none" />
        <circle cx="22" cy="22" r="4" fill="#1a365d" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line
            key={deg}
            x1="22" y1="22"
            x2={22 + 11 * Math.cos((deg * Math.PI) / 180)}
            y2={22 + 11 * Math.sin((deg * Math.PI) / 180)}
            stroke="#1a365d"
            strokeWidth="1"
          />
        ))}
      </svg>
      <span className="mt-1 text-[9px] font-semibold text-slate-600 text-center leading-tight">
        Indian Institute<br />of Science
      </span>
    </div>
  );
}

function ArtparkLogo() {
  return (
    <div className="flex flex-col items-center">
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <polygon points="22,4 40,36 4,36" stroke="#0f766e" strokeWidth="2" fill="#ccfbf1" />
        <text x="22" y="31" textAnchor="middle" fill="#0f766e" fontSize="8" fontWeight="700">AI</text>
      </svg>
      <span className="mt-1 text-[9px] font-semibold text-teal-700 text-center leading-tight">
        ARTPARK
      </span>
    </div>
  );
}

function GoogleLogo() {
  return (
    <div className="flex flex-col items-center">
      <svg width="44" height="28" viewBox="0 0 74 24" fill="none">
        <text x="0" y="20" fontSize="22" fontWeight="400" fontFamily="'Product Sans', Arial, sans-serif">
          <tspan fill="#4285F4">G</tspan>
          <tspan fill="#EA4335">o</tspan>
          <tspan fill="#FBBC04">o</tspan>
          <tspan fill="#4285F4">g</tspan>
          <tspan fill="#34A853">l</tspan>
          <tspan fill="#EA4335">e</tspan>
        </text>
      </svg>
      <span className="text-[9px] text-slate-400">Supported by</span>
    </div>
  );
}

function BhashiniLogo() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex size-11 items-center justify-center rounded-full bg-orange-50 border-2 border-orange-200">
        <span className="text-xs font-bold text-orange-600">भा</span>
      </div>
      <span className="mt-1 text-[9px] font-semibold text-orange-700 text-center leading-tight">
        Bhashini
      </span>
      <span className="text-[8px] text-slate-400">Support of</span>
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
    if (!email || !password) { setError('Please enter your email and password.'); return; }
    setError('');
    setLoading(true);
    // Simulated auth — replace with real auth endpoint
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    router.push('/');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none ring-0 transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-slate-700">
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
      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-1 w-full rounded-xl bg-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-blue-600 hover:text-white disabled:opacity-60"
      >
        {loading ? 'Signing in…' : 'Log in'}
      </button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-[#eef2f7]">

      {/* ── LEFT — hero ──────────────────────────────────── */}
      <div className="hidden flex-1 flex-col items-center justify-center gap-8 p-16 lg:flex">

        {/* Vaani logo + name */}
        <VaaniLogo size={52} textSize="3xl" />

        {/* Tagline */}
        <div className="max-w-lg text-center">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900">
            Capturing the language landscape for an inclusive{' '}
            <span className="text-blue-600">digital India</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-500">
            Project Vaani is one of the largest datasets of Indian dialects ever
            to exist. Upon completion, it will contain more than 150,000 hours of
            audio across all districts in India.
          </p>
        </div>

        {/* Institution logos */}
        <div className="mt-4 flex flex-wrap items-end justify-center gap-8">
          <IIScLogo />
          <ArtparkLogo />
          <GoogleLogo />
          <BhashiniLogo />
        </div>
      </div>

      {/* ── RIGHT — login card ───────────────────────────── */}
      <div className="flex w-full items-center justify-center bg-white px-8 py-16 shadow-2xl lg:w-[400px] lg:min-h-screen lg:rounded-none">
        <div className="w-full max-w-sm">

          {/* Mobile logo (only visible when left panel is hidden) */}
          <div className="mb-8 flex justify-center lg:hidden">
            <VaaniLogo size={44} textSize="xl" />
          </div>

          {/* Card header */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900">Welcome back!</h2>
            <p className="mt-1 text-sm text-slate-500">Please enter your details.</p>
          </div>

          <LoginForm />

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Vaani · IISc Bangalore · ArtPark
          </p>
        </div>
      </div>
    </div>
  );
}
