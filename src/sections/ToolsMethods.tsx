import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useRef, useState } from 'react';

const quantitativeTools = [
  'SPSS', 'AMOS', 'SmartPLS', 'R', 'Python', 'SEM', 'Regresi', 'PLS-SEM',
  'Uji Mediasi', 'Uji Moderasi', 'Excel', 'MANOVA', 'ANOVA', 'Chi-Square',
];

const qualitativeTools = [
  'NVivo', 'Coding Tematik', 'Analisis Isi', 'Studi Kasus', 'Grounded Theory',
  'Mendeley', 'Zotero', 'VOSviewer', 'Bibliometrik', 'SLR', 'Fenomenologi',
  'Atlas.ti', 'MAXQDA', 'Ethnografi',
];

function MarqueeRow({ items, direction = 'left', speed = 0.5 }: { items: string[]; direction?: 'left' | 'right'; speed?: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const animRef = useRef<number>();
  const posRef = useRef(0);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    
    const animate = () => {
      if (!isHovered) {
        posRef.current += direction === 'left' ? -speed : speed;
        const firstChild = el.firstElementChild as HTMLElement;
        if (firstChild) {
          const itemWidth = firstChild.offsetWidth + 16;
          if (Math.abs(posRef.current) >= itemWidth) {
            posRef.current = 0;
          }
          if (posRef.current > 0) posRef.current = -itemWidth + posRef.current;
        }
        el.style.transform = `translateX(${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [direction, speed, isHovered]);

  const doubledItems = [...items, ...items, ...items];

  return (
    <div
      className="overflow-hidden py-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={rowRef} className="flex gap-4 whitespace-nowrap">
        {doubledItems.map((tool, i) => (
          <span
            key={i}
            className="inline-flex px-5 py-2.5 rounded-full border border-white/[0.12] bg-white/[0.06] text-stilus-gray font-body text-[14px] hover:bg-white/[0.12] hover:text-stilus-white hover:border-white/35 transition-all duration-300 cursor-default flex-shrink-0"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ToolsMethods() {
  const ref = useScrollReveal({ y: 20, duration: 0.8, stagger: 0.2 });

  return (
    <section id="tools" ref={ref} className="bg-stilus-black py-[120px] lg:py-[120px]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <p data-reveal className="font-mono-tech text-[11px] uppercase tracking-[3px] text-stilus-muted mb-6">
            04 — Instrumen Riset
          </p>
          <h2 data-reveal className="font-display text-[32px] lg:text-[42px] font-medium text-stilus-white leading-[1.1]">
            Perangkat dan Metode yang Kami Gunakan
          </h2>
        </div>

        {/* Marquee Rows */}
        <div data-reveal className="space-y-2">
          <MarqueeRow items={quantitativeTools} direction="left" speed={0.5} />
          <MarqueeRow items={qualitativeTools} direction="right" speed={0.4} />
        </div>
      </div>
    </section>
  );
}
