import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { logoUrl, shopFacadeUrl } from "@/lib/assets";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Shree Kishan Jewellers & Sons — Bikaner | Polki, Kundan, Diamond & Bridal Jewellery" },
      {
        name: "description",
        content:
          "Shree Kishan Jewellers & Sons — seven generations of handcrafted Polki, Kundan, Diamond, Gold & Bridal jewellery at Sarafa Bazaar, Bikaner, Rajasthan. Visit our showroom or enquire on WhatsApp.",
      },
      {
        name: "keywords",
        content:
          "jewellers in Bikaner, Shree Kishan Jewellers, polki jewellery Bikaner, kundan jewellery Bikaner, diamond jewellery Bikaner, gold jewellery Bikaner, bridal jewellery Bikaner, Sarafa Bazaar Bikaner, jewellery shop Bikaner, Rajasthan jewellers, emerald jewellery, rani haar, choker sets, necklace sets, wedding jewellery Rajasthan",
      },
      { name: "author", content: "Shree Kishan Jewellers & Sons" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "theme-color", content: "#F5F0E8" },
      { name: "format-detection", content: "telephone=yes" },
      // Geo meta — Bikaner, Rajasthan
      { name: "geo.region", content: "IN-RJ" },
      { name: "geo.placename", content: "Bikaner, Rajasthan, India" },
      { name: "geo.position", content: "28.0131133;73.3032493" },
      { name: "ICBM", content: "28.0131133, 73.3032493" },
      // Open Graph
      { property: "og:site_name", content: "Shree Kishan Jewellers & Sons" },
      { property: "og:title", content: "Shree Kishan Jewellers & Sons — Bikaner | Polki, Kundan, Diamond & Bridal Jewellery" },
      {
        property: "og:description",
        content: "Seven generations of fine jewellery craftsmanship in Bikaner, Rajasthan. Handcrafted Polki, Kundan, Diamond, Gold & Bridal jewellery.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://shree-kishan-jewels.lovable.app/" },
      { property: "og:image", content: shopFacadeUrl },
      { property: "og:image:alt", content: "Shree Kishan Jewellers & Sons showroom at Sarafa Bazaar, Bikaner" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_IN" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Shree Kishan Jewellers & Sons — Bikaner" },
      { name: "twitter:description", content: "Seven generations of fine jewellery craftsmanship in Bikaner, Rajasthan." },
      { name: "twitter:image", content: shopFacadeUrl },
      { name: "twitter:image:alt", content: "Shree Kishan Jewellers & Sons showroom at Sarafa Bazaar, Bikaner" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "canonical", href: "https://shree-kishan-jewels.lovable.app/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Shree Kishan Jewellers & Sons",
          alternateName: "SKJ Bikaner",
          url: "https://shree-kishan-jewels.lovable.app",
          logo: logoUrl,
          image: shopFacadeUrl,
          description:
            "Seven generations of handcrafted Polki, Kundan, Diamond, Gold & Bridal jewellery at Sarafa Bazaar, Bikaner, Rajasthan.",
          telephone: ["+91-99288-73555", "+91-97999-58266", "+91-89493-77051"],
          email: "skj.bkn07@gmail.com",
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
          sameAs: [
            "https://instagram.com/shree_kishan_jewellers",
            "https://wa.me/919928873555",
            "https://maps.app.goo.gl/F3qpardNJB1xz6ag6",
          ],
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+91-99288-73555",
              contactType: "sales",
              areaServed: "IN",
              availableLanguage: ["Hindi", "English", "Marwari"],
            },
          ],
          foundingDate: "1900",
          numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 50 },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Shree Kishan Jewellers & Sons",
          url: "https://shree-kishan-jewels.lovable.app",
          description:
            "Official website of Shree Kishan Jewellers & Sons — handcrafted Polki, Kundan, Diamond, Gold & Bridal jewellery from Sarafa Bazaar, Bikaner.",
          publisher: {
            "@type": "Organization",
            name: "Shree Kishan Jewellers & Sons",
          },
          inLanguage: "en-IN",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://shree-kishan-jewels.lovable.app/collections?category={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <a
        href="https://api.whatsapp.com/send?phone=919928873555"
        aria-label="Chat with Shree Kishan Jewellers on WhatsApp"
        className="whatsapp-float group"
      >
        <span className="whatsapp-hint">Chat with us</span>
        <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.91 11.91 0 0 0 12.04 0C5.44 0 .07 5.37 .07 11.97c0 2.11 .55 4.17 1.6 5.99L0 24l6.2-1.63a11.96 11.96 0 0 0 5.84 1.49h.01C18.65 23.86 24 18.49 24 11.9c0-3.18-1.24-6.17-3.48-8.42ZM12.05 21.84a9.93 9.93 0 0 1-5.06-1.39l-.36-.21-3.68.97.98-3.59-.24-.37a9.91 9.91 0 0 1-1.52-5.28c0-5.49 4.46-9.95 9.95-9.95a9.88 9.88 0 0 1 7.04 2.92 9.88 9.88 0 0 1 2.91 7.04c0 5.49-4.46 9.86-10.02 9.86Zm5.46-7.45c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.3 1.27.48 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.69.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" />
        </svg>
      </a>
    </QueryClientProvider>
  );
}
