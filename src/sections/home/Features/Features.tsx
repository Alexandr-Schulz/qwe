"use client";

import { Features as RotatingFeatures } from "@/components/features";
import { BentoCard, BentoGrid, BentoGridRow } from "@/components/ui/BentoGrid";
import Container from "@/components/ui/Container";
import { Users, ShieldCheck, Leaf, Sparkles, Workflow, HeartHandshake } from "lucide-react";
// Static imports ensure files exist and are bundled; place files in /public
// Paths are relative from this file to project root public folder
import mission1 from "../../../../public/mission-1.jpg";
import mission2 from "../../../../public/mission-2.jpg";
import mission3 from "../../../../public/mission-3.jpg";

const features = [
  {
    id: 1,
    icon: Users,
    title: "Nachbarn verbinden",
    description:
      "Menschen im gleichen Haus oder Wohnblock verbinden, Barrieren abbauen und ein inklusives Miteinander fördern.",
    image: mission1.src,
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: "Gemeinschaft als sicherer Raum",
    description:
      "Jede Hausgemeinschaft wird zu einem sicheren Raum, in dem Diversität gefeiert, Hilfe solidarisch geleistet und Ressourcen verantwortungsvoll geteilt werden.",
    image: mission2.src,
  },
  {
    id: 3,
    icon: Leaf,
    title: "Nachhaltig teilen im Alltag",
    description:
      "Werkzeuge, Zeit und Wissen einfach teilen – fair organisiert, transparent nachverfolgt und ressourcenschonend für die ganze Nachbarschaft.",
    image: mission3.src,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-20 border-t bg-surface">
      <Container>
        <RotatingFeatures
          primaryColor="sky-500"
          progressGradientLight="bg-gradient-to-r from-sky-400 to-sky-500"
          progressGradientDark="bg-gradient-to-r from-sky-300 to-sky-400"
          features={features}
        />
      </Container>

      {/* Bento grid integrated into the same section */}
      <Container className="mt-10 md:mt-12">
        <BentoGrid>
          {/* Row 1 (has the large default card) */}
          <BentoGridRow>
            <BentoCard
              id="inklusion"
              name="Inklusivität"
              className="md:col-span-2 xl:col-span-2"
              size="large"
              background={<div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/10" />}
              Icon={Users}
              description="Jede Stimme zählt – unabhängig von Alter, Sprache oder Mobilität."
              href="#features"
              cta="Mehr erfahren"
            />
            <BentoCard
              id="solidaritaet"
              name="Solidarität"
            className="md:col-span-1"
              size="small"
              background={<div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/10" />}
              Icon={HeartHandshake}
              description="Gegenseitige Unterstützung als Gemeinschaftsprinzip."
              href="#features"
              cta="Mitmachen"
            />
            <BentoCard
              id="nachhaltigkeit"
              name="Nachhaltigkeit"
            className="md:col-span-1"
              size="small"
              background={<div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/10" />}
              Icon={Leaf}
              description="Teilen vor Besitzen, Wege kurz halten, Abfall vermeiden."
              href="#features"
              cta="Wie es funktioniert"
            />
          </BentoGridRow>
          {/* Row 2 (no cross-row jumping) */}
          <BentoGridRow>
            <BentoCard
              id="verbindlichkeit"
              name="Verbindlichkeit"
              className="md:col-span-1"
              size="small"
              background={<div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-stone-50 dark:from-slate-900/30 dark:to-stone-900/10" />}
              Icon={ShieldCheck}
              description="Klare Regeln und verlässliche Prozesse schaffen Vertrauen."
              href="#features"
              cta="Regeln"
            />
            <BentoCard
              id="ux"
              name="Einfach & freundlich"
            className="md:col-span-1"
              size="small"
              background={<div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/10" />}
              Icon={Sparkles}
              description="Übersichtliche UX für jede Altersgruppe."
              href="#features"
              cta="Design"
            />
            <BentoCard
              id="flow"
              name="Gemeinsam handeln"
              className="md:col-span-2 xl:col-span-2"
              size="large"
              background={<div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/10" />}
              Icon={Workflow}
              description="Koordination von Hilfe, Tausch und Veranstaltungen im Haus."
              href="#features"
              cta="Mehr"
            />
          </BentoGridRow>
        </BentoGrid>
      </Container>
    </section>
  );
}



