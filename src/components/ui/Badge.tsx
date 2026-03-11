import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "accent" | "light";
  className?: string;
}

const variants = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  light: "bg-white/20 text-white",
};

export default function Badge({
  children,
  variant = "accent",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
