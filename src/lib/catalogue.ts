// Catalogue data — every set named, categorised and slugged. Real photography only.
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

const RAW: { name: string; cat: string; story: string[] }[] = [
  { name: "Ambika Polki Choker", cat: "Polki", story: ["Uncut polki laid close to the throat, each stone kept in its natural shape so the light stays soft rather than sharp.", "Set in 22k gold with a hand-strung pearl fall — a piece meant for the first evening of a wedding week."] },
  { name: "Rajwada Emerald Set", cat: "Emerald", story: ["Colombian emeralds chosen in daylight at Sarafa Bazaar, matched over several months for depth of green.", "The gold is kept deliberately plain so the stones carry the whole composition."] },
  { name: "Mohar Kundan Necklace", cat: "Kundan", story: ["Kundan setting in its oldest form: gold foil burnished around each stone by hand, without solder.", "Reversible meenakari on the back, painted in the Bikaner palette of red and white."] },
  { name: "Bikaner Gold Haar", cat: "Gold", story: ["A long haar built from repeated goldsmith motifs drawn from the jharokhas of the old city.", "Weight is distributed along the length so it sits flat and comfortable through a full ceremony."] },
  { name: "Padmini Bridal Set", cat: "Bridal", story: ["A complete bridal suite — choker, rani haar, earrings and maang tikka — designed as one architecture.", "Made to be worn together, and then broken apart across a lifetime of smaller occasions."] },
  { name: "Chandni Diamond Set", cat: "Diamond", story: ["Brilliant-cut diamonds graded for white, set in a rhodium finish that keeps the metal invisible.", "Precision work: every claw filed until the stone sits level with its neighbour."] },
  { name: "Meenakari Rani Haar", cat: "Meenakari", story: ["Enamel fired in stages, colour by colour, each firing risking the one before it.", "The reverse is as finished as the front — the mark of a piece made for the wearer, not the onlooker."] },
  { name: "Vasundhara Polki Set", cat: "Polki", story: ["Broad polki plates framed by a fine gold rope, a Rajasthani silhouette kept intentionally unfussy.", "Emerald drops can be exchanged for pearls for daytime wear."] },
  { name: "Sarafa Heritage Set", cat: "Heirloom", story: ["Reconstructed from a family piece brought to our counter, with the original stones re-seated.", "Heirloom work is our quietest craft: repair, re-set, return."] },
  { name: "Gulmohar Ruby Set", cat: "Ruby", story: ["Burmese rubies in a graduated line, warm against high-karat gold.", "Named for the gulmohar trees that flower red across Bikaner in summer."] },
  { name: "Neelam Emerald Choker", cat: "Emerald", story: ["A close-fitting choker of carved emerald beads, strung on silk and re-strung on request.", "Carving done by hand so no two beads repeat."] },
  { name: "Kesariya Temple Set", cat: "Temple", story: ["Temple jewellery in the South Indian tradition, cast in relief and finished with a matte antique polish.", "Heavier than it looks, and built to be worn for decades."] },
  { name: "Anmol Polki Rani Haar", cat: "Polki", story: ["A long rani haar of uncut diamonds, stepped in five tiers.", "The centre pendant is removable and can be worn alone on a plain gold chain."] },
  { name: "Shubh Vivah Bridal Set", cat: "Bridal", story: ["Made for the pheras: polki, emerald and pearl in a single, deliberately grand statement.", "Fitted to the bride over three sittings before the wedding."] },
  { name: "Jharokha Kundan Set", cat: "Kundan", story: ["Latticework drawn from the carved window screens of Rajasthani havelis.", "Each opening in the lattice is cut and filed by hand, not stamped."] },
  { name: "Mirage Diamond Haar", cat: "Diamond", story: ["Diamonds set in a fluid line that reads as one continuous surface of light.", "A modern piece, made for a client who wanted no visible metal."] },
  { name: "Panna Emerald Necklace", cat: "Emerald", story: ["Panna — emerald — in cabochon, paired with small polki accents.", "The clasp is hidden inside the design so the line is unbroken."] },
  { name: "Rasleela Kundan Set", cat: "Kundan", story: ["Figurative kundan panels telling a scene from the raas, painted and set together.", "Commissioned work; each panel takes a week."] },
  { name: "Marwar Gold Set", cat: "Gold", story: ["Pure goldsmithing from the Marwar tradition — no stones, only surface and shadow.", "Hand-hammered texture that cannot be reproduced by machine."] },
  { name: "Chhavi Polki Necklace", cat: "Polki", story: ["A lighter polki necklace for reception and festival wear.", "Designed to sit above the collarbone so it reads clearly in photographs."] },
  { name: "Suvarna Gold Haar", cat: "Gold", story: ["A ceremonial haar in high-karat gold, weighted for temple and wedding rituals.", "Finished with a soft satin polish rather than a mirror shine."] },
  { name: "Devangi Bridal Choker", cat: "Bridal", story: ["Choker-first bridal design for brides who prefer a shorter neckline.", "Pearls hand-knotted between each drop."] },
  { name: "Kanchan Kundan Haar", cat: "Kundan", story: ["Kundan in a broad bib form, framed by a double row of gold beads.", "Sits heavy at the centre and light at the shoulders."] },
  { name: "Roshni Diamond Set", cat: "Diamond", story: ["Everyday diamonds — small, well cut, set close.", "Made for clients who wear their jewellery daily rather than seasonally."] },
  { name: "Amrapali Polki Set", cat: "Polki", story: ["Polki with a carved emerald centre, in a court silhouette from the early 1900s.", "Drawn from a pattern book kept in the family since the fourth generation."] },
  { name: "Trishala Emerald Haar", cat: "Emerald", story: ["Three-tier emerald haar, graduated bead by bead.", "Re-strung free of charge for the life of the piece."] },
  { name: "Virasat Heirloom Set", cat: "Heirloom", story: ["Virasat — inheritance. Built to be handed down and altered by whoever receives it.", "Every stone is documented so future work can match the original."] },
];

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const SETS: JewellerySet[] = RAW.map((r, i) => {
  const img = pieces[i % pieces.length]!;
  const gallery = [img, pieces[(i + 7) % pieces.length]!, pieces[(i + 13) % pieces.length]!];
  return { slug: slugify(r.name), name: r.name, cat: r.cat, img, story: r.story, gallery };
});

