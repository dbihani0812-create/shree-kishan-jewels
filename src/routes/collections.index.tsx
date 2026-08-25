import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CATEGORIES, CATEGORY_NOTES, setsByCategory } from "@/lib/catalogue";
import { Nav } from "@/components/skj/Sections";
import { useScrollMemory } from "@/hooks/use-scroll-memory";

type Search = { category?: string };

const DEFAULT_CATEGORY = CATEGORIES[0]!;

export const Route = createFileRoute("/collections/")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const c = typeof search['category'] === "string" ? search['category'] : undefined;
    return { category: c && CATEGORIES.includes(c) ? c : DEFAULT_CATEGORY };
  },
  head: ({ match }) => {
    const cat = match.search.category ?? DEFAULT_CATEGORY;
    const note = CATEGORY_NOTES[cat] ?? "Handcrafted in Bikaner";
    const title = `${cat} Jewellery — Collections | Shree Kishan Jewellers & Sons`;
    const description = `${note}. Browse our ${cat.toLowerCase()} jewellery sets, each named and handcrafted in Sarafa Bazaar, Bikaner.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/collections?category=${encodeURIComponent(cat)}` },
      ],
      links: [{ rel: "canonical", href: `/collections?category=${encodeURIComponent(cat)}` }],
    };
  },
  component: CollectionsPage,
});

function CollectionsPage() {
  const { category } = Route.useSearch();
  const active = category ?? DEFAULT_CATEGORY;
  const sets = setsByCategory(active);
  useScrollMemory("/collections");

  return (
    <main className="min-h-screen bg-ivory font-body antialiased">
      <Nav />

      <header className="px-6 pt-36 pb-8 md:px-12">
        <div className="mx-auto max-w-[1500px]">
          <p className="font-body text-[10px] tracking-[0.42em] text-antique uppercase">
            The Collections
          </p>
          <h1 className="mt-5 max-w-2xl font-display text-4xl leading-[1.05] font-light text-charcoal md:text-6xl">
            {active}
            <span className="italic text-wine"> jewellery.</span>
          </h1>
          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-muted-foreground">
            {CATEGORY_NOTES[active] ?? "Handcrafted in Bikaner"} ·{" "}
            {String(sets.length).padStart(2, "0")} named sets. Please enquire in store or on
            WhatsApp for details.
          </p>
        </div>
      </header>

      {/* Category navigation — sticky, horizontally scrollable on mobile */}
      <div className="sticky top-[68px] z-30 border-y border-border bg-ivory/90 backdrop-blur-md">
        <nav
          aria-label="Jewellery categories"
          className="mx-auto flex max-w-[1500px] gap-7 overflow-x-auto px-6 py-4 md:px-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              to="/collections"
              search={{ category: c }}
              aria-current={active === c ? "page" : undefined}
              className={`shrink-0 border-b-2 pb-1 font-body text-[10px] tracking-[0.3em] uppercase transition-colors ${
                active === c
                  ? "border-wine text-wine"
                  : "border-transparent text-muted-foreground hover:text-charcoal"
              }`}
            >
              {c}
            </Link>
          ))}
        </nav>
      </div>

      <section
        key={active}
        aria-labelledby="active-category"
        className="px-6 pt-14 pb-32 md:px-12"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-5">
            <h2
              id="active-category"
              className="font-display text-3xl font-light text-charcoal md:text-4xl"
            >
              {active}
            </h2>
            <p className="font-body text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              {String(sets.length).padStart(2, "0")} sets
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-8 lg:grid-cols-4">
            {sets.map((s) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
    </main>
  );
}
