import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useState } from 'react';

const stages = [
  { num: 1, name: 'Gagasan', desc: 'Identifikasi ide dan topik penelitian' },
  { num: 2, name: 'Rumusan Masalah', desc: 'Perumusan pertanyaan penelitian' },
  { num: 3, name: 'Literatur', desc: 'Tinjauan pustaka dan landasan teori' },
  { num: 4, name: 'Metodologi', desc: 'Pemilihan dan perancangan metode' },
  { num: 5, name: 'Data', desc: 'Pengumpulan data penelitian' },
  { num: 6, name: 'Analisis', desc: 'Pengolahan dan analisis data' },
  { num: 7, name: 'Interpretasi', desc: 'Interpretasi hasil penelitian' },
  { num: 8, name: 'Publikasi', desc: 'Penyusunan dan publikasi karya' },
];

export default function ResearchEcosystem() {
  const ref = useScrollReveal({ y: 24, duration: 0.6, stagger: 0.06 });
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  return (
    <section ref={ref} className="bg-stilus-deep py-[140px] lg:py-[140px]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p data-reveal className="font-mono-tech text-[11px] uppercase tracking-[3px] text-stilus-muted mb-6">
            03 — Ekosistem Penelitian
          </p>
          <h2 data-reveal className="font-display text-[32px] lg:text-[42px] font-medium text-stilus-white leading-[1.1]">
            Dari Gagasan hingga Publikasi
          </h2>
        </div>

        {/* Desktop Horizontal Diagram */}
        <div className="hidden lg:block">
          <div className="flex items-start justify-between relative">
            {/* Connecting Line */}
            <div className="absolute top-[20px] left-[40px] right-[40px] h-[1px] bg-white/[0.12]" />
            <div
              className="absolute top-[20px] left-[40px] h-[1px] bg-stilus-accent/50 transition-all duration-700"
              style={{
                width: hoveredStage !== null ? `${(hoveredStage / (stages.length - 1)) * 100}%` : '0%',
              }}
            />

            {stages.map((stage, i) => (
              <div
                key={stage.num}
                data-reveal
                className="flex flex-col items-center relative z-10 cursor-pointer group"
                onMouseEnter={() => setHoveredStage(i)}
                onMouseLeave={() => setHoveredStage(null)}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-mono-tech text-[14px] transition-all duration-300 ${
                    hoveredStage === i
                      ? 'bg-stilus-crimson text-stilus-white scale-125 shadow-[0_0_20px_rgba(107,39,55,0.5)]'
                      : 'bg-stilus-soft text-stilus-black'
                  }`}
                >
                  {stage.num}
                </div>
                <p className={`font-body text-[14px] font-medium mt-4 transition-colors duration-300 text-center ${
                  hoveredStage === i ? 'text-stilus-white' : 'text-stilus-gray'
                }`}>
                  {stage.name}
                </p>
                <p className={`font-body text-[12px] text-center mt-1 max-w-[120px] transition-all duration-300 ${
                  hoveredStage === i ? 'text-stilus-gray opacity-100' : 'text-stilus-muted opacity-0'
                }`}>
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden">
          <div className="relative pl-8">
            <div className="absolute left-[15px] top-0 bottom-0 w-[1px] bg-white/[0.12]" />
            {stages.map((stage) => (
              <div
                key={stage.num}
                data-reveal
                className="flex items-start gap-4 mb-8 last:mb-0"
              >
                <div className="w-8 h-8 rounded-full bg-stilus-soft text-stilus-black flex items-center justify-center font-mono-tech text-[12px] flex-shrink-0 relative z-10">
                  {stage.num}
                </div>
                <div>
                  <p className="font-body text-[15px] font-medium text-stilus-soft">{stage.name}</p>
                  <p className="font-body text-[13px] text-stilus-muted mt-1">{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
