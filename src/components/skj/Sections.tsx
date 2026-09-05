"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,

  AnimatePresence,
} from "motion/react";
import { Link } from "@tanstack/react-router";
import { pieces, posters, logoUrl, shopFacadeUrl, shopInteriorUrl, storePhotos } from "@/lib/assets";
import { CATEGORIES, CATEGORY_NOTES, SETS, setsByCategory } from "@/lib/catalogue";

const NAV = [
  { label: "Home", href: "/#top" },
  { label: "Collections", href: "/collections" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Our Heritage", href: "/#heritage" },
  { label: "Bikaner Showroom", href: "/jewellers-in-bikaner" },
  { label: "Contact", href: "/#contact" },
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
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route/hash navigation.
  useEffect(() => {
    const onPop = () => setMenu(false);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "border-b border-border/70 bg-ivory/90 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.25)] backdrop-blur-md"
          : "border-b border-transparent bg-ivory/70 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-3.5 md:px-12 md:py-4">
        <a href="/#top" className="flex shrink-0 items-center gap-2.5">
          <img
            src={logoUrl}
            alt="Shree Kishan Jewellers & Sons"
            className="h-9 w-9 rounded-full object-cover ring-1 ring-charcoal/10 md:h-10 md:w-10"
          />
          <span className="font-display text-[13px] leading-none tracking-[0.22em] text-charcoal uppercase md:text-sm">
            Shree Kishan
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <li key={n.label} className="group relative">
              <a
                href={n.href}
                className="font-body text-[11px] tracking-[0.26em] text-charcoal/80 uppercase transition-colors hover:text-wine"
              >
                {n.label}
              </a>
              {n.label === "Collections" && (
                <div className="pointer-events-none absolute top-full left-1/2 w-48 -translate-x-1/2 pt-4 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
                  <div className="border border-border bg-ivory/95 px-5 py-3 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.3)] backdrop-blur">
                    {CATEGORIES.map((c) => (
                      <Link
                        key={c}
                        to="/collections"
                        search={{ category: c }}
                        className="block py-1.5 font-body text-[11px] tracking-[0.2em] text-charcoal/75 uppercase hover:text-wine"
                      >
                        {c}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <a
          href="/#contact"
          className="hidden items-center gap-2 border border-charcoal/25 px-4 py-2 font-body text-[10px] tracking-[0.26em] text-charcoal uppercase transition-colors hover:border-wine hover:bg-wine hover:text-ivory lg:inline-flex"
        >
          Visit Showroom
        </a>

        <button
          onClick={() => setMenu((m) => !m)}
          aria-label={menu ? "Close menu" : "Open menu"}
          aria-expanded={menu}
          className="flex flex-col justify-center gap-[5px] lg:hidden"
        >
          <span
            className={`block h-px w-6 bg-charcoal transition-transform duration-300 ${
              menu ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-charcoal transition-opacity duration-300 ${
              menu ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-charcoal transition-transform duration-300 ${
              menu ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden border-t border-border bg-ivory/97 backdrop-blur-md lg:hidden"
          >
            <ul className="px-5 py-2">
              {NAV.map((n) => (
                <li key={n.label} className="border-b border-border/60 last:border-0">
                  <a
                    href={n.href}
                    onClick={() => setMenu(false)}
                    className="block py-3.5 font-body text-[11px] tracking-[0.28em] text-charcoal uppercase"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 pb-3">
                <a
                  href="/#contact"
                  onClick={() => setMenu(false)}
                  className="inline-flex items-center gap-2 bg-wine px-5 py-2.5 font-body text-[10px] tracking-[0.26em] text-ivory uppercase"
                >
                  Visit Showroom
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
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
/* ── Signature piece — quiet editorial transition out of the hero ── */
export function SignaturePiece() {
  return (
    <section className="border-y border-border bg-ivory px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[1300px] items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="aspect-[4/5] overflow-hidden bg-muted md:aspect-[5/4]"
        >
          <img
            src={pieces[10]}
            alt="Signature emerald and polki choker by Shree Kishan Jewellers & Sons"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-body text-[10px] tracking-[0.42em] text-antique uppercase">
            The signature piece · Polki &amp; Emerald
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.05] font-light text-charcoal md:text-5xl">
            Set by hand,<br />
            <span className="italic text-wine">stone by stone.</span>
          </h2>
          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-muted-foreground">
            Uncut polki and Colombian emeralds seated in 22k gold at our workshop in Sarafa
            Bazaar, Bikaner — one piece, finished over several months.
          </p>
          <Link
            to="/collections"
            search={{}}
            className="mt-9 inline-block border-b border-wine/40 pb-1 font-body text-[11px] tracking-[0.3em] text-wine uppercase hover:border-charcoal hover:text-charcoal"
          >
            See the collections
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Categories — simple, clean category grid ── */
export function Categories() {
  return (
    <section id="categories" className="bg-ivory px-6 py-24 md:px-12">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 max-w-xl">
          <p className="font-body text-[10px] tracking-[0.42em] text-antique uppercase">
            Categories
          </p>
          <h2 className="mt-5 font-display text-3xl leading-[1.05] font-light text-charcoal md:text-5xl">
            Browse by craft.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((cat) => {
            const hero = setsByCategory(cat)[0];
            return (
              <Link
                key={cat}
                to="/collections"
                search={{ category: cat }}
                className="group block"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  {hero && (
                    <img
                      src={hero.img}
                      alt={`${cat} jewellery at Shree Kishan Jewellers & Sons, Bikaner`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.05]"
                    />
                  )}
                </div>
                <h3 className="mt-4 border-t border-border pt-3 font-display text-lg font-light text-charcoal">
                  {cat}
                </h3>
                <p className="mt-1 font-body text-[10px] tracking-[0.28em] text-muted-foreground uppercase">
                  {CATEGORY_NOTES[cat] ?? "Handcrafted in Bikaner"}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Collections — one category at a time, with an "All" tab last ── */
export function Collections(_props?: { onOpen?: (i: number) => void }) {
  const TABS = [...CATEGORIES, "All"];
  const [tab, setTab] = useState<string>(CATEGORIES[0]!);
  const shown = tab === "All" ? SETS : setsByCategory(tab);

  return (
    <section id="collections" className="bg-ivory px-6 py-28 md:px-12">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="font-body text-[10px] tracking-[0.42em] text-antique uppercase">
              Collections
            </p>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] font-light text-charcoal md:text-6xl">
              Ten houses of<br />
              <span className="italic text-wine">one craft.</span>
            </h2>
          </div>
          <Link
            to="/collections"
            search={{ category: tab }}
            className="font-body text-[10px] tracking-[0.3em] text-wine uppercase hover:text-charcoal"
          >
            View full catalogue →
          </Link>
        </div>

        <div
          role="tablist"
          aria-label="Jewellery categories"
          className="flex gap-7 overflow-x-auto border-y border-border py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TABS.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={tab === c}
              onClick={() => setTab(c)}
              className={`shrink-0 border-b-2 pb-1 font-body text-[10px] tracking-[0.3em] uppercase transition-colors ${
                tab === c
                  ? "border-wine text-wine"
                  : "border-transparent text-muted-foreground hover:text-charcoal"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl font-light text-charcoal md:text-3xl">
            {tab === "All" ? "All sets" : tab}
          </h3>
          <p className="font-body text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            {tab === "All"
              ? `${String(shown.length).padStart(2, "0")} sets`
              : `${CATEGORY_NOTES[tab] ?? "Handcrafted in Bikaner"} · ${String(shown.length).padStart(2, "0")} sets`}
          </p>
        </div>

        <div
          key={tab}
          className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-8 lg:grid-cols-4"
        >
          {shown.map((s) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/collections/$slug" params={{ slug: s.slug }} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={s.img}
                    alt={`${s.name} — ${s.cat} jewellery by Shree Kishan Jewellers & Sons`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-4 border-t border-border pt-3">
                  <span className="block font-display text-lg font-light text-charcoal">
                    {s.name}
                  </span>
                  <span className="mt-1.5 block font-body text-[10px] tracking-[0.3em] text-antique uppercase">
                    {s.cat}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
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
                {STEPS[step]!.t}
              </h2>
              <p className="mt-5 max-w-sm font-body text-sm leading-relaxed text-ivory/65">
                {STEPS[step]!.d}
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
          onTouchMove={(e) => move(e.touches[0]!.clientX, e.touches[0]!.clientY)}
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

/* ── Catalogue — every set named, linked to its own page ─────────── */
export function Gallery({ onOpen }: { onOpen?: (i: number) => void }) {
  void onOpen;
  return (
    <section id="gallery" className="bg-ivory px-6 py-28 md:px-12">
      <div className="mx-auto max-w-[1500px]">
        <p className="font-body text-[10px] tracking-[0.42em] text-antique uppercase">The Catalogue</p>
        <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.08] font-light text-charcoal md:text-5xl">
          The house, piece by piece.
        </h2>
        <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-muted-foreground">
          Every set carries its own name, category and page. Please enquire in store or on WhatsApp
          for details.
        </p>

        <nav
          aria-label="Browse by category"
          className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6"
        >
          <Link
            to="/collections"
            search={{}}
            className="font-body text-[10px] tracking-[0.3em] text-wine uppercase hover:text-charcoal"
          >
            All
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              to="/collections"
              search={{ category: c }}
              className="font-body text-[10px] tracking-[0.3em] text-muted-foreground uppercase hover:text-charcoal"
            >
              {c}
            </Link>
          ))}
        </nav>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-8 lg:grid-cols-4">
          {SETS.map((s) => (
            <motion.figure
              key={s.slug}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <Link to="/collections/$slug" params={{ slug: s.slug }} className="block">
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={s.img}
                    alt={`${s.name} — ${s.cat} jewellery by Shree Kishan Jewellers & Sons`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <figcaption className="mt-4 border-t border-border pt-3 text-center">
                  <span className="block font-display text-lg font-light tracking-wide text-charcoal">
                    {s.name}
                  </span>
                  <span className="mt-1.5 block font-body text-[10px] tracking-[0.32em] text-antique uppercase">
                    {s.cat}
                  </span>
                </figcaption>
              </Link>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ── Showroom band — real shop photography, softly blurred ─────────
 *  The entire card is clickable and opens the uploaded store photographs
 *  (façade + interior) in a premium full-screen lightbox. The existing
 *  card design, typography, spacing and image are untouched. */
export function Showroom() {
  const [open, setOpen] = useState(false);
  return (
    <>
    <section className="group relative isolate overflow-hidden px-6 py-32 md:px-12">
      <img
        src={shopFacadeUrl}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full scale-110 object-cover blur-[7px]"
      />
      <div className="absolute inset-0 -z-10 bg-charcoal/70" />
      {/* Full-card click target — invisible, sits above content, below modal */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Visit our store — open the showroom photograph full screen"
        className="absolute inset-0 z-10 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
      >
        <span className="sr-only">Open the showroom photograph full screen</span>
      </button>
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 md:grid-cols-2">
        <div>
          <p className="font-body text-[10px] tracking-[0.42em] text-champagne uppercase">
            The Showroom
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.08] font-light text-ivory md:text-5xl">
            Sarafa Bazaar,<br />
            <span className="italic text-champagne">Bikaner.</span>
          </h2>
          <p className="mt-7 max-w-md font-body text-sm leading-relaxed text-ivory/75">
            Marble, gold and quiet light — the house where every set is weighed, worked and worn for
            the first time. Visit us to see the collections in daylight.
            <span
              aria-hidden="true"
              className="ml-2 inline-block text-champagne transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </p>
        </div>
        <figure className="overflow-hidden">
          <img
            src={shopInteriorUrl}
            alt="Interior of the Shree Kishan Jewellers & Sons showroom in Bikaner"
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
        </figure>
      </div>
      </div>
    </section>
    <StoreLightbox
      open={open}
      onClose={() => setOpen(false)}
      images={storePhotos}
    />
    </>
  );
}

/* ── Visit-Our-Store lightbox — premium, fade + scale, click-outside close ─ */
function StoreLightbox({
  open,
  onClose,
  images,
}: {
  open: boolean;
  onClose: () => void;
  images: string[];
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!open) return;
    setI(0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && images.length > 1) setI((v) => (v + 1) % images.length);
      if (e.key === "ArrowLeft" && images.length > 1) setI((v) => (v - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, images.length]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-charcoal/85 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Visit our store — full screen photographs"
        >
          <motion.div
            key={i}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] max-w-[92vw] items-center justify-center"
          >
            <img
              src={images[i]}
              alt="Shree Kishan Jewellers & Sons showroom — store photograph"
              className="max-h-[88vh] max-w-[92vw] object-contain"
              draggable={false}
            />
          </motion.div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setI((v) => (v - 1 + images.length) % images.length);
                }}
                aria-label="Previous photograph"
                className="absolute left-3 font-body text-3xl text-ivory/60 transition-colors hover:text-ivory md:left-8"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setI((v) => (v + 1) % images.length);
                }}
                aria-label="Next photograph"
                className="absolute right-3 font-body text-3xl text-ivory/60 transition-colors hover:text-ivory md:right-8"
              >
                ›
              </button>
            </>
          )}

          {images.length > 1 && (
            <div
              role="tablist"
              aria-label="Store photographs"
              className="absolute bottom-6 flex max-w-[92vw] gap-3 overflow-x-auto px-4"
            >
              {images.map((src, idx) => (
                <button
                  key={src + idx}
                  type="button"
                  role="tab"
                  aria-selected={idx === i}
                  aria-label={`Show store photograph ${idx + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setI(idx);
                  }}
                  className={`h-12 w-12 shrink-0 overflow-hidden border transition-opacity ${
                    idx === i ? "border-champagne opacity-100" : "border-ivory/20 opacity-50 hover:opacity-90"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close photograph"
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center text-3xl leading-none text-ivory/80 transition-colors hover:text-ivory md:right-6 md:top-6"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
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