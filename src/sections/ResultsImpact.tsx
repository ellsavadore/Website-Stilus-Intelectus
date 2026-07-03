import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useRef, useState } from 'react';

const metrics = [
  { value: 500, suffix: '+', label: 'Klien Dampingan' },
  { value: 1200, suffix: '+', label: 'Naskah Direview' },
  { value: 95, suffix: '%', label: 'Tingkat Kepuasan' },
  { value: 50, suffix: '+', label: 'Publikasi Berhasil' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString('id-ID')}{suffix}
    </span>
  );
}

export default function ResultsImpact() {
  const ref = useScrollReveal({ y: 30, duration: 0.8, stagger: 0.15 });

  return (
    <section ref={ref} className="bg-stilus-black py-[140px] lg:py-[140px] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p data-reveal className="font-mono-tech text-[11px] uppercase tracking-[3px] text-stilus-muted mb-6">
              05 — Dampak Pendampingan
            </p>
            <h2 data-reveal className="font-display text-[36px] lg:text-[52px] font-medium text-stilus-white leading-[1.1] mb-6">
              Hasil yang Terukur, Bukan Janji Kosong
            </h2>
            <p data-reveal className="font-body text-[16px] lg:text-[18px] font-normal text-stilus-gray max-w-[480px] leading-[1.7]">
              Setiap angka mencerminkan komitmen kami terhadap kualitas. Kami tidak menjamin kelulusan — kami menjamin pendampingan yang sungguh-sungguh.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-6">
            {metrics.map((metric, i) => (
              <div
                key={i}
                data-reveal
                className="relative p-8 rounded-2xl border border-white/[0.12] bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06] transition-all duration-300 group"
              >
                <div className="absolute inset-0 rounded-2xl bg-stilus-crimson/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <p className="font-display text-[40px] lg:text-[56px] font-semibold text-stilus-white leading-none mb-2">
                    <AnimatedCounter target={metric.value} suffix={metric.suffix} />
                  </p>
                  <p className="font-body text-[14px] font-medium text-stilus-gray">
                    {metric.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-stilus-crimson/5 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
}
