"use client";

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef
} from 'react';
import gsap from 'gsap';

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-xl border border-transparent bg-transparent [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
  />
));
Card.displayName = 'Card';

type CardRef = RefObject<HTMLDivElement>;
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number, offsetY = 0) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y - offsetY,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  // Responsively reduce spread on narrow screens to avoid clipping
  const [spreadFactor, setSpreadFactor] = React.useState(1);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth || 1024;
      // Piecewise mapping to avoid clipping on narrow widths
      let f = 1;
      if (w <= 360) f = 0.62;
      else if (w <= 420) f = 0.72;
      else if (w <= 480) f = 0.85;
      setSpreadFactor(f);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const distX = Math.round(cardDistance * spreadFactor);
  const distY = Math.round(verticalDistance * spreadFactor);
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);
  const refs = useMemo<CardRef[]>(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length]);

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>();
  const container = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current!, makeSlot(i, distX, distY, total), skewAmount));

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current!;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current!;
        const slot = makeSlot(i, distX, distY, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, distX, distY, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current!;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
  }, [distX, distY, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) => {
    const slot = makeSlot(i, distX, distY, childArr.length);
    const initialStyle: React.CSSProperties = {
      transform: `translate3d(${slot.x}px, ${slot.y}px, ${slot.z}px) translate(-50%, -50%) skewY(${skewAmount}deg)`,
      transformOrigin: 'center center',
      zIndex: slot.zIndex as any,
      willChange: 'transform'
    };

    return isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width: '100%', height: '100%', ...initialStyle, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(i);
          }
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child;
  });

  // Responsive dimensions using CSS clamp to avoid clipping on narrow screens
  const maxWidthPx = typeof width === 'number' ? width : parseInt(String(width)) || 520;
  const maxHeightPx = typeof height === 'number' ? height : parseInt(String(height)) || 360;
  const responsiveWidth = `min(100%, 80vw, ${maxWidthPx}px)`;
  const responsiveHeight = `min(50vh, 50vw, ${maxHeightPx}px)`;

  return (
    <div
      ref={container}
      className="absolute top-1/2 left-1/2 -translate-y-[80%] -translate-x-1/2 max-[768px]:-translate-x-[51%] max-[640px]:-translate-x-[52%] max-[520px]:-translate-x-[54%] max-[460px]:-translate-x-[56%] max-[420px]:-translate-x-[57%] max-[380px]:-translate-x-[57.5%] max-[360px]:-translate-x-[58%] origin-center perspective-[900px] overflow-visible scale-95 max-[360px]:scale-[0.9] sm:scale-95 md:scale-100 lg:top-auto lg:left-auto lg:bottom-0 lg:right-0 lg:transform lg:-translate-x-[18%] lg:-translate-y-[64%] lg:origin-bottom-right lg:scale-100"
      style={{ width: responsiveWidth, height: responsiveHeight }}
    >
      <div className="w-full h-full -translate-y-[30%]">
        {rendered}
      </div>
    </div>
  );
};

export default CardSwap;
