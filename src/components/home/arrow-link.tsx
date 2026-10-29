import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex h-12 items-center gap-2.5 self-start text-base font-semibold text-pine underline-offset-4 hover:underline",
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden
        className="size-5 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
      />
    </a>
  );
}
