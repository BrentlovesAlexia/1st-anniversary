import { useLocation } from "wouter";
import { motion } from "framer-motion";

import photo1 from "@assets/1st_Favorite_photo_1783262120729.png";
import photo2 from "@assets/2nd_favorite_photo_1783262120879.png";
import photo3 from "@assets/ate_together_1783262120934.png";
import photo4 from "@assets/first_holding_hands_1783262121008.png";
import photo5 from "@assets/first_photo_i_took_of_you_1783262121056.png";
import photo6 from "@assets/first_photo_you_gave_me_1783262121095.png";
import photo7 from "@assets/my_favorite_thing_you_gave_me_1783262121146.png";

const PHOTOS = [
  { src: photo1, label: "1st favorite photo 🌈" },
  { src: photo2, label: "Playing around 😄" },
  { src: photo3, label: "Ate together 🍢" },
  { src: photo4, label: "First time holding hands 🤝" },
  { src: photo5, label: "First photo I took of you 🌤️" },
  { src: photo6, label: "First photo you gave me 💌" },
  { src: photo7, label: "My favorite thing you gave me 🍪" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Gallery() {
  const [, setLocation] = useLocation();

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      data-testid="page-gallery"
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
      <div className="absolute inset-0 bg-anniversary opacity-55" />

      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8 w-full max-w-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            className="text-pink-400 hover:text-pink-600 text-sm flex items-center gap-1 transition-colors mb-4"
            onClick={() => setLocation("/menu")}
            data-testid="btn-back"
          >
            ← Back
          </motion.button>
          <p className="text-xs tracking-[0.3em] uppercase text-pink-400 font-light">
            💐 Memories
          </p>
          <h1
            className="font-serif text-3xl font-bold mt-1"
            style={{ color: "#7a3555" }}
          >
            Our Year Together
          </h1>
          <p className="text-sm text-pink-400 font-light mt-1 italic">
            Every moment worth remembering
          </p>
        </motion.div>

        {/* Gallery grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={i}
              className="gallery-item relative overflow-hidden cursor-pointer group"
              style={{ aspectRatio: "1/1" }}
              variants={itemVariants}
              whileHover={{ scale: 1.04, translateY: -4 }}
              transition={{ duration: 0.25 }}
              data-testid={`gallery-item-${i}`}
            >
              <img
                src={photo.src}
                alt={photo.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              />
              {/* Hover label overlay */}
              <motion.div
                className="absolute inset-0 flex items-end justify-center pb-3 px-2"
                style={{
                  background:
                    "linear-gradient(to top, rgba(120,40,80,0.62) 0%, transparent 55%)",
                  opacity: 0,
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.22 }}
              >
                <p className="text-white text-xs font-medium text-center leading-snug drop-shadow">
                  {photo.label}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.div
          className="mt-8 letter-glass rounded-2xl px-6 py-4 text-center max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p
            className="font-serif text-base italic leading-relaxed"
            style={{ color: "#7a3555" }}
          >
            "A picture is worth a thousand feelings." 💕
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
        }
