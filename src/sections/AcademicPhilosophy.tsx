import { useScrollReveal } from '@/hooks/useScrollReveal';
import { CheckCircle } from 'lucide-react';

const philosophyPoints = [
  'Konsultasi metodologi berbasis kebutuhan spesifik',
  'Pendampingan analisis data kuantitatif \u0026 kualitatif',
  'Penyuntingan naskah sesuai standar publikasi ilmiah',
];

export default function AcademicPhilosophy() {
  const ref = useScrollReveal({ y: 30, duration: 0.8, stagger: 0.1 });

  return (
    <section id="philosophy" ref={ref} className="bg-stilus-black py-[140px] lg:py-[140px] md:py-[100px]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-16 items-start">
          {/* Text Panel */}
          <div className="lg:sticky lg:top-[100px]">
            <p data-reveal className="font-mono-tech text-[11px] uppercase tracking-[3px] text-stilus-muted mb-6">
              01 — Pendekatan Akademik
            </p>
            <h2 data-reveal className="font-display text-[36px] lg:text-[52px] font-medium text-stilus-white leading-[1.1] mb-6">
              Struktur yang Menciptakan Kejelasan
            </h2>
            <p data-reveal className="font-body text-[16px] lg:text-[18px] font-normal text-stilus-gray leading-[1.7] max-w-[440px] mb-10">
              Setiap karya akademik memerlukan fondasi metodologi yang kokoh. Pendampingan kami dirancang untuk memperkuat setiap sendi penelitian — dari perumusan masalah hingga interpretasi hasil.
            </p>

            <div className="space-y-6 mb-10">
              {philosophyPoints.map((point, i) => (
                <div key={i} data-reveal className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-stilus-accent mt-0.5 flex-shrink-0" />
                  <span className="font-body text-[16px] text-stilus-soft">{point}</span>
                </div>
              ))}
            </div>

            <button
              data-reveal
              onClick={() => document.querySelector('#tools')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-body text-[15px] font-medium text-stilus-white underline-stilus cursor-pointer bg-transparent border-none"
            >
              Pelajari Metodologi Kami
            </button>
          </div>

          {/* 3D Gallery Placeholder */}
          <div data-reveal className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border border-white/[0.12] bg-stilus-deep shadow-2xl flex items-center justify-center">
            <div className="absolute inset-0">
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url(/images/galeriakademik.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              {/* Subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
