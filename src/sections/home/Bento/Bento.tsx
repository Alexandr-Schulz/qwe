"use client";

import { BentoCard, BentoGrid } from "@/components/ui/BentoGrid";
import Container from "@/components/ui/Container";
import { Brain, Rocket, Code2, ShieldCheck, Sparkles, Workflow } from "lucide-react";

export default function Bento() {
  return (
    <section id="bento" className="py-24 border-t">
      <Container>
        <BentoGrid className="md:auto-rows-[20rem]">
          {/* Row 1 */}
          <BentoCard
            name="AI Mentors"
            className="md:col-span-2 xl:col-span-2"
            background={<div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/10" />}
            Icon={Brain}
            description="Personalized guidance for coding and academics with domain experts."
            href="#"
            cta="Learn more"
          />
          <BentoCard
            name="Ship Faster"
            className="md:col-span-1 xl:col-span-1"
            background={<div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/10" />}
            Icon={Rocket}
            description="Boost your productivity with modern tooling and workflows."
            href="#"
            cta="Get started"
          />
          {/* Row 2 */}
          <BentoCard
            name="Type-safe by Default"
            className="md:col-span-1 xl:col-span-1"
            background={<div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/10" />}
            Icon={Code2}
            description="Build confidently with TypeScript and strict mode enabled."
            href="#"
            cta="Explore"
          />
          <BentoCard
            name="Enterprise Security"
            className="md:col-span-1 xl:col-span-2"
            background={<div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-stone-50 dark:from-slate-900/30 dark:to-stone-900/10" />}
            Icon={ShieldCheck}
            description="Secure by design with best-in-class practices and controls."
            href="#"
            cta="Security"
          />
          <BentoCard
            name="Polished UX"
            className="md:col-span-2 xl:col-span-1"
            background={<div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/10" />}
            Icon={Sparkles}
            description="Delightful interactions and motion out of the box."
            href="#"
            cta="UX"
          />
          {/* Row 3 */}
          <BentoCard
            name="Workflow Automation"
            className="md:col-span-2 xl:col-span-2"
            background={<div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/10" />}
            Icon={Workflow}
            description="Connect the dots across tools and teams with powerful pipelines."
            href="#"
            cta="Automate"
          />
        </BentoGrid>
      </Container>
    </section>
  );
}


