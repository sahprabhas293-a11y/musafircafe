import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/auth/", "/api/audit-logs"],
      },
    ],
    sitemap: "https://musafircafe.com/sitemap.xml",
  };
}
