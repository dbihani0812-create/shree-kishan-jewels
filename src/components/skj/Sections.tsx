"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "motion/react";
import { pieces, posters, logoUrl } from "@/lib/assets";

const NAV = [
  { label: "Home", href: "#top" },
  { label: "Collections", href: "#collections" },
  { label: "Gallery", href: "#gallery" },
  { label: "Our Heritage", href: "#heritage" },
  { label: "Contact", href: "#contact" },
];

/* ── WOW 01 — cinematic silk curtain reveal (≈2.6s) ───────────────── */
export function CurtainReveal() {
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const a = setTimeout(() => setOpen(true), 320);
    const b = setTimeout(() => setGone(true), 3300);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  if (gone) return null;

  const silk =
    "repeating-linear-gradient(90deg, color-mix(in oklab, var(--color-ivory) 92%, var(--color-charcoal)) 0px, var(--color-ivory) 22px, color-mix(in oklab, var(--color-champagne) 70%, white) 48px, var(--color-ivory) 74px, color-mix(in oklab, var(--color-ivory) 88%, var(--color-charcoal)) 96px)";

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute inset-y-0 left-0 w-[51%]"
        style={{ backgroundImage: silk, boxShadow: "24px 0 60px -20px rgba(0,0,0,0.35)" }}
        initial={{ x: 0 }}
        animate={{ x: open ? "-101%" : 0 }}
        transition={{ duration: 2.5, ease: [0.72, 0, 0.24, 1] }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-y-0 right-0 w-[51%]"
        style={{ backgroundImage: silk, boxShadow: "-24px 0 60px -20px rgba(0,0,0,0.35)" }}
        initial={{ x: 0 }}
        animate={{ x: open ? "101%" : 0 }}
        transition={{ duration: 2.5, ease: [0.72, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, filter: "blur(14px)", scale: 1.06 }}
        animate={{ opacity: [0, 1, 1, 0], filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 3.2, times: [0, 0.35, 0.78, 1], ease: "easeOut" }}
      >
        <img src={logoUrl} alt="Shree Kishan Jewellers & Sons" className="h-20 w-20 rounded-full object-cover md:h-24 md:w-24" />
        <h1 className="mt-6 font-display text-[7vw] leading-[0.95] font-light tracking-[0.16em] text-charcoal uppercase md:text-4xl">
          Shree Kishan
        </h1>
        <p className="mt-2 font-body text-[2.6vw] tracking-[0.42em] text-antique uppercase md:text-[11px]">
          Jewellers &amp; Sons
        </p>
        <p className="mt-6 max-w-xs font-display text-[3.4vw] italic text-wine md:max-w-md md:text-lg">
          “We Believe in Quality and Not in Competition.”
        </p>
      </motion.div>
    </div>
  );
}

/* ── Navbar: hides on scroll down, returns on scroll up ───────────── */
export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > 240 && y > last.current);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "bg-ivory/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-12">
        <a href="#top" className="flex items-center gap-3">
          <img src={logoUrl} alt="Shree Kishan Jewellers & Sons" className="h-9 w-9 rounded-full object-cover" />
          <span className="hidden font-display text-sm tracking-[0.3em] text-charcoal uppercase sm:block">
            Shree Kishan
          </span>
        </a>
        <ul className="hidden items-center gap-9 md:flex">
          {NAV.map((n) => (
            <li key={n.label} className="group relative">
              <a
                href={n.href}
                className="font-body text-[11px] tracking-[0.26em] text-charcoal/80 uppercase transition-colors hover:text-wine"
              >
                {n.label}
              </a>
              {n.label === "Collections" && (
                <div className="pointer-events-none absolute top-full left-1/2 w-44 -translate-x-1/2 pt-5 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
                  <div className="border border-border bg-ivory/95 px-5 py-4 backdrop-blur">
                    {["Polki", "Diamond", "Gold", "Kundan", "Bridal", "Custom"].map((c) => (
                      <a
                        key={c}
                        href="#collections"
                        className="block py-1.5 font-body text-[11px] tracking-[0.2em] text-charcoal/75 uppercase hover:text-wine"
                      >
                        {c}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setMenu((m) => !m)}
          aria-label="Menu"
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span className="block h-px w-6 bg-charcoal" />
          <span className="block h-px w-6 bg-charcoal" />
        </button>
      </nav>
      <AnimatePresence>
        {menu && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-ivory px-6 md:hidden"
          >
            {NAV.map((n) => (
              <li key={n.label}>
                <a
                  href={n.href}
                  onClick={() => setMenu(false)}
                  className="block py-3 font-body text-xs tracking-[0.28em] text-charcoal uppercase"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ── WOW 02 — hero: uploaded poster artwork only, no overlay text ── */
export function PosterHero() {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const fade = useTransform(scrollYProgress, [0.55, 1], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % posters.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" ref={ref} className="relative h-[100svh] overflow-hidden bg-ivory">
      <motion.div style={{ scale, y, opacity: fade }} className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={i}
            src={posters[i]}
            alt="Shree Kishan Jewellers & Sons campaign poster"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>
      </motion.div>
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {posters.map((_, k) => (
          <button
            key={k}
            onClick={() => setI(k)}
            aria-label={`Poster ${k + 1}`}
            className={`h-px w-10 transition-all duration-500 ${k === i ? "bg-ivory" : "bg-ivory/40"}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ── WOW 03 + 04 — scroll is the camera; drag to inspect ─────────── */
export function SignaturePiece() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  const scale = useTransform(p, [0, 0.28, 0.55, 0.8, 1], [0.34, 0.72, 1.05, 1.5, 1.18]);
  const x = useTransform(p, [0, 0.5, 0.82, 1], ["0%", "0%", "-6%", "-30%"]);
  const rotate = useTransform(p, [0, 0.55, 1], [-9, 3, 8]);
  const bg = useTransform(
    p,
    [0, 0.5, 1],
    [
      "oklch(0.968 0.011 84)",
      "oklch(0.912 0.02 80)",
      "oklch(0.30 0.02 60)",
    ],
  );
  const capOpacity = useTransform(p, [0.42, 0.55, 0.9, 1], [0, 1, 1, 0]);
  const capX = useTransform(p, [0.42, 0.65], [40, 0]);
  const introOpacity = useTransform(p, [0, 0.16], [1, 0]);
  const dark = useTransform(p, [0.6, 1], [0, 1]);

  const drag = useMotionValue(0);
  const dragRot = useSpring(drag, { stiffness: 120, damping: 20 });

  return (
    <section ref={ref} className="relative h-[420svh]">
      <motion.div
        style={{ backgroundColor: bg }}
        className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden"
      >
        <motion.div
          aria-hidden
          style={{ opacity: dark }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_10%,rgba(20,14,10,0.55)_75%)]"
        />
        <motion.p
          style={{ opacity: introOpacity }}
          className="absolute top-[22vh] left-1/2 -translate-x-1/2 text-center font-body text-[10px] tracking-[0.42em] text-charcoal/60 uppercase"
        >
          The Signature Piece
        </motion.p>

        <motion.div
          style={{ scale, x, rotate }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDrag={(_, info) => drag.set(info.offset.x * 0.12)}
          onDragEnd={() => drag.set(0)}
          className="relative z-10 w-[min(78vw,640px)] cursor-grab active:cursor-grabbing"
        >
          <motion.img
            src={pieces[10]}
            alt="Signature emerald and polki choker by Shree Kishan Jewellers & Sons"
            style={{ rotateY: dragRot }}
            className="w-full select-none"
            draggable={false}
          />
        </motion.div>

        <motion.div
          style={{ opacity: capOpacity, x: capX }}
          className="absolute right-[6vw] bottom-[16vh] z-10 max-w-[16rem] text-right md:bottom-auto md:top-1/2 md:-translate-y-1/2"
        >
          <p className="font-body text-[10px] tracking-[0.4em] text-antique uppercase">Polki · Emerald</p>
          <h2 className="mt-3 font-display text-3xl leading-tight font-light text-ivory md:text-4xl">
            Set by hand,<br />stone by stone.
          </h2>
          <p className="mt-4 font-body text-xs leading-relaxed tracking-wide text-ivory/70">
            Drag to inspect the piece.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ── Collections — art-directed, no repeated card grid ───────────── */
const CATS = [
  { name: "Polki", img: pieces[12], note: "Uncut brilliance" },
  { name: "Diamond", img: pieces[5], note: "Precision light" },
  { name: "Gold", img: pieces[21], note: "Bikaner goldsmithing" },
  { name: "Kundan", img: pieces[17], note: "Setting as craft" },
  { name: "Bridal", img: pieces[26], note: "For the ceremony" },
  { name: "Custom", img: pieces[8], note: "Made to your story" },
];

export function Collections({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section id="collections" className="bg-ivory px-6 py-28 md:px-12">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-20 max-w-xl">
          <p className="font-body text-[10px] tracking-[0.42em] text-antique uppercase">Collections</p>
          <h2 className="mt-5 font-display text-4xl leading-[1.05] font-light text-charcoal md:text-6xl">
            Six houses of<br />
            <span className="italic text-wine">one craft.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-12">
          {CATS.map((c, i) => {
            const spans = [
              "md:col-span-7",
              "md:col-span-5 md:pt-24",
              "md:col-span-4",
              "md:col-span-8 md:pt-16",
              "md:col-span-8",
              "md:col-span-4 md:pt-28",
            ];
            const ratio = [
              "aspect-[4/3]",
              "aspect-[3/4]",
              "aspect-square",
              "aspect-[16/10]",
              "aspect-[16/9]",
              "aspect-[3/4]",
            ];
            return (
              <motion.figure
                key={c.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`${spans[i]} group cursor-pointer`}
                onClick={() => onOpen(i * 3)}
              >
                <div className={`${ratio[i]} overflow-hidden bg-muted`}>
                  <img
                    src={c.img}
                    alt={`${c.name} jewellery at Shree Kishan Jewellers & Sons`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <figcaption className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
                  <span className="font-display text-2xl font-light text-charcoal">{c.name}</span>
                  <span className="font-body text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                    {c.note}
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── WOW 05 — craftsmanship: scroll-controlled visual story ─────── */
const STEPS = [
  { t: "Design", d: "A drawing settles before a single stone is cut.", img: pieces[2] },
  { t: "Stone", d: "Polki and emeralds chosen by eye, in daylight.", img: pieces[7] },
  { t: "Craft", d: "Gold worked by hands trained across generations.", img: pieces[20] },
  { t: "Setting", d: "Each stone seated until the light sits still.", img: pieces[16] },
  { t: "Polish", d: "The final hours, given only to surface.", img: pieces[23] },
  { t: "Finished", d: "The piece leaves Bikaner as an heirloom.", img: pieces[27] },
];

export function Craft() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = useState(0);

  useEffect(() => {
    const un = scrollYProgress.on("change", (v) =>
      setStep(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length))),
    );
    return () => un();
  }, [scrollYProgress]);

  return (
    <section ref={ref} className="relative h-[500svh] bg-charcoal">
      <div className="sticky top-0 grid h-[100svh] grid-cols-1 items-center gap-8 overflow-hidden px-6 md:grid-cols-2 md:px-16">
        <div className="order-2 md:order-1">
          <p className="font-body text-[10px] tracking-[0.42em] text-antique uppercase">
            Craftsmanship — {String(step + 1).padStart(2, "0")} / 06
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -26 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="mt-6 font-display text-5xl font-light text-ivory md:text-7xl">
                {STEPS[step].t}
              </h2>
              <p className="mt-5 max-w-sm font-body text-sm leading-relaxed text-ivory/65">
                {STEPS[step].d}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="relative order-1 aspect-[4/5] overflow-hidden md:order-2 md:h-[72vh]">
          {STEPS.map((s, i) => (
            <motion.img
              key={s.t}
              src={s.img}
              alt={`${s.t} — jewellery making at Shree Kishan Jewellers & Sons`}
              loading="lazy"
              animate={{
                opacity: i === step ? 1 : 0,
                scale: i === step ? 1 : 1.08,
                clipPath: i === step ? "inset(0% 0 0% 0)" : "inset(18% 0 18% 0)",
              }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Under the loupe — tactile magnification ─────────────────────── */
export function Loupe() {
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [on, setOn] = useState(false);

  const move = (cx: number, cy: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: ((cx - r.left) / r.width) * 100, y: ((cy - r.top) / r.height) * 100 });
  };

  return (
    <section className="bg-ivory px-6 py-28 md:px-12">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 md:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="font-body text-[10px] tracking-[0.42em] text-antique uppercase">Under the Loupe</p>
          <h2 className="mt-5 font-display text-4xl leading-tight font-light text-charcoal md:text-5xl">
            Look closer than<br />a shop counter allows.
          </h2>
          <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-muted-foreground">
            Move across the piece to magnify the setting, the gold texture and the seat of every stone.
          </p>
        </div>
        <div
          ref={box}
          onMouseEnter={() => setOn(true)}
          onMouseLeave={() => setOn(false)}
          onMouseMove={(e) => move(e.clientX, e.clientY)}
          onTouchStart={() => setOn(true)}
          onTouchEnd={() => setOn(false)}
          onTouchMove={(e) => move(e.touches[0].clientX, e.touches[0].clientY)}
          className="relative aspect-[4/3] cursor-crosshair overflow-hidden bg-muted"
        >
          <img
            src={pieces[19]}
            alt="Macro detail of a polki necklace"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div
            className="pointer-events-none absolute h-40 w-40 rounded-full border border-ivory/60 opacity-0 transition-opacity duration-300"
            style={{
              left: `calc(${pos.x}% - 5rem)`,
              top: `calc(${pos.y}% - 5rem)`,
              opacity: on ? 1 : 0,
              backgroundImage: `url(${pieces[19]})`,
              backgroundSize: "320% 320%",
              backgroundPosition: `${pos.x}% ${pos.y}%`,
              boxShadow: "0 20px 50px -18px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ── Heritage ────────────────────────────────────────────────────── */
export function Heritage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="heritage" ref={ref} className="relative overflow-hidden bg-secondary px-6 py-32 md:px-12">
      <motion.img
        style={{ y }}
        src={pieces[13]}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-[120%] w-full object-cover opacity-25"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="font-body text-[10px] tracking-[0.42em] text-wine uppercase">Our Heritage</p>
        <h2 className="mt-6 font-display text-4xl leading-[1.08] font-light text-charcoal md:text-6xl">
          Seven generations.<br />
          <span className="italic">One legacy.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl font-body text-sm leading-relaxed text-charcoal/70">
          From Sarafa Bazaar in Bikaner, the same family has weighed, worked and set gold for seven
          generations — the workshop, the hands and the standard have simply been passed on.
        </p>
      </div>
    </section>
  );
}

/* ── Gallery — editorial masonry ─────────────────────────────────── */
export function Gallery({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section id="gallery" className="bg-ivory px-6 py-28 md:px-12">
      <div className="mx-auto max-w-[1500px]">
        <p className="font-body text-[10px] tracking-[0.42em] text-antique uppercase">Gallery</p>
        <h2 className="mt-5 mb-14 font-display text-4xl font-light text-charcoal md:text-5xl">
          The house, piece by piece.
        </h2>
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {pieces.map((src, i) => (
            <motion.button
              key={src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => onOpen(i)}
              className="group block w-full overflow-hidden bg-muted"
            >
              <img
                src={src}
                alt={`Jewellery set ${i + 1} — Shree Kishan Jewellers & Sons`}
                loading="lazy"
                className="w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Fullscreen inspect viewer (zoom + pan, real photo only) ─────── */
export function Viewer({ index, onClose }: { index: number | null; onClose: () => void }) {
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    setZoom(1);
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [index, onClose]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/95 backdrop-blur-sm"
        >
          <motion.img
            key={index}
            src={pieces[index % pieces.length]}
            alt="Jewellery detail"
            drag
            dragElastic={0.1}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: zoom, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onDoubleClick={() => setZoom((z) => (z > 1.4 ? 1 : 2))}
            className="max-h-[86vh] max-w-[92vw] cursor-grab object-contain active:cursor-grabbing"
            draggable={false}
          />
          <div className="absolute bottom-8 flex items-center gap-6">
            <button
              onClick={() => setZoom((z) => Math.max(1, z - 0.4))}
              className="font-body text-[11px] tracking-[0.3em] text-ivory/70 uppercase hover:text-ivory"
            >
              −
            </button>
            <span className="font-body text-[10px] tracking-[0.3em] text-ivory/50 uppercase">
              drag · double-click to zoom
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(3, z + 0.4))}
              className="font-body text-[11px] tracking-[0.3em] text-ivory/70 uppercase hover:text-ivory"
            >
              +
            </button>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-8 font-body text-[11px] tracking-[0.3em] text-ivory/70 uppercase hover:text-ivory"
          >
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Contact — final brand moment ────────────────────────────────── */
export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-charcoal px-6 py-32 md:px-12">
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center">
          <img src={logoUrl} alt="" aria-hidden className="mx-auto h-16 w-16 rounded-full object-cover" />
          <h2 className="mt-8 font-display text-3xl leading-tight font-light tracking-[0.14em] text-ivory uppercase md:text-5xl">
            Shree Kishan Jewellers &amp; Sons
          </h2>
          <p className="mt-6 font-display text-lg italic text-champagne md:text-2xl">
            “We Believe in Quality and Not in Competition.”
          </p>
        </div>
        <div className="mt-20 grid gap-12 border-t border-ivory/15 pt-14 md:grid-cols-3">
          <div>
            <p className="font-body text-[10px] tracking-[0.4em] text-antique uppercase">Visit</p>
            <p className="mt-4 font-body text-sm leading-relaxed text-ivory/70">
              Teliwara Road, Sarafa Bazaar, Joshiwara, Sunaron Ka Mohalla, Bikaner, Rajasthan 334001,
              India
            </p>
          </div>
          <div>
            <p className="font-body text-[10px] tracking-[0.4em] text-antique uppercase">Call</p>
            <ul className="mt-4 space-y-1.5 font-body text-sm text-ivory/70">
              {["+91 99288 73555", "+91 97999 58266", "+91 89493 77051"].map((n) => (
                <li key={n}>
                  <a href={`tel:${n.replace(/\s/g, "")}`} className="hover:text-ivory">
                    {n}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/919928873555"
              className="mt-4 inline-block font-body text-xs tracking-[0.28em] text-champagne uppercase hover:text-ivory"
            >
              WhatsApp · +91 99288 73555
            </a>
          </div>
          <div>
            <p className="font-body text-[10px] tracking-[0.4em] text-antique uppercase">Write</p>
            <a
              href="mailto:skj.bkn07@gmail.com"
              className="mt-4 block font-body text-sm text-ivory/70 hover:text-ivory"
            >
              skj.bkn07@gmail.com
            </a>
            <a
              href="https://instagram.com/shree_kishan_jewellers"
              className="mt-2 block font-body text-sm text-ivory/70 hover:text-ivory"
            >
              @shree_kishan_jewellers
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}