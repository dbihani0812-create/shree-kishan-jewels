"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  images: string[];
  index: number | null;
  label?: string;
  onClose: () => void;
  onChange: (i: number) => void;
};

/** Immersive full-screen gallery. Locks page scroll while open so the
 *  cinematic scrolling experience is preserved underneath. */
export function Lightbox({ images, index, label, onClose, onChange }: Props) {
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange(((index ?? 0) + 1) % images.length);
      if (e.key === "ArrowLeft") onChange(((index ?? 0) - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, index, images.length, onClose, onChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal/96 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={label ?? "Image gallery"}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={images[index! % images.length]}
              alt={label ? `${label} — detail ${index! + 1}` : "Jewellery detail"}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[84vh] max-w-[92vw] object-contain"
              draggable={false}
            />
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                onClick={() => onChange((index! - 1 + images.length) % images.length)}
                aria-label="Previous image"
                className="absolute left-4 font-body text-2xl text-ivory/60 hover:text-ivory md:left-10"
              >
                ‹
              </button>
              <button
                onClick={() => onChange((index! + 1) % images.length)}
                aria-label="Next image"
                className="absolute right-4 font-body text-2xl text-ivory/60 hover:text-ivory md:right-10"
              >
                ›
              </button>
            </>
          )}

          <div className="absolute bottom-8 left-0 right-0 text-center">
            {label && (
              <p className="font-display text-lg font-light text-ivory/90">{label}</p>
            )}
            <p className="mt-2 font-body text-[10px] tracking-[0.32em] text-ivory/45 uppercase">
              {String((index ?? 0) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              {images.length > 1 ? " · arrow keys" : ""}
            </p>
          </div>

          <button
            onClick={onClose}
            className="absolute top-6 right-6 font-body text-[11px] tracking-[0.3em] text-ivory/70 uppercase hover:text-ivory md:right-10"
          >
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
