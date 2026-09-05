// CDN asset manifest — real client photography (28 pieces) + final poster artwork.
import piece_01 from "@/assets/piece-01.webp.asset.json";
import piece_02 from "@/assets/piece-02.webp.asset.json";
import piece_03 from "@/assets/piece-03.webp.asset.json";
import piece_04 from "@/assets/piece-04.webp.asset.json";
import piece_06 from "@/assets/piece-06.webp.asset.json";
import piece_07 from "@/assets/piece-07.webp.asset.json";
import piece_08 from "@/assets/piece-08.webp.asset.json";
import piece_09 from "@/assets/piece-09.webp.asset.json";
import piece_10 from "@/assets/piece-10.webp.asset.json";
import piece_11 from "@/assets/piece-11.webp.asset.json";
import piece_12 from "@/assets/piece-12.webp.asset.json";
import piece_13 from "@/assets/piece-13.webp.asset.json";
import piece_14 from "@/assets/piece-14.webp.asset.json";
import piece_15 from "@/assets/piece-15.webp.asset.json";
import piece_16 from "@/assets/piece-16.webp.asset.json";
import piece_17 from "@/assets/piece-17.webp.asset.json";
import piece_18 from "@/assets/piece-18.webp.asset.json";
import piece_19 from "@/assets/piece-19.webp.asset.json";
import piece_20 from "@/assets/piece-20.webp.asset.json";
import piece_21 from "@/assets/piece-21.webp.asset.json";
import piece_22 from "@/assets/piece-22.webp.asset.json";
import piece_23 from "@/assets/piece-23.webp.asset.json";
import piece_24 from "@/assets/piece-24.webp.asset.json";
import piece_25 from "@/assets/piece-25.webp.asset.json";
import piece_26 from "@/assets/piece-26.webp.asset.json";
import piece_27 from "@/assets/piece-27.webp.asset.json";
import piece_28 from "@/assets/piece-28.webp.asset.json";
import poster_1 from "@/assets/poster-1.webp.asset.json";
import poster_2 from "@/assets/poster-2.webp.asset.json";
import poster_3 from "@/assets/poster-3.webp.asset.json";
import hero_poster_4 from "@/assets/hero-poster-4.jpeg.asset.json";
import hero_poster_5 from "@/assets/hero-poster-5.jpeg.asset.json";
import logo from "@/assets/logo.webp.asset.json";

type Ptr = { url: string };
const ptr = (a: unknown) => (a as Ptr).url;

export const pieces: string[] = [ptr(piece_01), ptr(piece_02), ptr(piece_03), ptr(piece_04), ptr(piece_06), ptr(piece_07), ptr(piece_08), ptr(piece_09), ptr(piece_10), ptr(piece_11), ptr(piece_12), ptr(piece_13), ptr(piece_14), ptr(piece_15), ptr(piece_16), ptr(piece_17), ptr(piece_18), ptr(piece_19), ptr(piece_20), ptr(piece_21), ptr(piece_22), ptr(piece_23), ptr(piece_24), ptr(piece_25), ptr(piece_26), ptr(piece_27), ptr(piece_28)];
export const posters: string[] = [ptr(hero_poster_4), ptr(hero_poster_5), ptr(poster_1), ptr(poster_2), ptr(poster_3)];
export const logoUrl = ptr(logo);

import shopFacade from "@/assets/shop-facade.jpeg.asset.json";
import shopInterior from "@/assets/shop-interior.jpeg.asset.json";
export const shopFacadeUrl = ptr(shopFacade);
export const shopInteriorUrl = ptr(shopInterior);
