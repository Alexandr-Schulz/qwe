"use client";
export default function HeroGallery({ className = "" }: { className?: string }) {
  return (
    <div className={`mt-10 w-full h-[50vh] min-h-[320px] md:h-[65vh] md:min-h-[460px] lg:h-[78vh] lg:min-h-[620px] xl:h-[88vh] xl:min-h-[720px] ${className}`} />
  );
}
