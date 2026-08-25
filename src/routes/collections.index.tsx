import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CATEGORIES, CATEGORY_NOTES, SETS, setsByCategory } from "@/lib/catalogue";
import { Nav } from "@/components/skj/Sections";

type Search = { category?: string };

export const Route = createFileRoute("/collections")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const c = typeof search.category === "string" ? search.category : undefined;
    return c && CATEGORIES.includes(c) ? { category: c } : {};
  },
  head: ({ match }) => {
    const cat = match.search.category;
    const title = cat
      ? `${cat} Jewellery — Collections | Shree Kishan Jewellers & Sons`
      : "Collections — Polki, Kundan, Emerald & Bridal | Shree Kishan Jewellers & Sons";
    const description = cat
      ? `Browse our ${cat.toLowerCase()} jewellery sets, handcrafted in Sarafa Bazaar, Bikaner.`
      : "Browse every jewellery set by category — polki, kundan, emerald, diamond, gold, bridal and heirloom work from Bikaner.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CollectionsPage,
});

function CollectionsPage() {
  const { category } = Route.useSearch();
  const shown = category ? [category] : CATEGORIES;

  return (
    <main className="min-h-screen bg-ivory font-body antialiased">
      <Nav />

      <header className="px-6 pt-36 pb-14 md:px-12">
        <div className="mx-auto max-w-[1500px]">
          <p className="font-body text-[10px] tracking-[0.42em] text-antique uppercase">
            The Collections
          </p>
          <h1 className="mt-5 max-w-2xl font-display text-4xl leading-[1.05] font-light text-charcoal md:text-6xl">
            {category ? (
              <>
                {category}
                <span className="italic text-wine"> jewellery.</span>
              </>
            ) : (
              <>
                Every set,<br />
                <span className="italic text-wine">by category.</span>
              </>
            )}
          </h1>
          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-muted-foreground">
            {SETS.length} named sets, grouped by craft. Please enquire in store or on WhatsApp for
            details.
          </p>

          <nav
            aria-label="Filter by category"
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6"
          >
            <Link
              to="/collections"
              search={{}}
              className={`font-body text-[10px] tracking-[0.3em] uppercase transition-colors ${
                !category ? "text-wine" : "text-muted-foreground hover:text-charcoal"
              }`}
            >
              All
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c}
                to="/collections"
                search={{ category: c }}
                className={`font-body text-[10px] tracking-[0.3em] uppercase transition-colors ${
                  category === c ? "text-wine" : "text-muted-foreground hover:text-charcoal"
                }`}
              >
                {c}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="px-6 pb-32 md:px-12">
        <div className="mx-auto max-w-[1500px] space-y-24">
          {shown.map((cat) => (
            <section key={cat} id={cat.toLowerCase()} aria-labelledby={`cat-${cat}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-5">
                <h2
                  id={`cat-${cat}`}
                  className="font-display text-3xl font-light text-charcoal md:text-4xl"
                >
                  {cat}
                </h2>
                <p className="font-body text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                  {CATEGORY_NOTES[cat] ?? "Handcrafted in Bikaner"} ·{" "}
                  {String(setsByCategory(cat).length).padStart(2, "0")} sets
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-8 lg:grid-cols-4">
                {setsByCategory(cat).map((s) => (
                  <motion.div
                    key={s.slug}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to="/collections/$slug"
                      params={{ slug: s.slug }}
                      className="group block"
                    >
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
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
