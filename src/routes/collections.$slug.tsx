import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { getSet, setsByCategory, localCopy, categoryLocalPhrase } from "@/lib/catalogue";
import { Nav } from "@/components/skj/Sections";
import { Lightbox } from "@/components/skj/Lightbox";
import { useScrollMemory } from "@/hooks/use-scroll-memory";

const BASE_URL = "https://shree-kishan-jewels.lovable.app";
const SHOP_WHATSAPP = "919928873555";

/** WhatsApp deep link pre-filled with the set the visitor is looking at. */
const whatsappHref = (name: string, cat: string) =>
  `https://wa.me/${SHOP_WHATSAPP}?text=${encodeURIComponent(
    `Hello Shree Kishan Jewellers & Sons, I would like to enquire about the "${name}" (${cat}) set.`,
  )}`;

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const set = getSet(params.slug);
    if (!set) throw notFound();
    return { set };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Set not found" }, { name: "robots", content: "noindex" }] };
    }
    const { set } = loaderData;
    const title = `${set.name} — ${set.cat} | Shree Kishan Jewellers & Sons`;
    const description = `${set.name} — ${set.cat.toLowerCase()} set handcrafted at Sarafa Bazaar by Shree Kishan Jewellers & Sons, ${categoryLocalPhrase(set.cat)}. ${set.story[0]}`.slice(
      0,
      158,
    );
    const url = `${BASE_URL}/collections/${set.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:image", content: set.img },
        { name: "twitter:image", content: set.img },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:url", content: url },
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
              {
                "@type": "ListItem",
                position: 3,
                name: `${set.cat} Jewellery`,
                item: `${BASE_URL}/collections?category=${encodeURIComponent(set.cat)}`,
              },
              { "@type": "ListItem", position: 4, name: set.name, item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: set.name,
            url,
            image: set.gallery,
            description: set.story.join(" "),
            category: `${set.cat} Jewellery`,
            brand: { "@type": "Brand", name: "Shree Kishan Jewellers & Sons" },
          }),
        },
      ],
    };
  },
  component: SetPage,
});

function SetPage() {
  const { set } = Route.useLoaderData();
  const [lightbox, setLightbox] = useState<number | null>(null);
  useScrollMemory(`/collections/${set.slug}`);
  const related = setsByCategory(set.cat).filter((s) => s.slug !== set.slug).slice(0, 4);

  return (
    <main className="min-h-screen bg-ivory font-body antialiased">
      <Nav />

      <div className="px-6 pt-36 pb-24 md:px-12">
        <div className="mx-auto max-w-[1500px]">
          <Link
            to="/collections"
            search={{ category: set.cat }}
            className="font-body text-[10px] tracking-[0.3em] text-muted-foreground uppercase hover:text-charcoal"
          >
            ← {set.cat} collection
          </Link>

          <div className="mt-8 grid gap-14 lg:grid-cols-2">
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightbox(0)}
              className="group block aspect-[4/5] overflow-hidden bg-muted"
              aria-label={`View ${set.name} full screen`}
            >
              <img
                src={set.img}
                alt={`${set.name} — ${set.cat} jewellery by Shree Kishan Jewellers & Sons`}
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
              />
            </motion.button>

            <div className="lg:pt-10">
              <p className="font-body text-[10px] tracking-[0.42em] text-antique uppercase">
                {set.cat}
              </p>
              <h1 className="mt-5 font-display text-4xl leading-[1.05] font-light text-charcoal md:text-5xl">
                {set.name}
              </h1>
              <div className="mt-8 space-y-5 border-t border-border pt-8">
                {set.story.map((p) => (
                  <p key={p} className="max-w-lg font-body text-sm leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={whatsappHref(set.name, set.cat)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Enquire about ${set.name} on WhatsApp`}
                  className="inline-flex items-center gap-3 border border-wine/40 bg-wine px-6 py-3 font-body text-[11px] tracking-[0.3em] text-ivory uppercase transition-colors hover:bg-charcoal hover:border-charcoal"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.13-.42-2.15-1.33-.8-.71-1.33-1.59-1.48-1.89-.15-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.38-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.33 5.07 4.54.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.42 9.42 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.43 9.45-9.43a9.4 9.4 0 0 1 6.67 2.77 9.35 9.35 0 0 1 2.76 6.67c0 5.2-4.24 9.42-9.43 9.42zM20.5 3.49A11.35 11.35 0 0 0 12.04 0C5.79 0 .71 5.08.71 11.32c0 1.99.52 3.94 1.51 5.65L.5 24l7.2-1.89a11.3 11.3 0 0 0 4.34 1.1h.01c6.24 0 11.32-5.08 11.32-11.32 0-3.03-1.18-5.87-3.32-8.01z" />
                  </svg>
                  Enquire on WhatsApp
                </a>
                <a
                  href="tel:+919928873555"
                  className="font-body text-[11px] tracking-[0.3em] text-muted-foreground uppercase hover:text-charcoal"
                >
                  Call the showroom
                </a>
              </div>
            </div>
          </div>

          <section aria-labelledby="set-gallery" className="mt-24">
            <h2
              id="set-gallery"
              className="font-display text-2xl font-light text-charcoal md:text-3xl"
            >
              Gallery
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
              {set.gallery.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setLightbox(i)}
                  className="group block aspect-square overflow-hidden bg-muted"
                  aria-label={`Open image ${i + 1} of ${set.name}`}
                >
                  <img
                    src={src}
                    alt={`${set.name} detail ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                </button>
              ))}
            </div>
          </section>

          <section aria-labelledby="local" className="mt-24 border-t border-border pt-14">
            <p className="font-body text-[10px] tracking-[0.42em] text-antique uppercase">
              Sarafa Bazaar · Bikaner · Rajasthan
            </p>
            <h2
              id="local"
              className="mt-5 font-display text-2xl font-light text-charcoal md:text-3xl"
            >
              Seeing {set.name} in Bikaner
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {localCopy(set).map((p) => (
                <p key={p} className="font-body text-sm leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
            <Link
              to="/jewellers-in-bikaner"
              className="mt-10 inline-block font-body text-[11px] tracking-[0.3em] text-charcoal uppercase underline decoration-antique/50 underline-offset-8 hover:decoration-charcoal"
            >
              About our Bikaner showroom
            </Link>
          </section>

          {related.length > 0 && (
            <section aria-labelledby="related" className="mt-24 border-t border-border pt-14">
              <h2 id="related" className="font-display text-2xl font-light text-charcoal">
                More in {set.cat}
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
                {related.map((s) => (
                  <Link
                    key={s.slug}
                    to="/collections/$slug"
                    params={{ slug: s.slug }}
                    className="group block"
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-muted">
                      <img
                        src={s.img}
                        alt={`${s.name} — ${s.cat} jewellery`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                    <span className="mt-4 block border-t border-border pt-3 font-display text-lg font-light text-charcoal">
                      {s.name}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <Lightbox
        images={set.gallery}
        index={lightbox}
        label={set.name}
        onClose={() => setLightbox(null)}
        onChange={setLightbox}
      />
    </main>
  );
}
