import { BRAND_ICONS } from "@/lib/brand-icons";

export function BrandIcon({ slug, size = 26 }: { slug: string; size?: number }) {
  const icon = BRAND_ICONS[slug];
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} role="img" aria-label={icon.title} fill="currentColor">
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}
