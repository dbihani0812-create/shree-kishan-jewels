import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { getSet, setsByCategory } from "@/lib/catalogue";
import { Nav } from "@/components/skj/Sections";
import { Lightbox } from "@/components/skj/Lightbox";

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
    const description = `${set.name}, a ${set.cat.toLowerCase()} set handcrafted in Sarafa Bazaar, Bikaner. ${set.story[0]}`.slice(
      0,
      158,
    );
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:image", content: set.img },
        { name: "twitter:image", content: set.img },
      ],
    };
  },
  component: SetPage,
});

function SetPage() {
  const { set } = Route.useLoaderData();
  const [lightbox, setLightbox] = useState<number | null>(null);
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
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                <a
                  href="https://wa.me/919928873555"
                  className="font-body text-[11px] tracking-[0.3em] text-wine uppercase hover:text-charcoal"
                >
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
