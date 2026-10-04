// Catalogue data — every set named, categorised by piece type and slugged.
// Real client photography only; each photograph is used for exactly one set.
import { pieces } from "@/lib/assets";

export type JewellerySet = {
  slug: string;
  name: string;
  cat: string;
  img: string;
  /** Editorial story shown on the set page. */
  story: string[];
  /** Real photographs shown in the set gallery (main image first). */
  gallery: string[];
};

/** Photo numbers in the same order as the `pieces` manifest (piece-05 does not exist). */
const PHOTO_NUMBERS = [
  1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  28,
];

const photo = (n: number) => pieces[PHOTO_NUMBERS.indexOf(n)]!;

/** Each entry is tied to one real photograph, categorised by what the photograph shows. */
const RAW: { n: number; name: string; cat: string; story: string[] }[] = [
  // ── Choker Sets ──
  { n: 1, name: "Ambika Kundan Choker", cat: "Choker Sets", story: ["A close-fitting kundan choker with a carved centre and pearl edging, matched with short chandbali earrings.", "Set in 22k gold by hand — meant for the first evening of a wedding week."] },
  { n: 11, name: "Neelam Emerald Choker", cat: "Choker Sets", story: ["Rows of carved emerald beads strung on silk, held around a single polki centrepiece.", "Restrung free of charge for the life of the piece."] },
  { n: 12, name: "Vasundhara Polki Choker", cat: "Choker Sets", story: ["Broad polki plates with an emerald bead fringe, worn with long matching earrings.", "The drops can be exchanged for pearls for daytime wear."] },
  { n: 15, name: "Chandni Polki Choker", cat: "Choker Sets", story: ["A lighter choker of uncut polki and emerald, cut to sit exactly at the base of the throat.", "Made for receptions where the neckline is high."] },
  { n: 18, name: "Jharokha Kundan Choker", cat: "Choker Sets", story: ["Lattice work drawn from the carved window screens of Rajasthani havelis, built as a bib choker.", "Every opening in the lattice is filed by hand, not stamped."] },
  { n: 19, name: "Gulmohar Emerald Choker", cat: "Choker Sets", story: ["Emerald tablets framed in polki, finished with a graduated fringe that moves as the wearer does.", "Named for the gulmohar trees that flower red across Bikaner in summer."] },
  { n: 27, name: "Mirage Diamond Choker", cat: "Choker Sets", story: ["Diamond and emerald set close together so the metal disappears and the line reads as one surface of light.", "A modern commission, worn without earrings for a clean neckline."] },

  // ── Necklace Sets ──
  { n: 4, name: "Chhavi Polki Necklace", cat: "Necklace Sets", story: ["A single-line polki necklace with pear drops, matched with broad polki earrings.", "Designed to sit above the collarbone so it reads clearly in photographs."] },
  { n: 6, name: "Anmol Polki Necklace", cat: "Necklace Sets", story: ["Two rows of large uncut polki plates over a plain gold frame.", "The centre plate is removable and can be worn alone on a gold chain."] },
  { n: 13, name: "Mohar Kundan Necklace", cat: "Necklace Sets", story: ["Kundan setting in its oldest form: gold foil burnished around each stone by hand, without solder.", "Reversible meenakari on the back, painted in the Bikaner palette."] },
  { n: 14, name: "Roshni Turquoise Necklace", cat: "Necklace Sets", story: ["A light everyday necklace of turquoise and polki, strung on a fine gold chain.", "Made for clients who wear their jewellery daily rather than seasonally."] },
  { n: 16, name: "Navratna Heritage Necklace", cat: "Necklace Sets", story: ["Nine stones in the traditional navratna arrangement, each seated in its own kundan bezel.", "Matched over several months so the colours sit evenly across the line."] },
  { n: 20, name: "Rasleela Kundan Necklace", cat: "Necklace Sets", story: ["Figurative kundan panels with coral and emerald accents, painted and set together.", "Commissioned work — each panel takes about a week."] },
  { n: 25, name: "Amrapali Polki Necklace", cat: "Necklace Sets", story: ["A court silhouette from the early 1900s, drawn from a pattern book kept in the family since the fourth generation.", "Polki fringe finished with tiny emerald beads."] },

  // ── Rani Haar ──
  { n: 17, name: "Trishala Polki Rani Haar", cat: "Rani Haar", story: ["A long rani haar of uncut diamonds stepped in three tiers, worn with a short polki necklace above.", "The centre pendant lifts out and can be worn alone."] },
  { n: 21, name: "Suvarna Gold Rani Haar", cat: "Rani Haar", story: ["A ceremonial long haar in high-karat gold with a broad pendant and matching jhumkas.", "Finished with a soft satin polish rather than a mirror shine."] },
  { n: 22, name: "Marwar Gold Rani Haar", cat: "Rani Haar", story: ["Pure goldsmithing from the Marwar tradition — surface, shadow and weight, almost no stones.", "Hand-hammered texture that cannot be reproduced by machine."] },

  // ── Pendant Sets ──
  { n: 8, name: "Panna Diamond Pendant Mala", cat: "Pendant Sets", story: ["Five strands of emerald beads carrying a single diamond and emerald pendant.", "The clasp is hidden inside the design so the line is unbroken."] },
  { n: 9, name: "Kesariya Temple Pendant Mala", cat: "Pendant Sets", story: ["A temple pendant cast in relief in the South Indian tradition, hung on emerald bead strands.", "Heavier than it looks, and built to be worn for decades."] },
  { n: 10, name: "Virasat Gold Pendant Chain", cat: "Pendant Sets", story: ["A quiet gold chain with beaded stations and a small drop pendant — the piece that never comes off.", "Every stone is documented so future work can match the original."] },

  // ── Gold Sets ──
  { n: 3, name: "Bikaner Gold Coin Necklace", cat: "Gold Sets", story: ["Repeated gold coin motifs drawn from the jharokhas of the old city, strung as a graduated collar.", "Weight is distributed along the length so it sits flat through a full ceremony."] },
  { n: 23, name: "Sarafa Layered Gold Necklace", cat: "Gold Sets", story: ["Three gold chains gathered into one carved pendant, made at our workshop above the shop in Sarafa Bazaar.", "Small design changes and lengthening are done in-house."] },
  { n: 24, name: "Kanchan Classic Gold Necklace", cat: "Gold Sets", story: ["A classic Rajasthani gold collar with matching drop earrings — the set families buy first.", "Sits heavy at the centre and light at the shoulders."] },

  // ── Diamond Sets ──
  { n: 7, name: "Sitara Diamond Necklace", cat: "Diamond Sets", story: ["Brilliant-cut diamonds graded for white, set in a rhodium finish that keeps the metal invisible.", "Every claw is filed until the stone sits level with its neighbour."] },
  { n: 26, name: "Chandrika Diamond & Emerald Necklace", cat: "Diamond Sets", story: ["A long diamond line closing on a single emerald tablet and pear drop.", "Made for a client who wanted length without weight."] },

  // ── Bridal Sets ──
  { n: 2, name: "Padmini Bridal Set", cat: "Bridal Sets", story: ["A complete bridal suite — choker, rani haar and earrings — designed as one architecture in polki and gold.", "Made to be worn together, then broken apart across a lifetime of smaller occasions."] },
  { n: 28, name: "Shubh Vivah Bridal Set", cat: "Bridal Sets", story: ["Made for the pheras: a gold choker, a long pendant haar and jhumkas in a single deliberately grand statement.", "Fitted to the bride over three sittings before the wedding."] },
];

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** 17 new photographs added to the /jewellery/ folder. */
const NEW_RAW: { file: string; name: string; cat: string; story: string[] }[] = [
  {
    file: "skj 2 zip file _page-0001.jpg",
    name: "Padma Pearl Lariat Set",
    cat: "Pendant Sets",
    story: [
      "A delicate pearl mala strung as an elegant lariat with kundan emerald stations and droplet tassels.",
      "Paired with matching pear-shaped polki and emerald drop earrings.",
    ],
  },
  {
    file: "skj 2 zip file _page-0002.jpg",
    name: "Sitara Emerald Pendant Mala",
    cat: "Pendant Sets",
    story: [
      "Multi-strand emerald bead mala crowned with a radiant starburst polki medallion.",
      "Finished with delicate seed pearls and emerald droplet clusters.",
    ],
  },
  {
    file: "skj 2 zip file _page-0003.jpg",
    name: "Aaradhya Polki Necklace",
    cat: "Necklace Sets",
    story: [
      "A royal kundan necklace framed in deep green meenakari with graduated pear polki drops.",
      "Designed to sit gracefully above the neckline, paired with matching statement earrings.",
    ],
  },
  {
    file: "skj 2 zip file _page-0004.jpg",
    name: "Rajrani Emerald Rani Haar",
    cat: "Rani Haar",
    story: [
      "A majestic multi-strand pearl rani haar punctuated with circular polki medallions and cabochon emeralds.",
      "Accompanied by matching circular polki ear studs with emerald drop accents.",
    ],
  },
  {
    file: "skj 2 zip file _page-0005.jpg",
    name: "Gulabi Kundan Mesh Necklace",
    cat: "Necklace Sets",
    story: [
      "Woven seed pearl mesh necklace accented with carved pink quartz blossoms and fine emerald beads.",
      "Features a central pear polki pendant with matching chandelier earrings.",
    ],
  },
  {
    file: "skj 2 zip file _page-0006.jpg",
    name: "Neelkanth Royal Pendant Mala",
    cat: "Pendant Sets",
    story: [
      "Tanzanite and pearl beaded mala featuring a royal rectangular Bikaneri blue meenakari pendant.",
      "Intricately detailed with uncut polki work and hanging pearl drops.",
    ],
  },
  {
    file: "skj 2 zip file _page-0007.jpg",
    name: "Meera Emerald Swag Necklace",
    cat: "Necklace Sets",
    story: [
      "Lustrous pearl strands transitioning into carved emerald bead swags and an ornate polki centrepiece.",
      "Complemented by sculpted emerald teardrop earrings.",
    ],
  },
  {
    file: "skj 2 zip file _page-0008.jpg",
    name: "Tarana Emerald Pendant Mala",
    cat: "Pendant Sets",
    story: [
      "Layered emerald beads supporting a geometric star-shaped polki medallion with pearl fringes.",
      "A timeless heritage piece crafted for celebratory gatherings.",
    ],
  },
  {
    file: "skj 2 zip file _page-0009.jpg",
    name: "Parijat Floral Kundan Necklace",
    cat: "Necklace Sets",
    story: [
      "Fine micro-pearl woven collar with carved floral quartz accents and royal green enamelled polki.",
      "Designed with balanced symmetry and matching floral stud earrings.",
    ],
  },
  {
    file: "skj 2 zip file _page-0010.jpg",
    name: "Navratna Carved Gemstone Necklace",
    cat: "Necklace Sets",
    story: [
      "A grand heritage collar featuring intricately carved ruby, sapphire, and emerald gemstones in polki gold bezels.",
      "Finished with a fringe of vibrant gemstone droplets and matching earrings.",
    ],
  },
  {
    file: "skj 2 zip file _page-0011.jpg",
    name: "Kalyani Pearl Mesh Necklace",
    cat: "Necklace Sets",
    story: [
      "A handcrafted seed pearl tapestry necklace adorned with blossom motifs and tumbling emerald drops.",
      "Designed to sit comfortably with regal drape.",
    ],
  },
  {
    file: "skj 2 zip file _page-0012.jpg",
    name: "Hasli Polki & Emerald Collar",
    cat: "Choker Sets",
    story: [
      "A sleek 22k gold rigid hasli collar suspended with fluted emerald melon beads and polki charms.",
      "A contemporary tribute to ancient royal collar traditions.",
    ],
  },
  {
    file: "skj 2 zip file _page-0013.jpg",
    name: "Manikya Ruby Diamond Mala",
    cat: "Diamond Sets",
    story: [
      "Three strands of graded ruby beads suspending an oval diamond pave shield with central cabochon ruby.",
      "Matched with radiant diamond tops and south sea pearl drops.",
    ],
  },
  {
    file: "skj 2 zip file _page-0014.jpg",
    name: "Rani Roopmati Polki Choker",
    cat: "Choker Sets",
    story: [
      "A dense seed-pearl choker accented with floral polki plaques and a sweeping emerald swag fringe.",
      "Made for gala evenings and royal bridal festivities.",
    ],
  },
  {
    file: "skj 2 zip file _page-0015.jpg",
    name: "Narmada Polki & Tumble Gem Necklace",
    cat: "Necklace Sets",
    story: [
      "Broad polki plates interlinked with tumbled emerald and frosted quartz beads.",
      "Paired with matching polki drop earrings for an airy, elegant silhouette.",
    ],
  },
  {
    file: "skj 2 zip file _page-0016.jpg",
    name: "Mayura Blue Meenakari Rani Haar",
    cat: "Rani Haar",
    story: [
      "Two-strand faceted blue bead rani haar with an imperial temple-shaped blue enamelled polki pendant.",
      "An exceptional example of the traditional Bikaneri meenakari craft.",
    ],
  },
  {
    file: "skj 2 zip file _page-0017.jpg",
    name: "Indira Emerald & Pearl Mala",
    cat: "Pendant Sets",
    story: [
      "Three layered rows of luminous pearls and emerald beads carrying a grand pear-cut polki pendant.",
      "Finished with pearl and emerald clusters and matching bell earrings.",
    ],
  },
];

