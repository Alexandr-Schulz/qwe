"use client";

import * as React from "react";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { Container } from "@/components/ui";

type EventItem = {
  id: string;
  imageUrl: string;
  title: string;
  flag: string;
  stats: string;
  href: string;
  themeColor: string;
};

const DEFAULT_EVENTS: EventItem[] = [
  {
    id: "nachbarschaft-lauf",
    imageUrl: "/event-1.jpg",
    title: "Nachbarschafts‑Lauf",
    flag: "🇩🇪",
    stats: "12 Okt · 5k Teilnehmende",
    href: "/events/nachbarschaft-lauf",
    themeColor: "230 65% 45%",
  },
  {
    id: "kunstmarkt",
    imageUrl: "/event-2.jpg",
    title: "Offener Kunstmarkt",
    flag: "🇩🇪",
    stats: "22 Nov · 250 Aussteller",
    href: "/events/kunstmarkt",
    themeColor: "320 70% 42%",
  },
  {
    id: "musikfest",
    imageUrl: "/event-3.jpg",
    title: "Sommer‑Musikfest",
    flag: "🇩🇪",
    stats: "5 Dez · Live‑Musik",
    href: "/events/musikfest",
    themeColor: "180 60% 40%",
  },
  {
    id: "tech-tag",
    imageUrl: "/event-4.jpg",
    title: "Tech‑Tag",
    flag: "🇩🇪",
    stats: "15 Jan · 120 Sprecher",
    href: "/events/tech-tag",
    themeColor: "260 60% 45%",
  },
];

export default function Events() {
  return (
    <section className="py-24 bg-surface">
      <Container>
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Bevorstehende Veranstaltungen</h2>
            <p className="mt-2 text-muted-foreground max-w-prose">
              Entdecken Sie kuratierte Erlebnisse in Ihrer Umgebung. Tippen Sie auf eine Karte, um Details zu sehen.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DEFAULT_EVENTS.map((item) => (
            <div key={item.id} className="aspect-[3/4]">
              <DestinationCard
                imageUrl={item.imageUrl}
                location={item.title}
                flag={item.flag}
                stats={item.stats}
                href={item.href}
                themeColor={item.themeColor}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}


