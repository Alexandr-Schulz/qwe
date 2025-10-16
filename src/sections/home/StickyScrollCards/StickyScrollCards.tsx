'use client'

import React, { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import { StarBorder } from "@/components/ui/star-border";
import { LayoutDashboard, Siren, ClipboardList, CalendarDays, Sparkles, ShoppingBasket } from "lucide-react";

type FeatureItem = {
  title: string;
  description: string;
  imageUrl: string;
  bgColor: string;
  textColor: string;
  ctaLabel: string;
  ctaHref: string;
  ctaIcon: React.ElementType;
};

const features: FeatureItem[] = [
  {
    title: "ImHaus – Dashboard",
    description:
      "Zentrale Übersicht: persönliche Anfragen, Community‑News, Nachhaltigkeitsstatistik.",
    imageUrl: "/svc-dashboard.jpg",
    bgColor: "bg-yellow-200 dark:bg-yellow-800",
    textColor: "text-gray-700 dark:text-gray-200",
    ctaLabel: "Jetzt starten",
    ctaHref: "#dashboard",
    ctaIcon: LayoutDashboard,
  },
  {
    title: "SOS – Notruf",
    description:
      "Schnelle Hilfe im Alltag: verifizierte Nachbarn und Schlüsselpersonen reagieren sofort.",
    imageUrl: "/svc-sos.jpg",
    bgColor: "bg-amber-200 dark:bg-amber-800",
    textColor: "text-gray-700 dark:text-gray-200",
    ctaLabel: "Jetzt starten",
    ctaHref: "#sos",
    ctaIcon: Siren,
  },
  {
    title: "Orga‑Team – Moderation",
    description:
      "Hausregeln, digitale Aushänge und Umfragen barrierefrei erstellen und verwalten.",
    imageUrl: "/svc-moderation.jpg",
    bgColor: "bg-orange-200 dark:bg-orange-800",
    textColor: "text-gray-700 dark:text-gray-200",
    ctaLabel: "Jetzt starten",
    ctaHref: "#moderation",
    ctaIcon: ClipboardList,
  },
  {
    title: "Veranstaltungen – Event‑Planer",
    description:
      "Gemeinsame Aktivitäten planen: Chat, Kalender, Erinnerungen – für alle zugänglich.",
    imageUrl: "/svc-events.jpg",
    bgColor: "bg-yellow-300 dark:bg-yellow-900",
    textColor: "text-gray-800 dark:text-gray-100",
    ctaLabel: "Jetzt starten",
    ctaHref: "#events",
    ctaIcon: CalendarDays,
  },
  {
    title: "Freizeit – Skill‑Sharing",
    description:
      "Sprach‑ und Generationen‑Tandems, Hobby‑Gruppen oder Sportangebote inklusiv organisieren.",
    imageUrl: "/svc-skills.jpg",
    bgColor: "bg-amber-100 dark:bg-amber-900/60",
    textColor: "text-gray-800 dark:text-gray-100",
    ctaLabel: "Jetzt starten",
    ctaHref: "#skills",
    ctaIcon: Sparkles,
  },
  {
    title: "Marktplatz – Tausch & Leihe",
    description:
      "Alltagsgegenstände teilen: Werkzeug, Kleidung, Lebensmittel – fair, sicher und umweltbewusst.",
    imageUrl: "/svc-market.jpg",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/60",
    textColor: "text-gray-800 dark:text-gray-100",
    ctaLabel: "Jetzt starten",
    ctaHref: "#market",
    ctaIcon: ShoppingBasket,
  },
];

const useScrollAnimation = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
};

const AnimatedHeader: React.FC = () => {
  const [headerRef, headerInView] = useScrollAnimation();
  const [pRef, pInView] = useScrollAnimation();

  return (
    <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
      <h2
        ref={headerRef as React.RefObject<HTMLHeadingElement>}
        className={`text-3xl md:text-5xl font-bold transition-all duration-700 ease-out text-gray-900 dark:text-white ${
          headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        Sechs Services für Ihr Haus
      </h2>
      <p
        ref={pRef as React.RefObject<HTMLParagraphElement>}
        className={`text-base md:text-lg text-gray-600 dark:text-gray-300 mt-3 md:mt-4 transition-all duration-700 ease-out delay-200 ${
          pInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        Alles was Sie brauchen, um Ihre Hausgemeinschaft zu stärken
      </p>
    </div>
  );
};

export default function StickyScrollCards() {
  return (
    <div className="bg-surface font-sans">
      <Container>
        <section className="py-16 md:py-24 flex flex-col items-center">
          <AnimatedHeader />

          <div className="w-full">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${feature.bgColor} grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-8 p-6 md:p-12 rounded-3xl mb-8 md:mb-16 md:sticky md:top-48`}
              >
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className={`${feature.textColor} text-sm md:text-base`}>{feature.description}</p>
                  <div className="mt-4">
                    <StarBorder as="a" href={feature.ctaHref} size="md" variant="solid" glow contentClassName="h-10 px-5 flex items-center gap-2">
                      {feature.ctaIcon ? (
                        <feature.ctaIcon className="h-4 w-4" />
                      ) : null}
                      {feature.ctaLabel}
                    </StarBorder>
                  </div>
                </div>

                <div className="mt-6 md:mt-0">
                  <div className="w-full h-48 sm:h-64 md:h-[320px] lg:h-[380px] rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={feature.imageUrl}
                      alt={feature.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src =
                          "https://placehold.co/800x600/cccccc/ffffff?text=Image+Not+Found";
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}


