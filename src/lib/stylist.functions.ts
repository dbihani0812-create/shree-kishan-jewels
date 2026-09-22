// Personal stylist: turns a shopper's own words into picks from the real catalogue.
import { createServerFn } from "@tanstack/react-start";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, Output, NoObjectGeneratedError } from "ai";
import { z } from "zod";
import { SETS, getSet } from "@/lib/catalogue";
import { createLovableAiGatewayRunIdFetch } from "@/lib/ai-gateway.server";

const Input = z.object({
  brief: z.string().min(4).max(1200),
});

const Picks = z.object({
  intro: z.string(),
  picks: z
    .array(
      z.object({
        slug: z.string(),
        reason: z.string(),
      }),
    ),
});

export type StylistPick = {
  slug: string;
  name: string;
  cat: string;
  img: string;
  reason: string;
};

export type StylistResult = {
  intro: string;
  picks: StylistPick[];
  error?: string;
};

const CATALOGUE_LINES = SETS.map(
  (s) => `- slug: ${s.slug} | name: ${s.name} | category: ${s.cat} | notes: ${s.story.join(" ")}`,
).join("\n");

const SYSTEM = `You are the personal jewellery stylist for Shree Kishan Jewellers & Sons, a seven-generation family jeweller in Sarafa Bazaar, Bikaner.

Recommend only from this catalogue. Never invent a set, a slug, a price or a gemstone that is not listed.

CATALOGUE:
${CATALOGUE_LINES}

Choose the 3 sets that best answer the shopper's brief (occasion, budget feel, gemstone, neckline, weight, style, how often they will wear it).
Write "intro" as one warm sentence (max 30 words) addressed to the shopper.
For each pick, "slug" must be copied exactly from the catalogue and "reason" is 1-2 sentences saying why this set suits what they described, in the voice of an unhurried family jeweller. No prices. No emojis.`;

export const recommendSets = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }): Promise<StylistResult> => {
    const key = process.env['LOVABLE_API_KEY'];
    if (!key) {
      return { intro: "", picks: [], error: "The stylist is not configured yet. Please try again later." };
    }

    const runIdFetch = createLovableAiGatewayRunIdFetch();
    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: key,
      headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: runIdFetch.fetch,
    });

    try {
      const result = streamText({
        model: lovable.responses("openai/gpt-6-astra"),
        system: SYSTEM,
        prompt: data.brief,
        output: Output.object({ schema: Picks }),
        providerOptions: {
          openai: {
            forceReasoning: true,
            reasoningEffort: "low",
            reasoningSummary: "auto",
            store: false,
            include: ["reasoning.encrypted_content"],
          },
        },
      });

      const output = await result.output;
      const picks: StylistPick[] = [];
      for (const p of output.picks) {
        const set = getSet(p.slug);
        if (!set || picks.some((x) => x.slug === set.slug)) continue;
        picks.push({ slug: set.slug, name: set.name, cat: set.cat, img: set.img, reason: p.reason });
        if (picks.length === 3) break;
      }

      if (picks.length === 0) {
        return {
          intro: "",
          picks: [],
          error: "We could not match that to a set. Try describing the occasion or the stones you like.",
        };
      }

      return { intro: output.intro, picks };
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error)) {
        return {
          intro: "",
          picks: [],
          error: "The stylist could not finish that suggestion. Please rephrase and try once more.",
        };
      }
      const status = (error as { statusCode?: number })?.statusCode;
      if (status === 429) {
        return { intro: "", picks: [], error: "The stylist is busy right now. Please try again in a moment." };
      }
      if (status === 402) {
        return { intro: "", picks: [], error: "The stylist is temporarily unavailable. Please contact us on WhatsApp." };
      }
      console.error(error);
      return { intro: "", picks: [], error: "Something went wrong reaching the stylist. Please try again." };
    }
  });
