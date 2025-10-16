"use client";

import Container from "@/components/ui/Container";
import { ZoomParallax } from "@/components/zoom-parallax";

const images = [
  { src: "https://picsum.photos/seed/tech/2000/1200", alt: "Tech" },
  { src: "https://picsum.photos/seed/abstract/2000/1200", alt: "Abstract" },
  { src: "https://picsum.photos/seed/citynight/2000/1200", alt: "City night" },
  { src: "https://picsum.photos/seed/architecture/2000/1200", alt: "Architecture" },
  { src: "https://picsum.photos/seed/space/2000/1200", alt: "Space" },
  { src: "https://picsum.photos/seed/gradient/2000/1200", alt: "Gradient" },
  { src: "https://picsum.photos/seed/aifuture/2000/1200", alt: "AI Future" },
];

export default function Parallax() {
  return (
    <section id="parallax" className="relative">
      <Container className="relative">
        <ZoomParallax images={images} />
      </Container>
    </section>
  );
}


