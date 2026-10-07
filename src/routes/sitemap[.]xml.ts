import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { CATEGORIES, SETS } from "@/lib/catalogue";
import { shopFacadeUrl, shopInteriorUrl } from "@/lib/assets";

const BASE_URL = "https://shree-kishan-jewels.lovable.app";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

interface SitemapImage {
  loc: string;
  title: string;
  caption?: string;
}

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  lastmod?: string;
  images?: SitemapImage[];
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().split("T")[0]!;

        const entries: SitemapEntry[] = [
          {
            path: "/",
            changefreq: "weekly",
            priority: "1.0",
            lastmod: today,
            images: [
              {
                loc: shopFacadeUrl,
                title: "Shree Kishan Jewellers & Sons Showroom — Sarafa Bazaar, Bikaner",
                caption: "Seven generations of handcrafted Polki, Kundan & Bridal jewellery in Bikaner, Rajasthan",
              },
            ],
          },
          {
            path: "/collections",
            changefreq: "weekly",
            priority: "0.9",
            lastmod: today,
          },
          {
            path: "/jewellers-in-bikaner",
            changefreq: "monthly",
            priority: "0.9",
            lastmod: today,
            images: [
              {
                loc: shopFacadeUrl,
                title: "Shree Kishan Jewellers & Sons Facade — Sarafa Bazaar Bikaner",
                caption: "Heritage jewellery showroom in Sarafa Bazaar, Bikaner",
              },
              {
                loc: shopInteriorUrl,
                title: "Showroom Interior — Shree Kishan Jewellers Bikaner",
                caption: "Marble counters and traditional jewellery workshop in Bikaner",
              },
            ],
          },
          {
            path: "/stylist",
            changefreq: "monthly",
            priority: "0.8",
            lastmod: today,
          },
          ...CATEGORIES.map((c) => ({
            path: `/collections?category=${encodeURIComponent(c)}`,
            changefreq: "monthly" as const,
            priority: "0.8",
            lastmod: today,
          })),
          ...SETS.map((s) => ({
            path: `/collections/${encodeURIComponent(s.slug)}`,
            changefreq: "monthly" as const,
            priority: "0.7",
            lastmod: today,
            images: s.img
              ? [
                  {
                    loc: s.img,
                    title: `${s.name} — ${s.cat} | Shree Kishan Jewellers & Sons`,
                    caption: `${s.name} handcrafted ${s.cat.toLowerCase()} jewellery set from Sarafa Bazaar, Bikaner`,
                  },
                ]
              : undefined,
          })),
        ];

        const urls = entries.map((e) => {
          const lines = [
            `  <url>`,
            `    <loc>${escapeXml(`${BASE_URL}${e.path}`)}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
          ];

          if (e.images && e.images.length > 0) {
            for (const img of e.images) {
              const fullLoc = img.loc.startsWith("http") ? img.loc : `${BASE_URL}${img.loc}`;
              lines.push(`    <image:image>`);
              lines.push(`      <image:loc>${escapeXml(fullLoc)}</image:loc>`);
              lines.push(`      <image:title>${escapeXml(img.title)}</image:title>`);
              if (img.caption) {
                lines.push(`      <image:caption>${escapeXml(img.caption)}</image:caption>`);
              }
              lines.push(`    </image:image>`);
            }
          }

          lines.push(`  </url>`);
          return lines.filter(Boolean).join("\n");
        });

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      },
    },
  },
});
