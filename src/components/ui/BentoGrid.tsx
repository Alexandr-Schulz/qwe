import { ReactNode, createContext, useContext, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type HoverState = { id: string | null; size: "small" | "large" | null };

const HoverCtx = createContext<{
  hovered: HoverState;
  setHovered: (h: HoverState) => void;
}>({ hovered: { id: null, size: null }, setHovered: () => {} });

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-5", className)}>{children}</div>
  );
};

const BentoGridRow = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const [hovered, setHovered] = useState<HoverState>({ id: null, size: null });
  return (
    <HoverCtx.Provider value={{ hovered, setHovered }}>
      <div
        className={cn(
          "grid w-full gap-5",
          // 4 cols on xl to keep two rows stable
          "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
          // fixed row heights to avoid row jumping
          "auto-rows-[18rem] md:auto-rows-[20rem] xl:auto-rows-[20rem]",
          className,
        )}
      >
        {children}
      </div>
    </HoverCtx.Provider>
  );
};

const BentoCard = ({
  id,
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  size = "small",
}: {
  id: string;
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
  size?: "small" | "large";
}) => {
  const isLarge = size === "large";
  const { hovered, setHovered } = useContext(HoverCtx);

  // Dynamic span at xl: large => 2 cols unless a small is hovered; small => 2 cols only when hovered
  let xlSpan = "";
  if (isLarge) {
    xlSpan = hovered.size === "small" ? "xl:col-span-1" : "xl:col-span-2";
  } else {
    xlSpan = hovered.id === id && hovered.size === "small" ? "xl:col-span-2" : "xl:col-span-1";
  }

  return (
    <div
      key={id}
      onMouseEnter={() => setHovered({ id, size })}
      onMouseLeave={() => setHovered({ id: null, size: null })}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl",
        // elevation
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.04),0_8px_24px_rgba(0,0,0,.06),0_24px_48px_rgba(0,0,0,.04)]",
        // dark theme surface
        "transform-gpu dark:bg-black/80 dark:[border:1px_solid_rgba(255,255,255,.08)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        // hover scale based on size
        isLarge ? "hover:scale-[0.97]" : "hover:scale-[1.04]",
        "transition-transform duration-300 ease-out will-change-transform hover:z-10",
        className,
        xlSpan,
      )}
    >
      <div>{background}</div>
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-2 p-6 transition-all duration-300 group-hover:-translate-y-8">
        <Icon className="h-10 w-10 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-90 dark:text-neutral-300" />
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
          {name}
        </h3>
        <p className="max-w-lg text-neutral-500 dark:text-neutral-400">{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
        )}
      >
        <a
          href={href}
          className="pointer-events-auto inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-neutral-700 hover:opacity-90 dark:text-neutral-300"
        >
          {cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </div>
  );
};

export { BentoCard, BentoGrid };
export { BentoGridRow };


