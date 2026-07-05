import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const pages = [
  {
    id: 1,
    title: "My Dearest Love",
    content: `Happy 1st anniversary, my love! Sobrang saya ko lang na umabot tayo sa milestone na 'to. Pagtingin ko sa lahat ng pinagdaanan natin nitong nakaraang taon, narealize ko na lahat ng hirap at saya ay worth it kasi mas lalo tayong pinatatag nito at mas nakilala ko pa ang pagkatao mo.

Alam ko na hindi laging madali ang lahat at aminado ako na marami tayong pagsubok na kinaharap, pero proud ako sa kung paano natin hinarap lahat nang magkasama. Today is all about us at ipagdiwang natin ang bond na patuloy nating binubuo araw-araw.`,
    decoration: "✉️",
  },
  {
    id: 2,
    title: "From the Depths",
    content: `Gusto ko lang maging tapat sa'yo na alam ko namang hindi laging perfect ang samahan natin. Alam ko na minsan ay may mga hindi pagkakaunawaan tayo na nagiging sanhi ng sakit o lungkot, pero sana lagi mong tatandaan na malalim, totoo, at buo ang pagmamahal ko sa'yo.

Kahit sa mga pagkakataon na hindi mo makita o maramdaman ang pagmamahal ko dahil sa pagod, pride, o stress, gusto ko lang malaman mo na ikaw pa rin ang tanging mahal ko. Lahat ng ginagawa ko ay para sa atin, at kahit hindi ko laging nasasabi o naipakita nang tama, sana ramdam mo pa rin kung gaano ka kahalaga sa buhay ko.`,
    decoration: "💕",
  },
  {
    id: 3,
    title: "Always & Forever",
    content: `Sobrang grateful ako sa lahat ng memories na nabuo natin, mapa-masaya man na nagpatawa sa atin o 'yung mahihirap na naging dahilan para lumago tayo bilang magkapareha.

Ang tanging hiling ko lang ngayong araw ay patuloy tayong piliin ang isa't isa araw-araw, kahit gaano pa kahirap ang buhay o ano pa ang dumating na problema. Sana tumagal tayo hanggang sa dulo at malampasan pa natin ang mas marami pang taon nang magkasama.

Thank you for being my rock at sa hindi pagbitaw sa akin. Mahal na mahal kita, happy anniversary! 💗`,
    decoration: "💌",
  },
];

const pageVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.96,
  }),
};

export default function LoveLetter() {
  const [, setLocation] = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const goNext = () => {
    if (currentPage < pages.length - 1) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    }
  };

  const goPrev = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  };

  const page = pages[currentPage];

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      data-testid="page-letter"
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

      {/* Floating hearts */}
      <div className="floating-hearts absolute inset-0 pointer-events-none" aria-hidden="true">
        {["💗", "💕", "🌸", "💓", "✨", "💗"].map((h, i) => (
          <span
            key={i}
            style={{
              left: `${10 + i * 16}%`,
              bottom: `${10 + Math.random() * 20}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + i * 0.5}s`,
              fontSize: "1rem",
            }}
          >
            {h}
          </span>
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

        {/* Page indicator */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentPage ? 1 : -1);
                setCurrentPage(i);
              }}
              data-testid={`dot-${i}`}
              className="transition-all duration-300"
              style={{
                width: i === currentPage ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background:
                  i === currentPage
                    ? "#c06080"
                    : "rgba(192,96,128,0.3)",
              }}
            />
          ))}
        </motion.div>

        {/* Letter card */}
        <div className="relative w-full overflow-hidden" style={{ minHeight: "420px" }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.52,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="letter-glass rounded-3xl p-8 w-full"
              data-testid={`letter-page-${currentPage}`}
            >
              {/* Decoration emoji */}
              <motion.div
                className="text-4xl mb-4 text-center"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.18, duration: 0.5, type: "spring", stiffness: 200 }}
              >
                {page.decoration}
              </motion.div>

              {/* Title */}
              <motion.h2
                className="font-serif text-2xl font-bold text-center mb-6"
                style={{ color: "#7a3555" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {page.title}
              </motion.h2>

              {/* Letter text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {page.content.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="font-serif text-base leading-relaxed mb-4 last:mb-0"
                    style={{ color: "#5a2540", lineHeight: "1.85" }}
                  >
                    {para}
                  </p>
                ))}
              </motion.div>

              {/* Page number */}
              <p className="text-right text-xs text-pink-300 mt-6 font-light">
                {currentPage + 1} / {pages.length}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            onClick={goPrev}
            disabled={currentPage === 0}
            className="keypad-btn"
            style={{
              width: "52px",
              height: "52px",
              opacity: currentPage === 0 ? 0.35 : 1,
              cursor: currentPage === 0 ? "not-allowed" : "pointer",
              fontSize: "1.1rem",
            }}
            whileTap={currentPage > 0 ? { scale: 0.92 } : {}}
            data-testid="btn-prev"
          >
            ‹
          </motion.button>

          <span className="text-pink-300 text-lg">♡</span>

          <motion.button
            onClick={goNext}
            disabled={currentPage === pages.length - 1}
            className="keypad-btn"
            style={{
              width: "52px",
              height: "52px",
              opacity: currentPage === pages.length - 1 ? 0.35 : 1,
              cursor:
                currentPage === pages.length - 1 ? "not-allowed" : "pointer",
              fontSize: "1.1rem",
            }}
            whileTap={currentPage < pages.length - 1 ? { scale: 0.92 } : {}}
            data-testid="btn-next"
          >
            ›
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
