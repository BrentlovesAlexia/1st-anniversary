import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const PHOTOS = [
  // 📸 Original 7 Photos (Grid)
  { src: "/1st-anniversary/photos/photo-1.png", label: "1st favorite photo", isAlbum: false },
  { src: "/1st-anniversary/photos/photo-2.png", label: "Playing around", isAlbum: false },
  { src: "/1st-anniversary/photos/photo-3.png", label: "Ate together", isAlbum: false },
  { src: "/1st-anniversary/photos/photo-4.png", label: "First time holding hands", isAlbum: false },
  { src: "/1st-anniversary/photos/photo-5.png", label: "First photo I took of you", isAlbum: false },
  { src: "/1st-anniversary/photos/photo-6.png", label: "First photo you gave me", isAlbum: false },
  { src: "/1st-anniversary/photos/photo-7.png", label: "My favorite thing you gave me", isAlbum: false },
  
  // 📚 School Album Collection (Stack)
  { src: "/1st-anniversary/photos/(album) photo-8.png", label: "school photo taking :>", isAlbum: true },
  { src: "/1st-anniversary/photos/(album) photo-9.png", label: "school photo taking :>", isAlbum: true },
  { src: "/1st-anniversary/photos/(album) photo-10.png", label: "school photo taking :>", isAlbum: true },
  { src: "/1st-anniversary/photos/(album) photo-11.png", label: "school photo taking :>", isAlbum: true },
  { src: "/1st-anniversary/photos/(album) photo-12.png", label: "school photo taking :>", isAlbum: true },
  { src: "/1st-anniversary/photos/(album) photo-13.png", label: "school photo taking :>", isAlbum: true },
  { src: "/1st-anniversary/photos/(album) photo-14.png", label: "school photo taking :>", isAlbum: true },
  { src: "/1st-anniversary/photos/(album) photo-15.png", label: "school photo taking :>", isAlbum: true },
  { src: "/1st-anniversary/photos/(album) photo-16.png", label: "school photo taking :>", isAlbum: true },
  { src: "/1st-anniversary/photos/(album) photo-17.png", label: "school photo taking :>", isAlbum: true },
];

export default function Gallery() {
  const [, setLocation] = useLocation();
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; label: string; isAlbum: boolean } | null>(null);
  
  // Tracks if the school album stack has been clicked to open/expand
  const [isStackExpanded, setIsStackExpanded] = useState(false);

  // Separate the arrays
  const gridPhotos = PHOTOS.filter(p => !p.isAlbum);
  const albumPhotos = PHOTOS.filter(p => p.isAlbum);

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center py-10 px-4"
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
      <div className="absolute inset-0 bg-anniversary opacity-70" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        {/* Back button */}
        <motion.button
          className="self-start text-pink-400 hover:text-pink-600 text-sm flex items-center gap-1 mb-6 transition-colors"
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
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-pink-400 font-light">
            Our Album
          </p>
          <h1
            className="font-serif text-3xl font-bold mt-1"
            style={{ color: "#7a3555" }}
          >
            Captured Moments
          </h1>
        </motion.div>

        {/* Standard Grid for Original Photos */}
        <div className="grid grid-cols-2 gap-4 w-full mb-10">
          {gridPhotos.map((photo, i) => (
            <motion.div
              key={i}
              className="gallery-item relative aspect-square overflow-hidden group cursor-pointer rounded-2xl border border-pink-100/30 bg-white/40 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <img src={photo.src} alt={photo.label} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* --- PILED UP ALBUM SECTION --- */}
        <div className="w-full flex flex-col items-center mt-4 mb-8">
          <div className="text-center mb-4">
            <h3 className="font-serif text-lg font-bold" style={{ color: "#7a3555" }}>
              School Photo Taking
            </h3>
            <p className="text-xs text-pink-400 font-light">
              {isStackExpanded ? "Tap a picture to expand it ♡" : "Click the pile to open the album ♡"}
            </p>
          </div>

          {/* Dynamic Stack / Expanded Layout */}
          {!isStackExpanded ? (
            /* Piled Up Deck Representation */
            <div 
              className="relative w-48 h-48 cursor-pointer mt-4 mb-6"
              onClick={() => setIsStackExpanded(true)}
            >
              {albumPhotos.slice(0, 4).map((photo, index) => {
                // Rotates and offsets top 4 images slightly to create an authentic messy pile look
                const rotations = [-6, 4, -2, 5];
                const xOffsets = [-8, 6, -2, 4];
                return (
                  <motion.div
                    key={index}
                    className="absolute inset-0 rounded-2xl border-2 border-white bg-white p-1.5 shadow-md overflow-hidden aspect-square"
                    style={{
                      zIndex: albumPhotos.length - index,
                      rotate: `${rotations[index % rotations.length]}deg`,
                      x: xOffsets[index % xOffsets.length],
                    }}
                    whileHover={{ scale: 1.05, rotate: "0deg", zIndex: 50 }}
                  >
                    <img src={photo.src} alt="Album Pile" className="w-full h-full object-cover rounded-xl pointer-events-none" />
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* Expanded Album View (Grid inside the folder) */
            <motion.div 
              className="grid grid-cols-2 gap-4 w-full p-4 rounded-3xl bg-pink-50/30 border border-pink-200/40 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {albumPhotos.map((photo, i) => (
                <motion.div
                  key={i}
                  className="relative aspect-square overflow-hidden cursor-pointer rounded-2xl border-2 border-white bg-white p-1 shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img src={photo.src} alt={photo.label} className="absolute inset-0 w-full h-full object-cover rounded-xl" />
                </motion.div>
              ))}
              
              {/* Close/Collapse Pile Button */}
              <button 
                className="col-span-2 text-center text-xs text-pink-500 underline mt-2 hover:text-pink-700 transition-colors"
                onClick={() => setIsStackExpanded(false)}
              >
                Collapse Album Pile ↑
              </button>
            </motion.div>
          )}
        </div>

        {/* Footer Note */}
        <motion.div
          className="letter-glass rounded-2xl px-6 py-4 text-center w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-serif text-base italic leading-relaxed" style={{ color: "#7a3555" }}>
            "A picture is worth a thousand feelings." ✨
          </p>
          <p className="text-xs text-pink-300 mt-2 font-light">
            Every moment spent with you is a treasure ♡
          </p>
        </motion.div>
      </div>

      {/* Expanded Modal Photo Popup Overlay */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center bg-white/15 text-white text-xl hover:bg-white/25 active:scale-95 transition-all"
              onClick={() => setSelectedPhoto(null)}
            >
              ✕
            </motion.button>

            {/* Polaroid Modal Card */}
            <motion.div
              className="relative max-w-sm w-full bg-white/90 backdrop-blur-xl p-3 pb-5 rounded-3xl border border-white/20 shadow-2xl flex flex-col items-center gap-4 mx-4"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-inner bg-stone-100">
                <img src={selectedPhoto.src} alt={selectedPhoto.label} className="w-full h-full object-cover" />
              </div>

              {/* Title Section formatting */}
              <div className="text-center px-2">
                <p className="font-serif text-lg font-medium leading-snug tracking-wide" style={{ color: "#7a3555" }}>
                  {selectedPhoto.label}
                </p>
                <p className="text-xs text-pink-400/70 tracking-widest mt-1 uppercase font-light">
                  {selectedPhoto.isAlbum ? "Special Collection" : "Anniversary Album"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