export const CATEGORIES: string[] = Array.from(new Set(SETS.map((s) => s.cat)));

export const CATEGORY_NOTES: Record<string, string> = {
  Polki: "Uncut brilliance",
  Emerald: "Depth of green",
  Kundan: "Setting as craft",
  Gold: "Bikaner goldsmithing",
  Bridal: "For the ceremony",
  Diamond: "Precision light",
  Meenakari: "Fired enamel",
  Heirloom: "Repair, re-set, return",
  Ruby: "Warm against gold",
  Temple: "Cast in relief",
};

export const setsByCategory = (cat: string) => SETS.filter((s) => s.cat === cat);
export const getSet = (slug: string) => SETS.find((s) => s.slug === slug);

/** Category-specific local search phrasing, grounded in what the shop actually does. */
const CATEGORY_LOCAL: Record<string, string> = {
  Polki: "polki jewellers in Bikaner",
  Emerald: "emerald jewellery in Bikaner",
  Kundan: "kundan jewellers in Bikaner",
  Gold: "gold jewellers in Bikaner",
  Bridal: "bridal jewellers in Bikaner",
  Diamond: "diamond jewellers in Bikaner",
  Meenakari: "meenakari jewellery in Bikaner",
  Heirloom: "heirloom jewellery restoration in Bikaner",
  Ruby: "ruby jewellery in Bikaner",
  Temple: "temple jewellery in Bikaner",
};

/**
 * Local-search copy for a set page: where it is made, who it is for and how to
 * see it in Bikaner. Written per set so no two pages repeat the same text.
 */
export const localCopy = (set: JewellerySet): string[] => {
  const phrase = CATEGORY_LOCAL[set.cat] ?? "jewellers in Bikaner";
  return [
    `${set.name} is made and kept at our own counter in Sarafa Bazaar, Bikaner — the lane where the city has bought its gold for generations. If you are looking for ${phrase}, this set can be seen in daylight at the showroom before you decide anything.`,
    `Families come to us from across Bikaner district and wider Rajasthan for ${set.cat.toLowerCase()} work: Nokha, Deshnok, Lunkaransar, Sri Dungargarh and Jaisalmer. Sizing, restringing and small design changes on ${set.name} are done in our own workshop above the shop, not sent out.`,
    `To see ${set.name} in person, message us on WhatsApp with the set name and we will keep it ready. For bridal viewings a few days' notice lets the karigars lay out the matching pieces together.`,
  ];
};

export const categoryLocalPhrase = (cat: string) =>
  CATEGORY_LOCAL[cat] ?? "jewellers in Bikaner";
