import { useRef, useEffect, useState } from 'react';
import { BookOpen, FileText, BarChart2, Users, Search, ClipboardCheck, Compass, Mic } from 'lucide-react';

const services = [
  { name: 'Pendampingan Skripsi, Tesis \u0026 Disertasi', icon: BookOpen },
  { name: 'Penyuntingan Artikel \u0026 Publikasi Jurnal', icon: FileText },
  { name: 'Analisis Data Statistik', icon: BarChart2 },
  { name: 'Penelitian Kualitatif', icon: Users },
  { name: 'Systematic Literature Review', icon: Search },
  { name: 'Pemeriksaan Naskah Akademik', icon: ClipboardCheck },
  { name: 'Konsultasi Metodologi', icon: Compass },
  { name: 'Persiapan Seminar \u0026 Ujian', icon: Mic },
];

export default function ServiceRing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [rotation, setRotation] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setRotation((prev) => prev + 0.15);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section id="services" ref={sectionRef} className="bg-stilus-black py-[140px] lg:py-[160px] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono-tech text-[11px] uppercase tracking-[3px] text-stilus-muted mb-6">
            02 — Sistem Layanan
          </p>
          <h2 className="font-display text-[32px] lg:text-[42px] font-medium text-stilus-white leading-[1.1] mb-4">
            Pendampingan pada Setiap Tahap Penelitian
          </h2>
          <p className="font-body text-[16px] font-normal text-stilus-gray max-w-[480px] mx-auto leading-[1.7]">
            Mulai dari perumusan masalah hingga penyajian hasil, layanan disusun berdasarkan kebutuhan riset dan karakter akademik setiap klien.
          </p>
        </div>

        {/* Ring Carousel */}
        <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center">
          <div className="relative" style={{ width: 400, height: 400 }}>
            {services.map((service, i) => {
              const angle = (i * (360 / services.length) + rotation) * (Math.PI / 180);
              const radius = 180;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const scale = 0.6 + (Math.sin(angle) + 1) * 0.15;
              const zIndex = Math.round((Math.sin(angle) + 1) * 50);
              const Icon = service.icon;

              return (
                <div
                  key={i}
                  className="absolute cursor-pointer transition-all duration-300"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
                    zIndex,
                    width: 200,
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className={`p-6 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
                      hoveredIndex === i
                        ? 'bg-white/[0.12] border-white/40 shadow-[0_0_30px_rgba(107,39,55,0.3)]'
                        : 'bg-white/[0.06] border-white/[0.18]'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        hoveredIndex === i ? 'bg-stilus-crimson/30' : 'bg-white/[0.08]'
                      }`}>
                        <Icon className="w-5 h-5 text-stilus-white" />
                      </div>
                      <span className="font-body text-[13px] font-medium text-stilus-soft leading-[1.4]">
                        {service.name}
                      </span>
                      <span className="font-mono-tech text-[11px] text-stilus-muted">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Center glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-stilus-crimson/20 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
