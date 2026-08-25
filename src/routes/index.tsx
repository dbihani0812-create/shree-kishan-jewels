import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shree Kishan Jewellers & Sons — Fine Jewellery, Bikaner" },
      {
        name: "description",
        content:
          "Polki, diamond, gold, kundan, bridal and custom jewellery, handcrafted in Sarafa Bazaar, Bikaner across seven generations.",
      },
      {
        property: "og:title",
        content: "Shree Kishan Jewellers & Sons — Fine Jewellery, Bikaner",
      },
      {
        property: "og:description",
        content: "We Believe in Quality and Not in Competition.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [open, setOpen] = useState<number | null>(null);

  // Fresh loads / refreshes always begin at the hero. A hash is honoured
  // intentionally, after layout settles.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const hash = window.location.hash.replace("#", "");
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const t = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 900);
    return () => window.clearTimeout(t);
  }, []);


  return (
    <main className="bg-ivory font-body antialiased">
      <CurtainReveal />
      <Nav />
      <PosterHero />
      <SignaturePiece />
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
