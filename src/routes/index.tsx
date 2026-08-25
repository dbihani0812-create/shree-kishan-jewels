import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
import { useScrollMemory } from "@/hooks/use-scroll-memory";

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

  // Fresh loads / refreshes always begin at the hero; returning from a set
  // page restores the previous scroll position. A hash is honoured on load.
  useScrollMemory("/", { honourHash: true });



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
