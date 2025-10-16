import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function Logo({ className = "" }: Props) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="inline-grid place-items-center h-9 w-9 rounded-lg ring-1 ring-border/50 bg-gradient-to-b from-muted/80 to-background/70 text-foreground shadow-[0_4px_24px_-8px_rgba(0,0,0,0.25)]">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-foreground"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5 9.5v10a1 1 0 001 1h12a1 1 0 001-1v-10" />
          <path d="M9.5 20.5v-5h5v5" />
        </svg>
      </span>
      <span className="select-none tracking-tight font-semibold text-xl leading-none">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">ImHaus</span>
        <span className="text-foreground/70">.app</span>
      </span>
    </span>
  );
}


