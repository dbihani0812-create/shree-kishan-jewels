import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence } from "motion/react";
import { Nav } from "@/components/skj/Sections";
import { recommendSets, type StylistResult } from "@/lib/stylist.functions";

const BASE_URL = "https://shree-kishan-jewels.lovable.app";

const TITLE = "Personal Jewellery Stylist | Shree Kishan Jewellers & Sons, Bikaner";
const DESCRIPTION =
  "Tell us the occasion, the stones and the look you have in mind — our stylist suggests the sets from our Bikaner counter that suit you best.";

const PROMPTS = [
  "A bride's reception — something long, polki, not too heavy",
  "Emerald, for a sangeet, with a high neckline",
  "Gold only, everyday wear, nothing showy",
  "A first anniversary gift — diamonds, quiet and modern",
];

export const Route = createFileRoute("/stylist")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BASE_URL}/stylist` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/stylist` }],
  }),
  component: StylistPage,
});

function StylistPage() {
  const ask = useServerFn(recommendSets);
  const [brief, setBrief] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StylistResult | null>(null);

  const submit = async (text: string) => {
    const value = text.trim();
    if (value.length < 4 || loading) return;
    setLoading(true);
    setResult(null);
    try {
      setResult(await ask({ data: { brief: value } }));
    } catch {
      setResult({
        intro: "",
        picks: [],
        error: "We could not reach the stylist just now. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-ivory font-body antialiased">
      <Nav />

      <header className="px-6 pt-36 pb-10 md:px-12">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-body text-[10px] tracking-[0.42em] text-antique uppercase">
            Personal Stylist
          </p>
          <h1 className="mt-5 max-w-2xl font-display text-4xl leading-[1.05] font-light text-charcoal md:text-6xl">
            Tell us what you have
            <span className="italic text-wine"> in mind.</span>
          </h1>
          <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-muted-foreground">
            Describe the occasion, the stones you love, the neckline, how heavy you want it to feel.
            We will suggest the sets from our own counter in Sarafa Bazaar that suit you best — then
            keep them ready for your visit.
          </p>
        </div>
      </header>

      <section className="px-6 pb-16 md:px-12">
        <div className="mx-auto max-w-[1100px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void submit(brief);
            }}
            className="border-t border-border pt-8"
          >
            <label
              htmlFor="brief"
              className="font-body text-[10px] tracking-[0.3em] text-antique uppercase"
            >
              Your brief
            </label>
            <textarea
              id="brief"
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              rows={4}
              maxLength={1200}
              placeholder="For my sister's wedding in December — emerald and polki, something I can also wear again at a reception."
              className="mt-4 w-full resize-none border border-border bg-white/70 px-4 py-3.5 font-body text-sm leading-relaxed text-charcoal placeholder:text-muted-foreground/70 focus:border-wine focus:outline-none"
            />

            <div className="mt-5 flex flex-wrap gap-2.5">
              {PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setBrief(p);
                    void submit(p);
                  }}
                  className="border border-border px-3.5 py-2 font-body text-[11px] text-muted-foreground transition-colors hover:border-wine hover:text-wine"
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || brief.trim().length < 4}
              className="mt-8 bg-charcoal px-8 py-3.5 font-body text-[10px] tracking-[0.34em] text-ivory uppercase transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? "Choosing for you…" : "Suggest sets"}
            </button>
          </form>

          <AnimatePresence mode="wait">
            {loading && (
              <motion.p
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-12 animate-pulse font-display text-lg italic font-light text-wine"
              >
                Laying the pieces out on the counter…
              </motion.p>
            )}

            {!loading && result?.error && (
              <motion.p
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 border border-wine/30 bg-wine/5 px-5 py-4 font-body text-sm text-wine"
              >
                {result.error}
              </motion.p>
            )}

            {!loading && result && !result.error && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-14"
              >
                <p className="max-w-2xl font-display text-xl leading-relaxed font-light text-charcoal italic md:text-2xl">
                  {result.intro}
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {result.picks.map((p) => (
                    <Link
                      key={p.slug}
                      to="/collections/$slug"
                      params={{ slug: p.slug }}
                      className="group block"
                    >
                      <div className="aspect-[4/5] overflow-hidden bg-muted">
                        <img
                          src={p.img}
                          alt={`${p.name} — ${p.cat} by Shree Kishan Jewellers & Sons`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                        />
                      </div>
                      <div className="mt-4 border-t border-border pt-3">
                        <span className="block font-display text-lg font-light text-charcoal">
                          {p.name}
                        </span>
                        <span className="mt-1.5 block font-body text-[10px] tracking-[0.3em] text-antique uppercase">
                          {p.cat}
                        </span>
                        <p className="mt-3 font-body text-[13px] leading-relaxed text-muted-foreground">
                          {p.reason}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-border pt-8">
                  <a
                    href={`https://wa.me/919928873555?text=${encodeURIComponent(
                      `Hello, I would like to see these sets: ${result.picks
                        .map((p) => p.name)
                        .join(", ")}.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-wine px-7 py-3.5 font-body text-[10px] tracking-[0.34em] text-ivory uppercase transition-opacity hover:opacity-85"
                  >
                    Keep these ready on WhatsApp
                  </a>
                  <Link
                    to="/collections"
                    search={{ category: "All" }}
                    className="font-body text-[10px] tracking-[0.3em] text-muted-foreground uppercase underline-offset-4 hover:text-charcoal hover:underline"
                  >
                    Browse every set
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-16 max-w-xl font-body text-[11px] leading-relaxed text-muted-foreground">
            Suggestions are made by AI from our own catalogue and are a starting point, not a
            valuation. Every set is finally shown to you in daylight at the showroom.
          </p>
        </div>
      </section>
    </main>
  );
}
