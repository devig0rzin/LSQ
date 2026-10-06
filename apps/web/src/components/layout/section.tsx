import type { ComponentPropsWithoutRef } from "react";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  density?: "compact" | "default" | "spacious";
}

const densityClasses = {
  compact: "py-12 sm:py-16",
  default: "py-16 sm:py-24",
  spacious: "py-20 sm:py-32",
} as const;

export function Section({
  className = "",
  density = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={`${densityClasses[density]} ${className}`}
      {...props}
    />
  );
}
