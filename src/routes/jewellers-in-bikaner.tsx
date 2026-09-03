import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Nav } from "@/components/skj/Sections";
import { shopFacadeUrl, shopInteriorUrl } from "@/lib/assets";
import { CATEGORIES, CATEGORY_NOTES, setsByCategory } from "@/lib/catalogue";
import { useScrollMemory } from "@/hooks/use-scroll-memory";

const BASE_URL = "https://shree-kishan-jewels.lovable.app";
const URL = `${BASE_URL}/jewellers-in-bikaner`;
const TITLE = "Jewellers in Bikaner — Shree Kishan Jewellers & Sons, Sarafa Bazaar";
const DESCRIPTION =
  "Seven generations of goldsmithing at Sarafa Bazaar, Bikaner. Polki, kundan, emerald, diamond and bridal jewellery made in our own workshop. Visit the showroom or enquire on WhatsApp.";

const WHATSAPP =
  "https://wa.me/919928873555?text=" +
  encodeURIComponent(
    "Hello Shree Kishan Jewellers & Sons, I would like to visit your Sarafa Bazaar showroom in Bikaner.",
  );

export const Route = createFileRoute("/jewellers-in-bikaner")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: shopFacadeUrl },
      { name: "twitter:image", content: shopFacadeUrl },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "JewelryStore",
          name: "Shree Kishan Jewellers & Sons",
          url: URL,
          image: [shopFacadeUrl, shopInteriorUrl],
          description: DESCRIPTION,
          telephone: "+91-99288-73555",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Sarafa Bazaar",
            addressLocality: "Bikaner",
            addressRegion: "Rajasthan",
            addressCountry: "IN",
          },
          areaServed: [
            { "@type": "City", name: "Bikaner" },
            { "@type": "State", name: "Rajasthan" },
          ],
          makesOffer: CATEGORIES.map((c) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: `${c} Jewellery`, category: c },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Jewellers in Bikaner", item: URL },
          ],
        }),
      },
    ],
  }),
  component: LocalPage,
});

