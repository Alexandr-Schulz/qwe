"use client"

import { useState, useEffect, useRef } from "react"
import { CIRCULAR_GALLERY_IMAGES } from "@/lib/gallery-images"

// A simple utility for conditional class names
const cn = (
  ...classes: Array<string | false | null | undefined>
) => classes.filter(Boolean).join(" ")

// --- Card Data ---
// Local images + organizational values on the back side
const orgValues = [
  { title: "Inklusion", description: "Technologie für alle." },
  { title: "Transparenz", description: "Klare Prozesse, ehrliche Entscheidungen." },
  { title: "Verantwortung", description: "Wir stehen zu unserem Wort." },
  { title: "Ethik", description: "Der Mensch steht im Mittelpunkt." },
  { title: "Sicherheit", description: "Schutz von Daten und Menschen by default." },
  { title: "Vertrauen", description: "Offener Dialog, verlässliche Produkte." },
  { title: "Zusammenarbeit", description: "Gemeinsam stärker – Team und Partner." },
  { title: "Innovation", description: "Ständiges Suchen nach besseren Lösungen." },
  { title: "Nachhaltigkeit", description: "Langer Horizont, schonender Umgang." },
  { title: "Qualität", description: "Sorgfalt und Details in jedem Schritt." },
  { title: "Offenheit", description: "Zugang zu Wissen und Best Practices." },
  { title: "Bildung", description: "Kompetenzen und Expertise fördern." },
  { title: "Gesellschaftlicher Nutzen", description: "Produkte mit echtem Mehrwert." },
  { title: "Datenschutz", description: "So wenig Daten wie möglich." },
  { title: "Barrierefreiheit", description: "Inklusive Interfaces und Inhalte." },
  { title: "Menschlichkeit", description: "Wertschätzung und Respekt." },
]

const cardData = CIRCULAR_GALLERY_IMAGES.map((image, index) => {
  const value = orgValues[index % orgValues.length]
  return {
    image,
    title: value.title,
    description: value.description,
  }
})

// --- FlipCard Component ---
// Converted custom CSS to Tailwind classes for a unified styling approach.
type FlipCardProps = {
  image: string
  title: string
  description: string
  className?: string
  style?: React.CSSProperties
}

function FlipCard({ image, title, description, className, style }: FlipCardProps) {
  return (
    <div
      className={cn(
        "group w-[7.5rem] h-[10.5rem] md:w-[9.5rem] md:h-[13.5rem] rounded-xl [perspective:1000px] transition-transform duration-300 ease-in-out hover:scale-105",
        className,
      )}
      style={style}
    >
      <div className="relative w-full h-full rounded-xl shadow-lg transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front side - Image */}
        <div className="absolute inset-0 rounded-xl [backface-visibility:hidden]">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover rounded-xl border border-neutral-200 dark:border-neutral-700"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement
              target.onerror = null
              target.src = "https://placehold.co/400x600/0a0a0a/333333?text=Image"
            }}
          />
        </div>
        {/* Back side - Title and Description */}
        <div className="absolute inset-0 rounded-xl bg-white border border-neutral-200 text-neutral-900 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100 flex flex-col items-center justify-center p-3 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <h3 className="font-bold text-[11px] md:text-sm text-neutral-900 dark:text-neutral-100 mb-1 text-balance line-clamp-1 truncate max-w-[90%]">
            {title}
          </h3>
          <p className="text-[10px] md:text-[11px] text-neutral-600 dark:text-neutral-400 leading-snug text-pretty line-clamp-2 truncate max-w-[92%]">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

// --- Main App Component (Circular Gallery) ---
export default function CircularGallery() {
  const galleryRef = useRef<HTMLDivElement | null>(null)
  const [size, setSize] = useState<number>(0)
  const [rotation, setRotation] = useState<number>(0)

  // Effect for responsive sizing
  useEffect(() => {
    const updateSize = () => {
      if (galleryRef.current) {
        const gallerySize = galleryRef.current.offsetWidth
        setSize(gallerySize)
      }
    }

    updateSize() // Initial size

    // Use ResizeObserver for better performance than window resize listener
    const resizeObserver = new ResizeObserver(updateSize)
    if (galleryRef.current) {
      resizeObserver.observe(galleryRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [])

  // Effect for animation loop
  useEffect(() => {
    let animationFrameId: number
    // Slowed down the animation for a more subtle effect
    const animate = () => {
      setRotation((prevRotation) => prevRotation + 0.00005)
      animationFrameId = requestAnimationFrame(animate)
    }
    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  // Balanced radius to accommodate slightly larger cards without clipping
  const radius = size * 0.465
  const centerX = size / 2
  const centerY = size / 2

  return (
    // Main container inherits section background
    <main className="font-sans bg-transparent text-foreground min-h-[85svh] sm:min-h-[90svh] flex items-center justify-center p-4 py-16 sm:py-24 md:py-28 lg:py-32">
      <div
        ref={galleryRef}
        className="relative w-full max-w-[420px] sm:max-w-[660px] md:max-w-[880px] aspect-square flex items-center justify-center overflow-visible pt-6 sm:pt-8"
      >
        {/* Central text */
        }
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none p-4">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-foreground text-center text-balance mb-3 leading-tight">
            Werte, die uns leiten
          </h1>
          <p className="text-sm md:text-base text-muted-foreground uppercase tracking-widest font-medium max-w-[36rem] text-center leading-snug">
            Fahren Sie mit der Maus über die Karten,
            um mehr zu erfahren
          </p>
        </div>

        {/* Circular arrangement of cards */}
        {size > 0 &&
          cardData.map((card, index) => {
            // Calculation to position cards in a circle
            const angle = (index / cardData.length) * 2 * Math.PI - Math.PI / 2 + rotation
            const x = centerX + radius * Math.cos(angle)
            const y = centerY + radius * Math.sin(angle)

            return (
              <FlipCard
                key={index}
                {...card}
                className="absolute hover:z-20"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: `translate(-50%, -50%) rotate(${(angle + Math.PI / 2) * (180 / Math.PI)}deg)`,
                }}
              />
            )
          })}
      </div>
    </main>
  )
}
