import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CATEGORIES, CATEGORY_NOTES, SETS, setsByCategory } from "@/lib/catalogue";
import { Nav } from "@/components/skj/Sections";
import { useScrollMemory } from "@/hooks/use-scroll-memory";

type Search = { category?: string };

const DEFAULT_CATEGORY = CATEGORIES[0]!;
const BASE_URL = "https://shree-kishan-jewels.lovable.app";

export const Route = createFileRoute("/collections/")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const c = typeof search['category'] === "string" ? search['category'] : undefined;
    return { category: c && (c === "All" || CATEGORIES.includes(c)) ? c : DEFAULT_CATEGORY };
  },
  head: ({ match }) => {
    const cat = match.search.category ?? DEFAULT_CATEGORY;
    const isAll = cat === "All";
    const note = isAll ? "Every named set" : CATEGORY_NOTES[cat] ?? "Handcrafted in Bikaner";
    const title = isAll
      ? "All Jewellery Collections | Shree Kishan Jewellers & Sons, Bikaner"
      : `${cat} Jewellery — Collections | Shree Kishan Jewellers & Sons`;
    const description = isAll
      ? "Every named jewellery set — polki, kundan, emerald, diamond, gold, bridal and more — handcrafted in Sarafa Bazaar, Bikaner."
      : `${note}. Browse our ${cat.toLowerCase()} jewellery sets, each named and handcrafted in Sarafa Bazaar, Bikaner.`;
    const url = `${BASE_URL}/collections?category=${encodeURIComponent(cat)}`;
    const sets = isAll ? SETS : setsByCategory(cat);
    const hero = sets[0]?.img;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        ...(hero
          ? [
              { property: "og:image", content: hero },
              { name: "twitter:image", content: hero },
              { name: "twitter:card", content: "summary_large_image" },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
              {
                "@type": "ListItem",
                position: 2,
                name: "Collections",
                item: `${BASE_URL}/collections`,
              },
              { "@type": "ListItem", position: 3, name: isAll ? "All Jewellery" : `${cat} Jewellery`, item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: isAll ? "All Jewellery" : `${cat} Jewellery`,
            description,
            numberOfItems: sets.length,
            itemListElement: sets.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.name,
              url: `${BASE_URL}/collections/${s.slug}`,
              image: s.img,
            })),
          }),
        },
      ],
    };
  },
  component: CollectionsPage,
});

function CollectionsPage() {
  const { category } = Route.useSearch();
  const active = category ?? DEFAULT_CATEGORY;
  const isAll = active === "All";
  const sets = isAll ? SETS : setsByCategory(active);
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
            {isAll ? "All" : active}
            <span className="italic text-wine"> jewellery.</span>
          </h1>
          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-muted-foreground">
            {isAll ? "Every named set" : CATEGORY_NOTES[active] ?? "Handcrafted in Bikaner"} ·{" "}
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
          {[...CATEGORIES, "All"].map((c) => (
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
              {isAll ? "All sets" : active}
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
