"use client";

import React, { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { StarBorder } from "@/components/ui/star-border";

interface AccordionItemData {
  id: number;
  title: string;
  imageUrl: string;
}

const accordionItems: AccordionItemData[] = [
  {
    id: 1,
    title: "Sprachassistenz – barrierefrei",
    imageUrl: "/incl-voice.jpg",
  },
  {
    id: 2,
    title: "Bildgenerierung – verständlich",
    imageUrl: "/incl-image.jpg",
  },
  {
    id: 3,
    title: "Chatbot – lokal & inklusiv",
    imageUrl: "/incl-chatbot.jpg",
  },
  {
    id: 4,
    title: "Assistent – einfache Bedienung",
    imageUrl: "/incl-agent.jpg",
  },
  {
    id: 5,
    title: "Visuelles Verstehen – zugänglich",
    imageUrl: "/incl-vision.jpg",
  },
];

interface AccordionItemProps {
  item: AccordionItemData;
  isActive: boolean;
  onMouseEnter: () => void;
}

const AccordionItem = ({ item, isActive, onMouseEnter }: AccordionItemProps) => {
  const [src, setSrc] = useState<string>(item.imageUrl);
  return (
    <div
      className={`
        relative h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? "w-[400px]" : "w-[60px]"}
      `}
      onMouseEnter={onMouseEnter}
    >
      <Image
        src={src}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        className="absolute inset-0 object-cover z-0"
        unoptimized
        onError={() => setSrc("/event-1.jpg")}
        priority={isActive}
      />
      <div className="absolute inset-0 bg-black/35 z-10" />
      <span
        className={`
          absolute text-white text-lg font-semibold
          transition-all duration-300 ease-in-out
          ${
            isActive
              ? "bottom-6 left-1/2 -translate-x-1/2"
              : "top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center"
          }
        `}
        style={{ writingMode: isActive ? ("horizontal-tb" as any) : ("vertical-rl" as any), textOrientation: "mixed" as any, zIndex: 20 as any }}
      >
        {item.title}
      </span>
    </div>
  );
};

export default function InteractiveImageAccordion() {
  const [activeIndex, setActiveIndex] = useState<number>(4);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section id="interactive-accordion" className="bg-surface font-sans">
      <Container className="py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight tracking-tighter">
              Inklusion konkret
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
              Barrierefreiheit und Zugänglichkeit in jeder Funktion – verständlich, zugänglich und nutzbar für alle.
            </p>
            <div className="mt-8">
              <StarBorder as="a" href="#kontakt" size="md" glow contentClassName="h-11 px-6 flex items-center justify-center">
                Jetzt informieren
              </StarBorder>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto p-4">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


