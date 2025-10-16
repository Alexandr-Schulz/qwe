'use client';

import React, { useEffect, useState } from 'react';

// --- The ArcGalleryHero Component ---
type ArcGalleryHeroProps = {
  images: string[];
  startAngle?: number;
  endAngle?: number;
  // radius for different screen sizes
  radiusLg?: number;
  radiusMd?: number;
  radiusSm?: number;
  // size of each card for different screen sizes
  cardSizeLg?: number;
  cardSizeMd?: number;
  cardSizeSm?: number;
  // optional extra class on outer section
  className?: string;
};

export const ArcGalleryHero: React.FC<ArcGalleryHeroProps> = ({
  images,
  startAngle = 20,
  endAngle = 160,
  radiusLg = 480,
  radiusMd = 360,
  radiusSm = 220,
  cardSizeLg = 120,
  cardSizeMd = 100,
  cardSizeSm = 72,
  className = '',
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [dimensions, setDimensions] = useState({
    radius: radiusLg,
    cardSize: cardSizeLg,
  });

  // Effect to handle responsive resizing of the arc and cards
  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({ radius: radiusSm, cardSize: cardSizeSm });
      } else if (width < 1024) {
        setDimensions({ radius: radiusMd, cardSize: cardSizeMd });
      } else {
        setDimensions({ radius: radiusLg, cardSize: cardSizeLg });
      }
    };

    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [radiusLg, radiusMd, radiusSm, cardSizeLg, cardSizeMd, cardSizeSm]);

  // Ensure at least 2 points to distribute angles for the arc calculation
  const count = Math.max(images.length, 2);
  const isSmBp = isMounted && dimensions.radius === radiusSm;
  const isMdBp = isMounted && dimensions.radius === radiusMd;
  const effectiveStartAngle = isSmBp ? startAngle + 10 : isMdBp ? startAngle + 5 : startAngle;
  const effectiveEndAngle = isSmBp ? endAngle - 10 : isMdBp ? endAngle - 5 : endAngle;
  const step = (effectiveEndAngle - effectiveStartAngle) / (count - 1);

  return (
    <section className={`relative overflow-hidden bg-surface text-foreground min-h-screen flex flex-col ${className}`}>
      {/* Background ring container that controls geometry */}
      <div
        className="relative mx-auto w-full"
        style={{
          width: '100%',
          // Reserve responsive height pre-mount to avoid layout jump
          height: isMounted ? `${dimensions.radius * 1.2}px` : 'min(60vh, 560px)',
        }}
      >
        {/* Center pivot for transforms - positioned at bottom center */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
          {/* Each image is positioned on the circle and rotated to face outward */}
          {isMounted && images.map((src, i) => {
            const angle = effectiveStartAngle + step * i; // degrees
            const angleRad = (angle * Math.PI) / 180;
            
            // Calculate x and y positions on the arc
            const x = Math.cos(angleRad) * dimensions.radius;
            const y = Math.sin(angleRad) * dimensions.radius;
            
            // Use fixed precision and pixel units to ensure SSR/CSR parity
            const xPx = x.toFixed(3);
            const yPx = y.toFixed(3);
            const rotateDeg = (angle / 4).toFixed(3);

            return (
              <div
                key={i}
                className="absolute opacity-0 animate-fade-in-up"
                style={{
                  width: `${dimensions.cardSize}px`,
                  height: `${dimensions.cardSize}px`,
                  left: `calc(50% + ${xPx}px)`,
                  bottom: `${yPx}px`,
                  transform: `translate(-50%, 50%)`,
                  animationDelay: `${i * 100}ms`,
                  animationFillMode: 'forwards',
                  zIndex: count - i,
                }}
              >
                <div 
                  className="rounded-2xl shadow-xl overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800 transition-transform hover:scale-105 w-full h-full"
                  style={{ transform: `rotate(${rotateDeg}deg)` }}
                >
                  <img
                    src={src}
                    alt={`Memory ${i + 1}`}
                    className="block w-full h-full object-cover"
                    draggable={false}
                    loading="lazy"
                    // Add a fallback in case an image fails to load
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/400x400/334155/e2e8f0?text=Memory`;
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content positioned below the arc */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 -mt-24 md:-mt-40 lg:-mt-64">
        <div className="text-center max-w-3xl px-6 opacity-0 animate-fade-in" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Momente aus unserer Nachbarschaft
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Teile besondere Augenblicke, finde gemeinsame Erinnerungen und bringe die Hausgemeinschaft näher zusammen.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center h-11 px-6 rounded-full btn-primary"
            >
              Jetzt mitmachen
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center h-11 px-6 rounded-full btn-outline"
            >
              Unsere Werte
            </a>
          </div>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translate(-50%, 60%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 50%);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation-name: fade-in-up;
          animation-duration: 0.8s;
          animation-timing-function: ease-out;
        }
        .animate-fade-in {
          animation-name: fade-in;
          animation-duration: 0.8s;
          animation-timing-function: ease-out;
        }
      `}</style>
    </section>
  );
};
