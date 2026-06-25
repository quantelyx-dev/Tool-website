import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BlogToolCtaProps = {
  toolLink: string;
  toolName: string;
  className?: string;
};

export function BlogToolCta({ toolLink, toolName, className }: BlogToolCtaProps) {
  return (
    <aside
      className={cn(
        "my-8 rounded-xl border border-indigo-200 bg-indigo-50/80 p-6 dark:border-indigo-900 dark:bg-indigo-950/40",
        className,
      )}
      aria-label={`Try the ${toolName}`}
    >
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
        Free online tool
      </p>
      <p className="mb-4 text-base font-medium">
        Ready to try it? Use our {toolName} — free, instant, no sign-up
        required.
      </p>
      <Button asChild className="bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white">
        <Link href={toolLink}>
          Open {toolName}
          <ArrowRight className="ml-1 size-4" aria-hidden="true" />
        </Link>
      </Button>
    </aside>
  );
}