const ORIGINAL_SETS: JewellerySet[] = RAW.map((r) => {
  const img = photo(r.n);
  // Gallery stays within the same category so nothing unrelated appears on a set page.
  const siblings = RAW.filter((o) => o.cat === r.cat && o.n !== r.n).map((o) => photo(o.n));
  return {
    slug: slugify(r.name),
    name: r.name,
    cat: r.cat,
    img,
    story: r.story,
    gallery: [img, ...siblings.slice(0, 2)],
  };
});

const NEW_SETS: JewellerySet[] = NEW_RAW.map((r) => {
  const img = `/jewellery/${encodeURIComponent(r.file)}`;
  const siblings = NEW_RAW.filter((o) => o.cat === r.cat && o.file !== r.file).map(
    (o) => `/jewellery/${encodeURIComponent(o.file)}`
  );
  return {
    slug: slugify(r.name),
    name: r.name,
    cat: r.cat,
    img,
    story: r.story,
    gallery: [img, ...siblings.slice(0, 2)],
  };
});

/** All jewellery sets: original photography first, followed right after by the new photos. */
export const SETS: JewellerySet[] = [...ORIGINAL_SETS, ...NEW_SETS];

export const CATEGORIES: string[] = [
  "Choker Sets",
  "Necklace Sets",
  "Rani Haar",
  "Pendant Sets",
  "Gold Sets",
  "Diamond Sets",
  "Bridal Sets",
];

