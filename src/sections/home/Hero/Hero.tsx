"use client";
import HeroTitle from "./elements/HeroTitle";
import HeroSubtitle from "./elements/HeroSubtitle";
import HeroCta from "./elements/HeroCta";
import HeroGallery from "./elements/HeroGallery";
import CardSwap, { Card } from "@/components/CardSwap";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Iridescence from "@/components/Iridescence";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-[100svh] supports-[height:100dvh]:h-[100dvh] pt-16 flex items-center overflow-hidden"
    >
      {/* Iridescence Background with SSR CSS fallback */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full animate-iridescence-fallback" />
        <Iridescence
          className="absolute inset-0 opacity-100"
          color={[0.8, 0.7, 0.9]}
          mouseReact={true}
          amplitude={0.3}
          speed={1.0}
        />
      </div>
      
      {/* Content */}
      <Container className="relative z-10 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch h-full gap-12 lg:gap-16">
          <div className="mx-auto max-w-2xl lg:max-w-xl text-left translate-y-[30%]">
            <HeroTitle />
            <HeroSubtitle />
            <HeroCta />
          </div>
          <div className="lg:justify-self-end w-full relative h-full overflow-hidden">
            <CardSwap
              cardDistance={28}
              verticalDistance={42}
              delay={5000}
              pauseOnHover={false}
              width={384}
              height={224}
            >
              <Card className="p-0">
                <div className="h-full w-full rounded-xl border border-border/40 bg-card/70 backdrop-blur-md shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] overflow-hidden">
                  <div className="flex items-center gap-4 p-4 sm:p-5">
                    <div className="relative h-10 w-10 shrink-0 rounded-md ring-1 ring-border/50 overflow-hidden bg-muted/50">
                      <Image src="/window.svg" alt="ImHaus – Dashboard" fill className="object-contain p-1" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-foreground">Gemeinschaft im Überblick</h3>
                      <p className="text-xs text-muted-foreground truncate">Anfragen, News und Hilfe – klar strukturiert</p>
                    </div>
                  </div>
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                    <div className="relative h-28 rounded-lg ring-1 ring-inset ring-border/40 overflow-hidden">
                      <Image src="/svc-skills.jpg" alt="Gemeinschaft im Überblick" fill className="object-cover" />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-0">
                <div className="h-full w-full rounded-xl border border-border/40 bg-card/70 backdrop-blur-md shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] overflow-hidden">
                  <div className="flex items-center gap-4 p-4 sm:p-5">
                    <div className="relative h-10 w-10 shrink-0 rounded-md ring-1 ring-border/50 overflow-hidden bg-muted/50">
                      <Image src="/globe.svg" alt="Veranstaltungen" fill className="object-contain p-1" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-foreground">Momente planen</h3>
                      <p className="text-xs text-muted-foreground truncate">Einfach organisieren, gemeinsam erleben</p>
                    </div>
                  </div>
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                    <div className="relative h-28 rounded-lg ring-1 ring-inset ring-border/40 overflow-hidden">
                      <Image src="/event-3.jpg" alt="Momente planen" fill className="object-cover" />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-0">
                <div className="h-full w-full rounded-xl border border-border/40 bg-card/70 backdrop-blur-md shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] overflow-hidden">
                  <div className="flex items-center gap-4 p-4 sm:p-5">
                    <div className="relative h-10 w-10 shrink-0 rounded-md ring-1 ring-border/50 overflow-hidden bg-muted/50">
                      <Image src="/file.svg" alt="Marktplatz – Tausch & Leihe" fill className="object-contain p-1" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-foreground">Teilen leicht gemacht</h3>
                      <p className="text-xs text-muted-foreground truncate">Alltagsdinge tauschen und verleihen – mühelos</p>
                    </div>
                  </div>
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                    <div className="relative h-28 rounded-lg ring-1 ring-inset ring-border/40 overflow-hidden">
                      <Image src="/event-2.jpg" alt="Teilen leicht gemacht" fill className="object-cover" />
                    </div>
                  </div>
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>
      </Container>
    </section>
  );
}


