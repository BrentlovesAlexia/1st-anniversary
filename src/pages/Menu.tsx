import { useLocation } from "wouter";
import { motion } from "framer-motion";

const menuItems = [
  {
    emoji: "💐",
    label: "Gallery",
    sublabel: "Our memories",
    path: "/gallery",
    testId: "menu-gallery",
    color: "#d4607a",
    delay: 0.1,
  },
  {
    emoji: "💌",
    label: "Love Letter",
    sublabel: "From my heart",
    path: "/letter",
    testId: "menu-letter",
    color: "#b84070",
    delay: 0.2,
  },
  {
    emoji: "🧸",
    label: "Our Song",
    sublabel: "Seasons ♪",
    path: "/music",
    testId: "menu-music",
    color: "#c06080",
    delay: 0.3,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Menu() {
  const [, setLocation] = useLocation();

  const petals = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 96 + 2}%`,
    delay: `${Math.random() * 6}s`,
    duration: `${6 + Math.random() * 6}s`,
    size: `${0.7 + Math.random() * 0.7}rem`,
  }));

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      data-testid="page-menu"
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
      <div className="absolute inset-0 bg-anniversary opacity-65" />

      {/* Petals */}
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            top: "-20px",
            animationDelay: p.delay,
            animationDuration: p.duration,
            fontSize: p.size,
          }}
          aria-hidden="true"
        >
          🌸
        </span>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 w-full max-w-md">
        {/* Header */}
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs tracking-[0.35em] uppercase text-pink-400 font-light">
            ♡ One Year ♡
          </p>
          <h1 className="font-serif text-4xl font-bold" style={{ color: "#7a3555" }}>
            Our World
          </h1>
          <p className="text-sm text-pink-400 italic font-light">
            Choose where to go, my Muchiee 
          </p>
        </motion.div>

        {/* Menu icons */}
        <motion.div
          className="flex flex-col gap-5 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {menuItems.map((item) => (
            <motion.button
              key={item.path}
              variants={itemVariants}
              className="letter-glass rounded-2xl px-6 py-5 flex items-center gap-5 w-full cursor-pointer menu-icon-btn text-left"
              onClick={() => setLocation(item.path)}
              data-testid={item.testId}
              whileHover={{ scale: 1.03, translateY: -4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              style={{ flexDirection: "row" }}
            >
              <motion.span
                className="text-5xl leading-none flex-shrink-0"
                animate={{ rotate: [0, -4, 4, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              >
                {item.emoji}
              </motion.span>
              <div>
                <p
                  className="font-serif text-xl font-semibold"
                  style={{ color: item.color }}
                >
                  {item.label}
                </p>
                <p className="text-sm text-pink-400 font-light">{item.sublabel}</p>
              </div>
              <span className="ml-auto text-pink-300 text-lg">›</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-pink-300 text-sm font-light italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Made with love, Gawa koto bebi, dw :>
        </motion.p>
      </div>
    </motion.div>
  );
}
