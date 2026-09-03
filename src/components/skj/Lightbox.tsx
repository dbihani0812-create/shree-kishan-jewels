"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  images: string[];
  index: number | null;
  label?: string;
  onClose: () => void;
  onChange: (i: number) => void;
};

/** Immersive full-screen gallery. Locks page scroll while open so the
 *  cinematic scrolling experience is preserved underneath.
 *  Keyboard: ← → to browse, Esc to close. Touch: swipe left/right. */
export function Lightbox({ images, index, label, onClose, onChange }: Props) {
  const open = index !== null;
  const touchX = useRef<number | null>(null);
  const touchY = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  /** Element that opened the lightbox — focus returns here on close. */
  const opener = useRef<HTMLElement | null>(null);

  const step = (dir: number) =>
    onChange(((index ?? 0) + dir + images.length) % images.length);

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowRight") onChange(((index ?? 0) + 1) % images.length);
      if (e.key === "ArrowLeft") onChange(((index ?? 0) - 1 + images.length) % images.length);
      if (e.key === "Tab") {
        // Focus trap: cycle within the dialog only.
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!nodes || nodes.length === 0) return;
        const list = Array.from(nodes);
        const first = list[0]!;
        const last = list[list.length - 1]!;
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !dialogRef.current?.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      opener.current?.focus?.();
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
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={
            label
              ? `${label} — full screen gallery, image ${(index ?? 0) + 1} of ${images.length}`
              : "Image gallery"
          }
          onTouchStart={(e) => {
            touchX.current = e.touches[0]?.clientX ?? null;
            touchY.current = e.touches[0]?.clientY ?? null;
          }}
          onTouchEnd={(e) => {
            const sx = touchX.current;
            const sy = touchY.current;
            touchX.current = null;
            touchY.current = null;
            if (sx == null || sy == null || images.length < 2) return;
            const dx = (e.changedTouches[0]?.clientX ?? sx) - sx;
            const dy = (e.changedTouches[0]?.clientY ?? sy) - sy;
            if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
          }}
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
              className="max-h-[68vh] max-w-[92vw] object-contain md:max-h-[74vh]"
              draggable={false}
            />
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="absolute left-4 font-body text-2xl text-ivory/60 hover:text-ivory md:left-10"
              >
                ‹
              </button>
              <button
                onClick={() => step(1)}
                aria-label="Next image"
                className="absolute right-4 font-body text-2xl text-ivory/60 hover:text-ivory md:right-10"
              >
                ›
              </button>
            </>
          )}

          <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-4">
            {label && (
              <p className="font-display text-lg font-light text-ivory/90">{label}</p>
            )}
            <p className="font-body text-[10px] tracking-[0.32em] text-ivory/45 uppercase">
              {String((index ?? 0) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              {images.length > 1 ? " · swipe or arrow keys" : ""}
            </p>

            {images.length > 1 && (
              <div className="flex max-w-[92vw] gap-3 overflow-x-auto px-4 pb-1">
                {images.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => onChange(i)}
                    aria-label={`Show image ${i + 1}`}
                    aria-current={i === index}
                    className={`h-14 w-14 shrink-0 overflow-hidden border transition-opacity ${
                      i === index
                        ? "border-champagne opacity-100"
                        : "border-ivory/20 opacity-50 hover:opacity-90"
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
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