export const CATEGORY_NOTES: Record<string, string> = {
  "Choker Sets": "Close to the throat",
  "Necklace Sets": "Necklace with earrings",
  "Rani Haar": "Long, ceremonial",
  "Pendant Sets": "Bead malas & pendants",
  "Gold Sets": "Bikaner goldsmithing",
  "Diamond Sets": "Precision light",
  "Bridal Sets": "For the ceremony",
};

export const setsByCategory = (cat: string) => SETS.filter((s) => s.cat === cat);
export const getSet = (slug: string) => SETS.find((s) => s.slug === slug);

/** Category-specific local search phrasing, grounded in what the shop actually does. */
const CATEGORY_LOCAL: Record<string, string> = {
  "Choker Sets": "kundan and polki chokers in Bikaner",
  "Necklace Sets": "necklace sets in Bikaner",
  "Rani Haar": "rani haar in Bikaner",
  "Pendant Sets": "gold pendant sets in Bikaner",
  "Gold Sets": "gold jewellers in Bikaner",
  "Diamond Sets": "diamond jewellers in Bikaner",
  "Bridal Sets": "bridal jewellers in Bikaner",
};

/**
 * Local-search copy for a set page: where it is made, who it is for and how to
 * see it in Bikaner. Written per set so no two pages repeat the same text.
 */
export const localCopy = (set: JewellerySet): string[] => {
  const phrase = CATEGORY_LOCAL[set.cat] ?? "jewellers in Bikaner";
  return [
    `${set.name} is made and kept at our own counter in Sarafa Bazaar, Bikaner — the lane where the city has bought its gold for generations. If you are looking for ${phrase}, this set can be seen in daylight at the showroom before you decide anything.`,
    `Families come to us from across Bikaner district and wider Rajasthan for ${set.cat.toLowerCase()}: Nokha, Deshnok, Lunkaransar, Sri Dungargarh and Jaisalmer. Sizing, restringing and small design changes on ${set.name} are done in our own workshop above the shop, not sent out.`,
    `To see ${set.name} in person, message us on WhatsApp with the set name and we will keep it ready. For bridal viewings a few days' notice lets the karigars lay out the matching pieces together.`,
  ];
};

export const categoryLocalPhrase = (cat: string) =>
  CATEGORY_LOCAL[cat] ?? "jewellers in Bikaner";
