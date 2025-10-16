"use client";

import * as React from "react";
import Container from "@/components/ui/Container";
import { MasonryGrid } from "@/components/masonry-grid";

const items = [
  {
    id: 1,
    content: (
      <div className="rounded-xl overflow-hidden bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/30 border shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop"
          alt="Testimonial 1"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
        <div className="p-4">
          <p className="text-sm text-muted-foreground">“Amazing experience! The quality and attention to detail are outstanding.”</p>
          <p className="mt-2 text-sm font-medium">— Alex Johnson</p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="rounded-xl overflow-hidden bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/30 border shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop"
          alt="Testimonial 2"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
        <div className="p-4">
          <p className="text-sm text-muted-foreground">“Sleek, fast, and delightful to use. Highly recommended.”</p>
          <p className="mt-2 text-sm font-medium">— Priya Verma</p>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className="rounded-xl overflow-hidden bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/30 border shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1541534401786-2077eed87a57?q=80&w=1200&auto=format&fit=crop"
          alt="Testimonial 3"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
        <div className="p-4">
          <p className="text-sm text-muted-foreground">“It helped our team move faster with confidence.”</p>
          <p className="mt-2 text-sm font-medium">— Chen Wei</p>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    content: (
      <div className="rounded-xl overflow-hidden bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/30 border shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1200&auto=format&fit=crop"
          alt="Testimonial 4"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
        <div className="p-4">
          <p className="text-sm text-muted-foreground">“Beautiful design and great performance.”</p>
          <p className="mt-2 text-sm font-medium">— Sofia Rossi</p>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    content: (
      <div className="rounded-xl overflow-hidden bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/30 border shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=1200&auto=format&fit=crop"
          alt="Testimonial 5"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
        <div className="p-4">
          <p className="text-sm text-muted-foreground">“From prototype to production in days.”</p>
          <p className="mt-2 text-sm font-medium">— Diego Santana</p>
        </div>
      </div>
    ),
  },
];

export default function ImageTestimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 border-t">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">What our users say</h2>
          <p className="mt-3 text-base text-muted-foreground">Social proof powered by a responsive Masonry layout.</p>
        </div>
        <div className="mt-10">
          <MasonryGrid columns={3} gap={4}>
            {items.map((item) => (
              <div key={item.id}>{item.content}</div>
            ))}
          </MasonryGrid>
        </div>
      </Container>
    </section>
  );
}


