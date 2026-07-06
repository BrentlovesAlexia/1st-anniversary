import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

const YOUTUBE_VIDEO_ID = "nZqwQCLYgjk";

export default function Music() {
  const [, setLocation] = useLocation();
  const notes = ["♩", "♪", "♫", "♬", "♩", "♪", "♫"];

  useEffect(() => {
    // Smoothly fades out the background music file when the video screen shows up
    if (window.bgMusic && !window.bgMusic.paused) {
      const audio = window.bgMusic;
      const fadeInterval = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume -= 0.05;
        } else {
          audio.volume = 0;
          audio.pause();
          clearInterval(fadeInterval);
        }
      }, 100);

      return () => clearInterval(fadeInterval);
    }
  }, []);

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      data-testid="page-music"
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

      {/* Floating music notes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {notes.map((note, i) => (
          <motion.span
            key={i}
            className="absolute text-pink-300 select-none"
            style={{
              left: `${8 + i * 13}%`,
              fontSize: `${1 + (i % 3) * 0.4}rem`,
              bottom: `${15 + (i % 4) * 10}%`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 15, -10, 0],
            }}
            transition={{
              duration: 3 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.35,
              ease: "easeInOut",
            }}
          >
            {note}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 w-full max-w-lg">
        {/* Back button */}
        <motion.button
          className="self-start text-pink-400 hover:text-pink-600 text-sm flex items-center gap-1 transition-colors"
          onClick={() => setLocation("/menu")}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          data-testid="btn-back"
        >
          ← Back
        </motion.button>

        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="text-5xl mb-3"
            animate={{ rotate: [0, -8, 8, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
          >
            🧸
          </motion.div>
          <p className="text-xs tracking-[0.3em] uppercase text-pink-400 font-light">
            Our Song
          </p>
          <h1
            className="font-serif text-3xl font-bold mt-1"
            style={{ color: "#7a3555" }}
          >
            seasons
          </h1>
          <p className="text-sm text-pink-400 font-light italic mt-1">
            by wave to earth
          </p>
        </motion.div>

        {/* YouTube Player */}
        <motion.div
          className="letter-glass rounded-2xl overflow-hidden w-full"
          style={{ aspectRatio: "16/9" }}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          data-testid="youtube-player"
        >
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=0&rel=0&modestbranding=1&color=white`}
            title="Seasons by wave to earth"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>

        {/* Caption */}
        <motion.div
          className="letter-glass rounded-2xl px-6 py-4 text-center w-full"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p
            className="font-serif text-base italic leading-relaxed"
            style={{ color: "#7a3555" }}
          >
            "Every season with you is my favorite." 🌸
          </p>
          <p className="text-xs text-pink-300 mt-2 font-light">
            This song always reminds me of us ♡
          </p>
        </motion.div>

        {/* Animated hearts */}
        <motion.div
          className="flex gap-3 text-xl"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          💗 💕 💗
        </motion.div>
      </div>
    </motion.div>
  );
}
