import { ArcGalleryHero } from "@/components/arc-gallery-hero-component";
import Container from "@/components/ui/Container";

export default function ArcGallery() {
  const images = [
    "/arc-haus-1.jpg",
    "/arc-haus-2.jpg",
    "/arc-haus-3.jpg",
    "/arc-haus-4.jpg",
    "/arc-haus-5.jpg",
    "/arc-haus-6.jpg",
    "/arc-haus-7.jpg",
    "/arc-haus-8.jpg",
  ];

  return (
    <section className="bg-surface">
      <ArcGalleryHero
        images={images}
        className="border-t"
      />
    </section>
  );
}