function LocalPage() {
  useScrollMemory("/jewellers-in-bikaner");

  return (
    <main className="min-h-screen bg-ivory font-body antialiased">
      <Nav />

      <header className="relative isolate overflow-hidden px-6 pt-40 pb-24 md:px-12">
        <img
          src={shopFacadeUrl}
          alt="The Shree Kishan Jewellers & Sons showroom facade at Sarafa Bazaar, Bikaner"
          className="absolute inset-0 -z-10 h-full w-full scale-105 object-cover blur-[7px]"
        />
        <div className="absolute inset-0 -z-10 bg-charcoal/70" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[1500px]"
        >
          <p className="font-body text-[10px] tracking-[0.42em] text-champagne uppercase">
            Sarafa Bazaar · Bikaner · Rajasthan
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] font-light text-ivory md:text-6xl">
            Jewellers in Bikaner since the
            <span className="italic text-champagne"> first generation</span> of our family.
          </h1>
          <p className="mt-7 max-w-xl font-body text-sm leading-relaxed text-ivory/75">
            Shree Kishan Jewellers &amp; Sons has made polki, kundan, emerald, diamond and
            bridal jewellery in Sarafa Bazaar for seven generations. Every set is made in our
            own workshop, by karigars who have worked with this family for decades.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-champagne/50 bg-champagne/15 px-6 py-3 font-body text-[11px] tracking-[0.3em] text-ivory uppercase transition-colors hover:bg-champagne hover:text-charcoal"
            >
              Enquire on WhatsApp
            </a>
            <a
              href="tel:+919928873555"
              className="font-body text-[11px] tracking-[0.3em] text-ivory/70 uppercase hover:text-ivory"
            >
              +91 99288 73555
            </a>
          </div>
        </motion.div>
      </header>

      <section aria-labelledby="local-craft" className="px-6 py-24 md:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-2">
          <div>
            <h2
              id="local-craft"
              className="font-display text-3xl font-light text-charcoal md:text-4xl"
            >
              Made in Bikaner, not bought in
            </h2>
            <div className="mt-8 space-y-5 border-t border-border pt-8">
              <p className="max-w-xl font-body text-sm leading-relaxed text-muted-foreground">
                Sarafa Bazaar is where Bikaner has bought its gold for generations, and our
                counter has stood in it long enough that most of our clients arrive as the
                children or grandchildren of earlier clients. The work happens upstairs: uncut
                polki set in gold foil without solder, kundan burnished by hand, meenakari
                fired colour by colour on the reverse of a piece most people will never see.
              </p>
              <p className="max-w-xl font-body text-sm leading-relaxed text-muted-foreground">
                Because the workshop is ours, a bridal set can be fitted over several sittings
                before the wedding, a rani haar can be shortened for a daughter, and an
                heirloom brought to the counter can be re-stoned rather than replaced. Stones
                are chosen in daylight in the bazaar, matched over weeks for colour, and
                documented so future work can match the original.
              </p>
              <p className="max-w-xl font-body text-sm leading-relaxed text-muted-foreground">
                Families travel to us from across Bikaner district and wider Rajasthan —
                Nokha, Deshnok, Sri Dungargarh, Churu, Nagaur and Jaisalmer — usually for a
                wedding, and then for every occasion after it.
              </p>
            </div>
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-muted lg:aspect-auto">
            <img
              src={shopInteriorUrl}
              alt="Inside the Shree Kishan Jewellers & Sons showroom in Bikaner — marble counters and painted ceiling"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="local-categories"
        className="border-t border-border px-6 py-24 md:px-12"
      >
        <div className="mx-auto max-w-[1500px]">
          <h2
            id="local-categories"
            className="font-display text-3xl font-light text-charcoal md:text-4xl"
          >
            What you can see at the counter
          </h2>
          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => {
              const sets = setsByCategory(c);
              const hero = sets[0];
              return (
                <Link
                  key={c}
                  to="/collections"
                  search={{ category: c }}
                  className="group block"
                >
                  {hero && (
                    <div className="aspect-[4/5] overflow-hidden bg-muted">
                      <img
                        src={hero.img}
                        alt={`${c} jewellery at Shree Kishan Jewellers & Sons, Bikaner`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                  )}
                  <h3 className="mt-4 border-t border-border pt-3 font-display text-xl font-light text-charcoal">
                    {c} jewellery in Bikaner
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                    {CATEGORY_NOTES[c] ?? "Handcrafted in Bikaner"} ·{" "}
                    {String(sets.length).padStart(2, "0")} named sets on the floor.
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="local-search"
        className="border-t border-border px-6 py-24 md:px-12"
      >
        <div className="mx-auto max-w-[1100px]">
          <p className="font-body text-[10px] tracking-[0.42em] text-antique uppercase">
            Who we serve
          </p>
          <h2
            id="local-search"
            className="mt-5 max-w-3xl font-display text-3xl leading-[1.1] font-light text-charcoal md:text-4xl"
          >
            Looking for jewellers in Bikaner? Start at the counter, not a catalogue.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            <div>
              <h3 className="font-display text-xl font-light text-charcoal">
                Bridal jewellers in Bikaner
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                Brides and their families sit with us over two or three visits — choker first,
                then the haar, earrings and maang tikka matched to it. Everything is fitted in
                our workshop above the shop before the wedding week begins.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl font-light text-charcoal">
                Polki, kundan and emerald work
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                Uncut polki, hand-burnished kundan, meenakari fired in stages and emeralds
                chosen in daylight. These are the pieces people come to Sarafa Bazaar for, and
                they are made here rather than bought in finished.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl font-light text-charcoal">
                Repair, re-set and re-string
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                Old family sets are documented, re-seated and returned wearable. Restringing on
                pieces bought from us is done for the life of the piece.
              </p>
            </div>
          </div>
          <p className="mt-14 max-w-3xl font-body text-sm leading-relaxed text-muted-foreground">
            Families travel to the shop from across Bikaner city and district — Sarafa Bazaar,
            Kote Gate, Rani Bazaar, Gangashahr, Nokha, Deshnok, Lunkaransar and Sri Dungargarh —
            and from Jaisalmer, Jodhpur and Sriganganagar for bridal commissions. Tell us the set
            name on WhatsApp and we will keep it ready at the counter.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="visit"
        className="border-t border-border px-6 py-24 text-center md:px-12"
      >
        <div className="mx-auto max-w-xl">
          <h2 id="visit" className="font-display text-3xl font-light text-charcoal md:text-4xl">
            Visit the showroom
          </h2>
          <p className="mt-6 font-body text-sm leading-relaxed text-muted-foreground">
            Sarafa Bazaar, Bikaner, Rajasthan. Bridal appointments are best made a few days
            ahead so the karigars can prepare the pieces you want to see.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-wine px-6 py-3 font-body text-[11px] tracking-[0.3em] text-ivory uppercase hover:bg-charcoal"
            >
              Message us on WhatsApp
            </a>
            <Link
              to="/collections"
              className="self-center font-body text-[11px] tracking-[0.3em] text-muted-foreground uppercase hover:text-charcoal"
            >
              Browse the collections
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
