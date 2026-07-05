import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const PETALS = ["🌸", "🌷", "🌹", "💮", "🌸"];

function Petal({ style }: { style: React.CSSProperties }) {
  return (
    <span className="petal" style={style} aria-hidden="true">
      {PETALS[Math.floor(Math.random() * PETALS.length)]}
    </span>
  );
}

export default function Landing() {
  const [, setLocation] = useLocation();
  const [digits, setDigits] = useState<string[]>([]);
  const [unlocking, setUnlocking] = useState(false);
  const [petals] = useState(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 96 + 2}%`,
      animationDelay: `${Math.random() * 6}s`,
      animationDuration: `${5 + Math.random() * 5}s`,
      fontSize: `${0.8 + Math.random() * 0.8}rem`,
    }))
  );

  const handleDigit = useCallback(
    (d: string) => {
      if (unlocking) return;
      setDigits((prev) => {
        if (prev.length >= 4) return prev;
        const next = [...prev, d];
        if (next.length === 4) {
          const code = next.join("");
          if (code === "0729") {
            setUnlocking(true);
            setTimeout(() => setLocation("/menu"), 900);
          } else {
            setTimeout(() => setDigits([]), 700);
          }
        }
        return next;
      });
    },
    [unlocking, setLocation]
  );

  const handleDelete = useCallback(() => {
    if (unlocking) return;
    setDigits((prev) => prev.slice(0, -1));
  }, [unlocking]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") handleDigit(e.key);
      else if (e.key === "Backspace") handleDelete();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleDigit, handleDelete]);

  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["⌫", "0", "♡"],
  ];

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      data-testid="page-landing"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-anniversary"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "soft-light",
        }}
      />
      <div className="absolute inset-0 bg-anniversary opacity-70" />

      {/* Falling petals */}
      {petals.map((p) => (
        <Petal
          key={p.id}
          style={{
            left: p.left,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration,
            fontSize: p.fontSize,
            top: "-30px",
          }}
        />
      ))}

      {/* Main card */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 px-6 py-10 rounded-3xl letter-glass max-w-sm w-full mx-4"
        initial={{ y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="text-center space-y-1">
          <p className="text-xs tracking-[0.3em] uppercase text-pink-400 font-light">
            One Year Together
          </p>
          <h1
            className="font-serif text-3xl font-bold"
            style={{ color: "#7a3555" }}
          >
            Happy Anniversary
          </h1>
          <p className="text-sm text-pink-400 font-light">
            Enter our anniversary bebi
          </p>
        </div>

        {/* Digit display */}
        <div className="flex gap-3" data-testid="digit-display">
          {Array.from({ length: 4 }, (_, i) => (
            <motion.div
              key={i}
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg font-bold"
              style={{
                borderColor:
                  digits[i] !== undefined
                    ? "#c06080"
                    : "rgba(210,160,180,0.4)",
                background:
                  digits[i] !== undefined
                    ? "rgba(220,100,140,0.12)"
                    : "rgba(255,255,255,0.4)",
                color: "#7a3555",
              }}
              animate={
                digits[i] !== undefined
                  ? { scale: [1, 1.15, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.22 }}
            >
              {digits[i] !== undefined ? "●" : ""}
            </motion.div>
          ))}
        </div>

        {/* Keypad */}
        <div className="flex flex-col gap-3" data-testid="keypad">
          {keys.map((row, ri) => (
            <div key={ri} className="flex gap-3 justify-center">
              {row.map((k) => (
                <motion.button
                  key={k}
                  className="keypad-btn"
                  whileTap={{ scale: 0.92 }}
                  data-testid={`keypad-btn-${k}`}
                  onClick={() => {
                    if (k === "⌫") handleDelete();
                    else if (k === "♡") {
                      if (digits.length === 4) {
                        setUnlocking(true);
                        setTimeout(() => setLocation("/menu"), 900);
                      }
                    } else handleDigit(k);
                  }}
                  aria-label={
                    k === "⌫" ? "Delete" : k === "♡" ? "Enter" : `Digit ${k}`
                  }
                >
                  {k}
                </motion.button>
              ))}
            </div>
          ))}
        </div>

        {/* Hearts row */}
        <p className="text-pink-300 text-lg tracking-widest select-none">
          ♡ ♡ ♡
        </p>
      </motion.div>

      {/* Unlock overlay */}
      <AnimatePresence>
        {unlocking && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: "rgba(255,255,255,0.0)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 1.3, 1], opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl"
            >
              💕
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
