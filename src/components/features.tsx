"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";


interface FeaturesProps {
  features: {
    id: number;
    icon: React.ElementType;
    title: string;
    description: string;
    image: string;
  }[];
  primaryColor?: string;
  progressGradientLight?: string;
  progressGradientDark?: string;
}

export function Features({
  features,
  primaryColor,
  progressGradientLight,
  progressGradientDark,
}: FeaturesProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }, 200);
    }
  }, [progress]);

  useEffect(() => {
    const activeFeatureElement = featureRefs.current[currentFeature];
    const container = containerRef.current;

    if (activeFeatureElement && container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = activeFeatureElement.getBoundingClientRect();

      container.scrollTo({
        left:
          activeFeatureElement.offsetLeft -
          (containerRect.width - elementRect.width) / 2,
        behavior: "smooth",
      });
    }
  }, [currentFeature]);

  const handleFeatureClick = (index: number) => {
    setCurrentFeature(index);
    setProgress(0);
  };

  return (
    <div className="py-10 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-12 text-center">
          <h2 className="text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground">
            Unsere Mission
          </h2>
          <div className="mx-auto mt-3 h-px w-20 sm:w-24 bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
          <h3 className="mt-3 text-balance text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.01em] text-foreground/90">
            Unsere Vision
          </h3>
        </div>

        <div className="grid lg:grid-cols-2 lg:gap-10 gap-6 items-center">
          {/* Left Side - Features with Progress Lines */}
          <div
            ref={containerRef}
            className="lg:space-y-4 md:space-x-4 lg:space-x-0 overflow-x-auto overflow-hidden no-scrollbar lg:overflow-visible flex lg:flex lg:flex-col flex-row order-1 pb-2 scroll-smooth"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = currentFeature === index;

              return (
                <div
                  key={feature.id}
                  ref={(el) => {
                    featureRefs.current[index] = el;
                  }}
                  className="relative cursor-pointer flex-shrink-0"
                  onClick={() => handleFeatureClick(index)}
                >
                  {/* Feature Content */}
                  <div
                    className={`
                    flex lg:flex-row flex-col items-start space-x-3 p-2.5 md:p-3 max-w-sm md:max-w-md lg:max-w-2xl transition-all duration-300
                    ${
                      isActive
                        ? " bg-white dark:bg-black/80 md:shadow-xl dark:drop-shadow-lg  rounded-lg md:border dark:border-none border-gray-200 "
                        : " "
                    }
                  `}
                  >
                    {/* Icon */}
                    <div
                      className={`
                      p-2.5 hidden md:block rounded-full transition-all duration-300
                      ${
                        isActive
                          ? `bg-sky-500 text-white`
                          : `bg-sky-500/10 dark:bg-black/80 text-sky-500`
                      }
                    `}
                    >
                      <Icon size={24} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3
                        className={`
                        text-base md:text-lg md:mt-2 lg:mt-0 font-semibold mb-1 transition-colors duration-300
                        ${
                          isActive
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-white/80"
                        }
                      `}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`
                        transition-colors duration-300 text-sm leading-relaxed
                        ${
                          isActive
                            ? "text-gray-600 dark:text-white/60"
                            : "text-gray-500 dark:text-white/40"
                        }
                      `}
                      >
                        {feature.description}
                      </p>
                      <div className="mt-2 bg-white dark:bg-black/80 rounded-sm h-1 overflow-hidden">
                        {isActive && (
                          <motion.div
                            className={`h-full ${progressGradientLight} dark:${progressGradientDark}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1, ease: "linear" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side - Image Display */}
          <div className="relative order-1 w-full lg:order-2">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              <Image
                className="w-full h-auto rounded-2xl border dark:border-none border-gray-50 shadow-lg dark:drop-shadow-lg"
                src={features[currentFeature].image}
                alt={features[currentFeature].title}
                width={520}
                height={340}
                sizes="(min-width: 1024px) 520px, 100vw"
                priority={currentFeature === 0}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
