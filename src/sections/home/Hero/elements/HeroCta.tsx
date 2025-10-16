import { StarBorder } from "@/components/ui/star-border";

export default function HeroCta() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-start gap-3 sm:gap-4">
      <StarBorder size="lg" glow color="hsl(var(--accent-foreground))" contentClassName="h-11 px-12 flex items-center justify-center">
        Jetzt starten
      </StarBorder>
      <StarBorder as="a" href="#features" size="lg" variant="ghost" glow contentClassName="h-11 px-12 flex items-center justify-center">
        Mehr erfahren →
      </StarBorder>
    </div>
  );
}


