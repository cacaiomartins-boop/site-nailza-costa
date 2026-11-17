import { Globe, Wind, CloudSun, Feather, HeartHandshake, Stethoscope, Utensils, Users } from "lucide-react";
import type { ThemeIcon } from "../data/clinic";

const MAP = {
  globe: Globe,
  wind: Wind,
  cloud: CloudSun,
  feather: Feather,
  heart: HeartHandshake,
  steth: Stethoscope,
  utensils: Utensils,
  users: Users,
} as const;

export function ThemeGlyph({ icon, className = "size-6" }: { icon: ThemeIcon; className?: string }) {
  const I = MAP[icon];
  return <I className={className} strokeWidth={1.4} aria-hidden="true" />;
}
