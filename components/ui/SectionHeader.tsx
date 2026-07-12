import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  badge: string;
  title: string;
  description?: string;
  light?: boolean;
  className?: string;
  align?: "center" | "start";
};

export function SectionHeader({
  badge,
  title,
  description,
  light = false,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      data-animate
      className={cn(
        "mb-8 sm:mb-12",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      <div
        className={cn(
          "section-badge mb-4",
          light && "section-badge-light",
          align === "center" && "mx-auto",
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
        {badge}
      </div>
      <h2
        className={cn(
          "mb-3 text-[clamp(1.5rem,1rem+2vw,2.5rem)] font-bold leading-tight",
          light ? "text-white" : "text-gray-900",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-[clamp(0.95rem,0.85rem+0.4vw,1.125rem)] leading-relaxed",
            light ? "text-white/85" : "text-gray-600",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
