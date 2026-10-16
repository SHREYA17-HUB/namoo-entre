import printing from "@/assets/printing.jpg";
import packaging from "@/assets/packaging.jpg";
import gifting from "@/assets/gifting.jpg";
import signage from "@/assets/signage.png.asset.json";
import original from "./original-content.json";
export const categories = [
  {
    name: "Printing Services",
    short: "Printing",
    slug: "printing-services",
    image: printing,
    tone: "cyan",
    description: "Beautifully printed. Perfectly remembered.",
    detail:
      "Premium digital and offset printing for business cards, brochures and marketing materials.",
  },
  {
    name: "Packaging Solutions",
    short: "Packaging",
    slug: "packaging-solutions",
    image: packaging,
    tone: "magenta",
    description: "An unforgettable first impression.",
    detail: "Custom branded packaging that combines thoughtful design with lasting durability.",
  },
  {
    name: "Signage Solutions",
    short: "Signage",
    slug: "signage-solutions",
    image: signage.url,
    tone: "yellow",
    description: "Make your presence impossible to miss.",
    detail: "LED sign boards, acrylic signage and high-impact branding displays.",
  },
  {
    name: "Corporate Gifting",
    short: "Gifting",
    slug: "corporate-gifting",
    image: gifting,
    tone: "green",
    description: "Thoughtful gifts. Lasting connections.",
    detail: "Personalised corporate gifts and promotional merchandise for every occasion.",
  },
] as const;
export const navigation: { name: string; page: string; label?: string }[] = [
  { name: "Home", page: "" },
  { name: "About Us", page: "about" },
  { name: "Services", page: "services" },
  { name: "Products", page: "products", label: "Shop" },
  { name: "Industries We Serve", page: "industries" },
  { name: "Blogs", page: "blogs" },
  { name: "Contact Us", page: "contact" },
];
let current = 0;
export const products = original.products.flatMap((block) => {
  if (block.tag === "h3") {
    current = /packag/i.test(block.text)
      ? 1
      : /sign/i.test(block.text)
        ? 2
        : /gift/i.test(block.text)
          ? 3
          : 0;
    return [];
  }
  const category = categories[current];
  return block.tag === "h4" && category ? [{ name: block.text, category }] : [];
});
export const testimonials = [
  {
    name: "Harri Kumar",
    role: "Jobhunterr CEO",
    text: "We approached Namo Enterprises for our printing needs and the results were outstanding. The quality and on-time delivery really impressed us. Highly recommended!",
  },
  {
    name: "Raju Kumar",
    role: "Business Owner",
    text: "From designing to final execution, Namo Enterprises handled everything smoothly. Their signage and printing work gave our brand a completely new look. Great team to work with!",
  },
  {
    name: "Ajith",
    role: "Corporate Client",
    text: "We ordered corporate gifts in bulk, and the entire process was seamless. The quality, packaging, and attention to detail were exceptional. Will definitely work with them again.",
  },
  {
    name: "Shasank Nayak",
    role: "Startup Founder",
    text: "Namo Enterprises helped us with custom packaging, and they delivered exactly what we needed. Creative ideas, affordable pricing, and great support throughout.",
  },
  {
    name: "Naveen Manta",
    role: "Project Manager",
    text: "Their team understands business requirements very well. From brochures to sign boards, everything was done perfectly. A one-stop solution for all branding needs.",
  },
];
export function pageMeta(title: string, description: string) {
  return {
    meta: [
      { title: `${title} | NAMO Enterprises` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | NAMO Enterprises` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
