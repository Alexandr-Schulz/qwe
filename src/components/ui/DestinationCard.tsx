"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface DestinationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  location: string;
  flag: string;
  stats: string;
  href: string;
  themeColor: string;
}

const DestinationCard = React.forwardRef<HTMLDivElement, DestinationCardProps>(
  (
    { className, imageUrl, location, flag, stats, href, themeColor, ...props },
    ref
  ) => {
    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    const tiltRef = React.useRef<HTMLDivElement | null>(null);
    const imageRef = React.useRef<HTMLDivElement | null>(null);

    const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
      const element = wrapperRef.current;
      const tiltEl = tiltRef.current;
      const imgEl = imageRef.current;
      if (!element || !tiltEl || !imgEl) return;

      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const px = x / rect.width; // 0..1
      const py = y / rect.height; // 0..1

      const rotateX = (py - 0.5) * -10; // degrees
      const rotateY = (px - 0.5) * 10; // degrees
      const parallaxX = (px - 0.5) * 10; // px
      const parallaxY = (py - 0.5) * 10; // px

      tiltEl.style.setProperty("--rx", `${rotateX}deg`);
      tiltEl.style.setProperty("--ry", `${rotateY}deg`);
      imgEl.style.setProperty("--tx", `${parallaxX}px`);
      imgEl.style.setProperty("--ty", `${parallaxY}px`);
      tiltEl.style.setProperty("--mx", `${px * 100}%`);
      tiltEl.style.setProperty("--my", `${py * 100}%`);
    };

    const handlePointerLeave = () => {
      const tiltEl = tiltRef.current;
      const imgEl = imageRef.current;
      if (!tiltEl || !imgEl) return;
      tiltEl.style.setProperty("--rx", `0deg`);
      tiltEl.style.setProperty("--ry", `0deg`);
      tiltEl.style.setProperty("--mx", `50%`);
      tiltEl.style.setProperty("--my", `50%`);
      imgEl.style.setProperty("--tx", `0px`);
      imgEl.style.setProperty("--ty", `0px`);
    };

    return (
      <div
        ref={ref}
        className={cn("w-full h-full", className)}
        {...props}
      >
        <div
          ref={wrapperRef}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          style={{ "--theme-color": themeColor } as React.CSSProperties}
          className={cn("group relative h-full w-full [perspective:1200px]")}
        >
          {/* Outer glow ring */}
          <div
            className="pointer-events-none absolute -inset-1 rounded-3xl opacity-0 blur-[20px] transition duration-500 group-hover:opacity-100 bg-[radial-gradient(60%_60%_at_50%_50%,hsl(var(--theme-color)/0.35),transparent_60%)]"
          />

          <a
            href={href}
            aria-label={`Explore details for ${location}`}
            className="relative block h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-black/10 shadow-2xl ring-1 ring-white/5 backdrop-blur-xl transition-transform duration-300 ease-out will-change-transform group-hover:translate-y-[-2px] [transform-style:preserve-3d] group-hover:shadow-[0_0_60px_-15px_hsl(var(--theme-color)/0.6)]"
          >
            {/* Tilt container */}
            <div
              ref={tiltRef}
              className="absolute inset-0 rounded-2xl [transform-style:preserve-3d] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] [transition:transform_.2s_ease-out]"
            >
              {/* Parallax image layer */}
              <img
                ref={imageRef as unknown as React.RefObject<HTMLImageElement>}
                src={imageUrl}
                alt=""
                className="absolute inset-0 h-full w-full rounded-2xl object-cover will-change-transform [transform:translateX(var(--tx,0px))_translateY(var(--ty,0px))_scale(1.08)] [transition:transform_.2s_ease-out]"
              />

              {/* Themed gradient overlay for readability */}
              <div
                className="absolute inset-0 rounded-2xl bg-[linear-gradient(to_top,hsl(var(--theme-color)/0.9),hsl(var(--theme-color)/0.55)_35%,transparent_65%)]"
              />

              {/* Moving light sheen */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(200px_200px_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.18),transparent_60%)] [mix-blend-mode:soft-light]"
              />
            </div>

            {/* Content */}
            <div className="relative flex h-full flex-col justify-end p-6 text-white">
              <h3
                className="text-2xl md:text-3xl font-bold tracking-tight leading-tight break-words [hyphens:auto]"
                style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
              >
                {location} <span className="ml-1 text-2xl">{flag}</span>
              </h3>
              <p className="mt-1 text-sm font-medium text-white/80">{stats}</p>

              <div className="mt-7 inline-flex items-center gap-2 rounded-[14px] border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/15">
                <span className="relative inline-flex overflow-hidden">
                  <span className="relative z-10">Details ansehen</span>
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.35),transparent)] [animation:shimmer_2s_infinite]" />
                </span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  }
);
DestinationCard.displayName = "DestinationCard";

export { DestinationCard };


