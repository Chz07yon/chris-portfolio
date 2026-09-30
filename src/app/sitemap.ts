import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chris-portfolio.dev";
  const now = new Date();

  const engineerRoutes = [
    "",
    "/engineer",
    "/engineer/about",
    "/engineer/journey",
    "/engineer/works",
    "/engineer/certification",
  ];

  const studioRoutes = [
    "/studio",
    "/studio/about",
    "/studio/journey",
    "/studio/works",
    "/studio/designs",
  ];

  const routes = [...engineerRoutes, ...studioRoutes];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: (route === "" || route === "/engineer" || route === "/studio" ? "daily" : "weekly") as
      | "daily"
      | "weekly",
    priority: route === "" || route === "/engineer" || route === "/studio" ? 1.0 : 0.8,
  }));
}
