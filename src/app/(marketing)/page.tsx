import { Hero } from "@/sections/home/Hero";
import Features from "@/sections/home/Features/Features";
import { Parallax } from "@/sections/home/Parallax";
import ArcGallery from "@/sections/home/ArcGallery";
import StickyScrollCards from "@/sections/home/StickyScrollCards";
import Events from "@/sections/home/Events";
import InteractiveImageAccordion from "@/sections/home/InteractiveImageAccordion";
import CircularFlipCardGallery from "@/sections/home/CircularFlipCardGallery";

export const metadata = { title: "Home" };

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <ArcGallery />
      <StickyScrollCards />
      <Events />
      {process.env.NEXT_PUBLIC_SHOW_PARALLAX === '1' && <Parallax />}
      <InteractiveImageAccordion />
      <CircularFlipCardGallery />
    </main>
  );
}



