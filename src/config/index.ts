// SITE CONSTANTS
export const SITE_TITLE = "Wipsie Docs";
export const SITE_DESCRIPTION = "Wipsie Docs";
export const SITE_URL =
  process.env.NODE_ENV === "production"
    ? "https://docs.wipsie.com"
    : "http://localhost:3005";
export const isProd = process.env.NODE_ENV === "production";
