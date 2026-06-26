import { useRef, useState, useEffect } from "react";

interface CommunitySlideable {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
}

/**
 * CommunityCarousel – a Community-section-only, self-contained manual carousel.
 *
 * Behaviour:
 *  - No auto-play, no infinite loop, no scale/opacity transforms on cards.
 *  - Cards are always fully visible (opacity 1, scale 1) at all times.
 *  - Clicking "Prev" / "Next" slides by exactly one card width.
 *  - Navigation buttons disable correctly at the start and end.
 *  - Dot indicators reflect and control the current position.
 *
 * Shared Carousel.tsx is NOT modified; this component is completely independent.
 */
const CommunityCarousel = ({
  children,
  title,
  subtitle,
  actionLabel,
  actionHref,
}: CommunitySlideable) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const items = Array.isArray(children) ? children : [children];
  const count = items.length;

  // Measure one card's width (including gap) after mount and on resize
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const firstCard = track.children[0] as HTMLElement | undefined;
      if (!firstCard) return;
      const gap = parseFloat(getComputedStyle(track).gap) || 20;
      setCardWidth(firstCard.offsetWidth + gap);
    };

    // Measure after paint so layout is settled
    const frame = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, [count]);

  // Whenever index changes, slide the track via CSS transform (no scroll API)
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !cardWidth) return;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }, [currentIndex, cardWidth]);

  const goPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0));
  const goNext = () => setCurrentIndex((i) => Math.min(i + 1, count - 1));

  const canPrev = currentIndex > 0;
  const canNext = currentIndex < count - 1;

  return (
    <div className="relative">
      {/* ── Header ── */}
      <div className="mb-8 sm:mb-10 flex items-end justify-between">
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

        <div className="flex items-center gap-3">
          {actionLabel && (
            <a
              href={actionHref || "#"}
              className="hidden sm:inline-flex text-sm font-medium text-gold hover:text-gold-dark transition-colors mr-4"
            >
              {actionLabel} →
            </a>
          )}

          {/* Prev button */}
          <button
            onClick={goPrev}
            disabled={!canPrev}
            aria-label="Previous community"
            className="comm-nav-btn"
          >
            ‹
          </button>

          {/* Next button */}
          <button
            onClick={goNext}
            disabled={!canNext}
            aria-label="Next community"
            className="comm-nav-btn"
          >
            ›
          </button>
        </div>
      </div>

      {/* ── Cards viewport (clips overflow) ── */}
      <div className="overflow-hidden">
        {/* Sliding track — no scroll, pure CSS transform */}
        <div
          ref={trackRef}
          className="comm-track"
        >
          {items.map((child, i) => (
            <div key={i} className="comm-card-slot">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* ── Dot indicators ── */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`comm-dot${i === currentIndex ? " active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityCarousel;
