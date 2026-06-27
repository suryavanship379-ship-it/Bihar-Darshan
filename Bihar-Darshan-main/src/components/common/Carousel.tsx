import React, { useRef, useState, useEffect, Children, cloneElement, useCallback } from 'react';

const GAP = 64;
const COPIES = 5;
const MID_COPY = 2;
const SCALE_MIN = 0.5;
const OPACITY_MIN = 0.2;

interface CarouselProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
}

const Carousel = ({
  children,
  title,
  subtitle,
  actionLabel,
  actionHref,
}: CarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const isSnapping = useRef(false);
  const activeIndexRef = useRef(0);
  const childWidthRef = useRef(0);

  const originalChildren = Children.toArray(children);
  const originalCount = originalChildren.length;
  const infiniteChildren = Array(COPIES).fill(originalChildren).flat();
  const initialIndex = originalCount * MID_COPY;

  const [isHovered, setIsHovered] = useState(false);

  const cacheChildWidth = useCallback(() => {
    const container = scrollRef.current;
    if (container?.children[0]) {
      const firstChild = container.children[0] as HTMLElement;
      childWidthRef.current = firstChild.offsetWidth + GAP;
    }
  }, []);

  const getActiveFromScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container || !childWidthRef.current) return activeIndexRef.current;
    const contentCenter = container.scrollLeft + container.clientWidth / 2;
    const firstChild = container.children[0] as HTMLElement;
    const firstChildLeft = firstChild?.offsetLeft || 0;
    return Math.round(
      (contentCenter - firstChildLeft - childWidthRef.current / 2 + GAP / 2) /
      childWidthRef.current
    );
  }, []);

  const updateVisibleStyles = useCallback(() => {
    const container = scrollRef.current;
    if (!container || !childWidthRef.current) return;

    const cw = childWidthRef.current;
    const contentCenter = container.scrollLeft + container.clientWidth / 2;
    const viewportHalf = container.clientWidth / 2;

    const totalChildren = container.children.length;
    const estimatedCenter = getActiveFromScroll();
    const buffer = Math.ceil(viewportHalf / cw) + 2;
    const start = Math.max(0, estimatedCenter - buffer);
    const end = Math.min(totalChildren, estimatedCenter + buffer + 1);

    for (let i = 0; i < totalChildren; i++) {
      const child = container.children[i] as HTMLElement;
      if (i < start || i >= end) {
        if ((child as any)._styled) {
          child.style.transform = `scale(${SCALE_MIN})`;
          child.style.opacity = OPACITY_MIN.toString();
          child.style.zIndex = "0";
          (child as any)._styled = false;
        }
      }
    }

    let minDiff = Infinity;
    let newIndex = activeIndexRef.current;

    for (let i = start; i < end; i++) {
      const child = container.children[i] as HTMLElement;
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const diff = Math.abs(childCenter - contentCenter);

      const distanceInCards = Math.min(diff / cw, 3);
      const t = Math.min(distanceInCards / 2.5, 1);
      const ease = (1 - Math.cos(t * Math.PI)) / 2;
      const scale = 1.25 - ease * 0.65;
      const opacity = 1.0 - ease * 0.65;

      let translateX = 0;
      if (distanceInCards > 1.2) {
        const pullAmount = (distanceInCards - 1.2) * 48;
        const direction = childCenter - contentCenter > 0 ? -1 : 1;
        translateX = direction * pullAmount;
      }

      child.style.transform = `scale(${scale}) translateX(${translateX}px) translateZ(0)`;
      child.style.opacity = opacity.toString();
      child.style.zIndex = Math.round(scale * 100).toString();
      child.style.willChange = "transform, opacity";
      (child as any)._styled = true;

      if (diff < minDiff) {
        minDiff = diff;
        newIndex = i;
      }
    }

    activeIndexRef.current = newIndex;
    return newIndex;
  }, [getActiveFromScroll]);

  const checkBounds = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const idx = activeIndexRef.current;

    if (idx < originalCount * MID_COPY || idx >= originalCount * (MID_COPY + 1)) {
      isSnapping.current = true;
      const cw = childWidthRef.current;
      const targetIndex = originalCount * MID_COPY + (idx % originalCount);

      container.style.scrollBehavior = "auto";
      container.style.scrollSnapType = "none";
      container.scrollLeft = targetIndex * cw;
      activeIndexRef.current = targetIndex;

      void container.offsetHeight;
      updateVisibleStyles();

      container.style.scrollBehavior = "smooth";
      container.style.scrollSnapType = "x mandatory";

      setTimeout(() => {
        isSnapping.current = false;
      }, 50);
    }
  }, [originalCount, updateVisibleStyles]);

  const handleScroll = useCallback(() => {
    if (isSnapping.current) return;
    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      updateVisibleStyles();
    });
  }, [updateVisibleStyles]);

  useEffect(() => {
    let scrollTimeout: any;
    const container = scrollRef.current;

    const onScroll = () => {
      handleScroll();
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(checkBounds, 150);
    };

    if (container) {
      container.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      if (container) container.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimeout);
    };
  }, [handleScroll, checkBounds]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    cacheChildWidth();
    const cw = childWidthRef.current;
    activeIndexRef.current = initialIndex;

    container.style.scrollBehavior = "auto";
    container.scrollLeft = initialIndex * cw;
    void container.offsetHeight;
    updateVisibleStyles();
    container.style.scrollBehavior = "smooth";

    const onResize = () => {
      cacheChildWidth();
      updateVisibleStyles();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [cacheChildWidth, initialIndex, updateVisibleStyles]);


  useEffect(() => {
    if (isHovered) return;
    const id = setInterval(() => {
      const container = scrollRef.current;
      if (!container || !childWidthRef.current) return;
      const next = activeIndexRef.current + 1;
      container.scrollTo({
        left: next * childWidthRef.current,
        behavior: "smooth",
      });
    }, 3000);
    return () => clearInterval(id);
  }, [isHovered]);


  return (
    <div className="relative">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 flex items-end justify-between">
        <div>
          {subtitle && (
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
              {subtitle}
            </p>
          )}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary font-bold leading-tight">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-3 relative z-50">
          {actionLabel && (
            <a
              href={actionHref || "#"}
              className="hidden sm:inline-flex text-sm font-medium text-gold hover:text-gold-dark transition-colors mr-4"
            >
              {actionLabel} →
            </a>
          )}
        </div>
      </div>

      <div
        className="relative w-full overflow-visible"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        {/* Fading Edges */}
        <div className="absolute left-[-24px] top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-bg via-bg/80 to-transparent z-40 pointer-events-none backdrop-blur-[1px] opacity-90" />
        <div className="absolute right-[-24px] top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-bg via-bg/80 to-transparent z-40 pointer-events-none backdrop-blur-[1px] opacity-90" />

        <div
          ref={scrollRef}
          className="flex gap-16 overflow-x-auto pb-16 pt-16 px-[calc(50vw-140px)] sm:px-[calc(50vw-150px)] scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {infiniteChildren.map((child, index) =>
            cloneElement(child as React.ReactElement, { key: `card-${index}` })
          )}
        </div>
      </div>
    </div>
  );
};

export default Carousel;

