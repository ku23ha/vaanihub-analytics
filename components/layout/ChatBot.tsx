'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Trash2, X, Minimize2 } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────

interface Message {
  id: number;
  from: 'bot' | 'user';
  text: string;
  time: string;
}

// ─── Simple keyword-based bot responses ──────────────────────

const RESPONSES: [RegExp, string][] = [
  [/\b(hi|hello|hey|namaste)\b/i,
    "Hi there! I'm the Vaani assistant. Ask me anything about the dataset, transcription, or platform."],
  [/\b(audio|hours|recording)\b/i,
    "Vaani has collected over 25,000+ hours of audio recordings across all Indian states and districts."],
  [/\b(transcri|speech|text)\b/i,
    "We have transcribed 3,155+ hours of speech data so far, with 1,303 hours accepted and quality-verified."],
  [/\b(language|dialect|india)\b/i,
    "Project Vaani covers all major Indian languages and dialects. The goal is 150,000+ hours covering every district in India."],
  [/\b(batch|batches)\b/i,
    "Currently 2,048 transcription batches and 260 audio batches have been submitted to the platform."],
  [/\b(analytics|visit|traffic|user)\b/i,
    "You can find real-time website analytics in the Website Analytics section of the sidebar — includes live visitors, page views, traffic sources, and more!"],
  [/\b(artpark|iisc|google|bhashini)\b/i,
    "Vaani is an initiative by IISc Bangalore and ArtPark, supported by Google and Bhashini (Ministry of Electronics & IT, Government of India)."],
  [/\b(vendor|partner)\b/i,
    "Multiple vendors contribute to the Vaani dataset. Use the 'All Vendors' filter on the Summary page to explore individual vendor contributions."],
  [/\b(download|data|download)\b/i,
    "Dataset downloads are available via the Data Downloads section once your batch is processed and approved."],
  [/\b(pending|reject|accept)\b/i,
    "Audio pending: 2.46 hrs · Accepted speech: 14,717 hrs · Rejected audio: 10,421 hrs. Quality checks ensure only verified data is accepted."],
  [/\b(thank|thanks)\b/i,
    "You're welcome! Is there anything else I can help you with?"],
  [/\b(bye|goodbye|exit)\b/i,
    "Goodbye! Feel free to return anytime you need help with Vaani."],
];

function getBotReply(text: string): string {
  for (const [pattern, reply] of RESPONSES) {
    if (pattern.test(text)) return reply;
  }
  return "That's a great question! For detailed information, please check the platform documentation or contact the Vaani team at vaani.iisc.ac.in.";
}

function nowTime() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// ─── Chat Icon SVG (organic, not flat) ───────────────────────

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
        fill="white"
        fillOpacity="0.95"
      />
      <circle cx="8" cy="11" r="1.2" fill="#2563EB" />
      <circle cx="12" cy="11" r="1.2" fill="#2563EB" />
      <circle cx="16" cy="11" r="1.2" fill="#2563EB" />
    </svg>
  );
}

// ─── Message bubble ───────────────────────────────────────────

function Bubble({ msg }: { msg: Message }) {
  const isBot = msg.from === 'bot';
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`max-w-[82%] ${isBot ? 'mr-4' : 'ml-4'}`}>
        <div
          className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
            isBot
              ? 'rounded-tl-sm bg-white text-slate-700 border border-slate-100'
              : 'rounded-tr-sm bg-blue-600 text-white'
          }`}
        >
          {msg.text}
        </div>
        <p
          className={`mt-1 text-[10px] text-slate-400 ${
            isBot ? 'text-left' : 'text-right'
          }`}
        >
          {msg.time}
        </p>
      </div>
    </motion.div>
  );
}

// ─── ChatBot component ────────────────────────────────────────

const INITIAL_MESSAGE: Message = {
  id: 0,
  from: 'bot',
  text: 'Hi! Welcome to Vaani Chatbot. Ask me anything about the dataset.',
  time: nowTime(),
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to newest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  function reset() {
    setMessages([{ ...INITIAL_MESSAGE, time: nowTime() }]);
    setInput('');
  }

  async function send() {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: Date.now(), from: 'user', text, time: nowTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate natural typing delay (600–1100ms)
    await new Promise((r) => setTimeout(r, 650 + Math.random() * 450));

    const botMsg: Message = {
      id: Date.now() + 1,
      from: 'bot',
      text: getBotReply(text),
      time: nowTime(),
    };
    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* ── Chat panel ─────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-[84px] right-5 z-50 flex w-[320px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            style={{ maxHeight: '480px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-blue-600 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-full bg-white/20">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-white">Vaani Chat Bot</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={reset}
                  className="rounded p-1 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
                  title="Clear chat"
                >
                  <Trash2 size={14} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded p-1 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
                  title="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-slate-50 px-3 py-4">
              {messages.map((msg) => (
                <Bubble key={msg.id} msg={msg} />
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-slate-100 bg-white px-4 py-3 shadow-sm">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="inline-block size-1.5 rounded-full bg-slate-400"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div className="flex items-end gap-2 border-t border-slate-100 bg-white p-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={'Type your message...\n(Shift+Enter for new line)'}
                rows={2}
                className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
              <button
                onClick={send}
                disabled={!input.trim()}
                className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition-all hover:bg-blue-700 disabled:opacity-40"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating trigger button ─────────────────────────── */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-50 flex size-13 items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-200 transition-colors hover:bg-blue-700"
        style={{ width: 52, height: 52 }}
        aria-label="Open Vaani chatbot"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <Minimize2 size={20} className="text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <ChatIcon />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
