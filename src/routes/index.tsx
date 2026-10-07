import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Categories,
  Collections,
  Contact,
  Craft,
  CurtainReveal,
  Gallery,
  Heritage,
  Loupe,
  Nav,
  PosterHero,
  SignaturePiece,
  Showroom,
  Viewer,
} from "@/components/skj/Sections";
import { useScrollMemory } from "@/hooks/use-scroll-memory";
import { shopFacadeUrl, logoUrl } from "@/lib/assets";
import { CATEGORIES } from "@/lib/catalogue";

const BASE_URL = "https://shree-kishan-jewels.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shree Kishan Jewellers & Sons — Polki, Kundan, Diamond & Bridal Jewellery in Bikaner" },
      {
        name: "description",
        content:
          "Shree Kishan Jewellers & Sons — seven generations of handcrafted Polki, Kundan, Diamond, Gold & Bridal jewellery at Sarafa Bazaar, Bikaner, Rajasthan. Browse 45+ named sets, use our AI stylist, or visit the showroom.",
      },
      {
        name: "keywords",
        content:
          "Shree Kishan Jewellers, jewellers in Bikaner, polki jewellery Bikaner, kundan jewellery, diamond jewellery Bikaner, bridal jewellery Rajasthan, gold jewellers Bikaner, Sarafa Bazaar jewellery, wedding jewellery Bikaner, emerald jewellery, rani haar, choker necklace Bikaner",
      },
      {
        property: "og:title",
        content: "Shree Kishan Jewellers & Sons — Polki, Kundan, Diamond & Bridal Jewellery in Bikaner",
      },
      {
        property: "og:description",
        content: "Seven generations of fine jewellery craftsmanship. Handcrafted Polki, Kundan, Diamond, Gold & Bridal jewellery at Sarafa Bazaar, Bikaner.",
      },
      { property: "og:url", content: `${BASE_URL}/` },
      { property: "og:image", content: shopFacadeUrl },
      { property: "og:image:alt", content: "Shree Kishan Jewellers & Sons showroom at Sarafa Bazaar, Bikaner" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: shopFacadeUrl },
    ],
    links: [
      { rel: "canonical", href: `${BASE_URL}/` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "JewelryStore",
          name: "Shree Kishan Jewellers & Sons",
          alternateName: "SKJ Bikaner",
          url: BASE_URL,
          logo: logoUrl,
          image: [shopFacadeUrl],
          description:
            "Seven generations of handcrafted Polki, Kundan, Diamond, Gold & Bridal jewellery at Sarafa Bazaar, Bikaner, Rajasthan.",
          telephone: ["+91-99288-73555", "+91-97999-58266", "+91-89493-77051"],
          email: "skj.bkn07@gmail.com",
          priceRange: "₹₹₹",
          currenciesAccepted: "INR",
          paymentAccepted: "Cash, UPI, Bank Transfer",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Teliwara Road, Sarafa Bazaar, Joshiwara, Sunaron Ka Mohalla",
            addressLocality: "Bikaner",
            addressRegion: "Rajasthan",
            postalCode: "334001",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 28.0131133,
            longitude: 73.3032493,
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              opens: "10:00",
              closes: "20:00",
            },
          ],
          areaServed: [
            { "@type": "City", name: "Bikaner" },
            { "@type": "State", name: "Rajasthan" },
            { "@type": "Country", name: "India" },
          ],
          sameAs: [
            "https://instagram.com/shree_kishan_jewellers",
            "https://wa.me/919928873555",
            "https://maps.app.goo.gl/F3qpardNJB1xz6ag6",
          ],
          makesOffer: CATEGORIES.map((c) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: `${c} Jewellery`, category: c },
          })),
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Jewellery Collections",
            url: `${BASE_URL}/collections`,
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Where is Shree Kishan Jewellers & Sons located?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We are located at Teliwara Road, Sarafa Bazaar, Joshiwara, Sunaron Ka Mohalla, Bikaner, Rajasthan 334001, India. Our showroom has been in Sarafa Bazaar for seven generations.",
              },
            },
            {
              "@type": "Question",
              name: "What types of jewellery does Shree Kishan Jewellers make?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We handcraft Polki, Kundan, Diamond, Gold, Emerald, and Bridal jewellery. Our collections include Choker Sets, Necklace Sets, Rani Haar, Pendant Sets, Gold Sets, Diamond Sets, and complete Bridal Sets — all made in our own workshop in Sarafa Bazaar.",
              },
            },
            {
              "@type": "Question",
              name: "How can I contact Shree Kishan Jewellers?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You can reach us on WhatsApp at +91 99288 73555, call us at +91 99288 73555 / +91 97999 58266 / +91 89493 77051, or email us at skj.bkn07@gmail.com. For bridal viewings, we recommend a few days' notice so the karigars can prepare the pieces.",
              },
            },
            {
              "@type": "Question",
              name: "Does Shree Kishan Jewellers offer custom or bridal jewellery?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. A bridal set is fitted over several sittings before the wedding. Everything is made in our own workshop above the shop — sizing, restringing and small design changes are all done in-house, not sent out.",
              },
            },
            {
              "@type": "Question",
              name: "Do you ship jewellery outside Bikaner?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We prefer that customers see and try pieces at our showroom in Sarafa Bazaar, Bikaner. Families travel to us from across Rajasthan — Nokha, Deshnok, Jodhpur, Jaisalmer and Sriganganagar — for bridal commissions. Please contact us on WhatsApp to discuss arrangements.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [open, setOpen] = useState<number | null>(null);

  // Fresh loads / refreshes always begin at the hero; returning from a set
  // page restores the previous scroll position. Fresh loads clear stale anchors.
  useScrollMemory("/", { honourHash: true, startAtTopOnLoad: true });



  return (
    <main className="bg-ivory font-body antialiased">
      <CurtainReveal />
      <Nav />
      <PosterHero />
      <SignaturePiece />
      <Categories />
      <Collections onOpen={setOpen} />
      <Craft />
      <Loupe />
      <Heritage />
      <Gallery onOpen={setOpen} />
      <Showroom />
      <Contact />
      <Viewer index={open} onClose={() => setOpen(null)} />
    </main>
  );
}
