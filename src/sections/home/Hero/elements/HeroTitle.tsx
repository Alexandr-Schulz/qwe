import SplitText from "@/components/SplitText";

export default function HeroTitle() {
  return (
    <SplitText
      text="ImHaus.app – Nachbarn werden Familie"
      tag="h1"
      className="text-left text-balance text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.02] tracking-[-0.01em] md:tracking-[-0.02em] text-foreground"
      delay={100}
      duration={0.6}
      ease="power3.out"
      splitType="chars"
      from={{ opacity: 0, y: 40 }}
      to={{ opacity: 1, y: 0 }}
      threshold={0.1}
      rootMargin="-100px"
      textAlign="left"
    />
  );
}


