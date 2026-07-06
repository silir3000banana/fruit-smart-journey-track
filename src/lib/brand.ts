/**
 * SILIR3000 canonical brand constants.
 * Never hardcode product names in components — import from here.
 *
 * Hierarchy:
 *   Platform  → SILIR3000 (AI-Native Agriculture & Industrial IoT Platform)
 *   Solution  → Fruit Smart Journey Track (first business solution on SILIR3000)
 *   Consumer  → Know Your Fruit (consumer-facing transparency experience)
 */

export const BRAND = {
  platform: {
    name: "SILIR3000",
    tagline: "AI-Native Agriculture & Industrial IoT Platform",
    shortTagline: "AI-Native Agri & Industrial IoT",
    initials: "S3",
  },
  solution: {
    name: "Fruit Smart Journey Track",
    tagline: "AI + IoT powered fruit supply chain intelligence — barcode traceability and AI camera quality inspection.",
    shortTagline: "AI + IoT Fruit Supply Chain Intelligence",
    initials: "FS",
  },
  consumer: {
    name: "Know Your Fruit",
    tagline: "Verified farm-to-shelf transparency for every fruit you buy.",
  },
  company: {
    name: "iYarKai Tech Lab",
    short: "ITL",
    email: "info@iyarkai.com",
    phone: "+91 98765 43210",
    location: "Chennai, Tamil Nadu, India",
  },
  copyrightYear: 2026,
} as const;

export const brandCopyright = () =>
  `© ${BRAND.copyrightYear} ${BRAND.platform.name} by ${BRAND.company.name} (${BRAND.company.short}). All rights reserved.`;
