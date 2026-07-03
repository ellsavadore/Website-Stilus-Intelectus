import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    quote: 'Pendampingan membantu saya memahami kelemahan metodologi penelitian, bukan sekadar memperbaiki naskah. Penjelasan diberikan secara runtut dan mudah dipahami.',
    attribution: 'Mahasiswa Magister',
    field: 'Manajemen',
  },
  {
    quote: 'Interpretasi hasil statistik dijelaskan sesuai konteks penelitian, sehingga saya dapat mempertanggungjawabkan hasil analisis saat ujian.',
    attribution: 'Mahasiswa Doktoral',
    field: 'Ilmu Sosial',
  },
  {
    quote: 'Proses revisi artikel jurnal sangat terstruktur. Setiap saran disertai dengan referensi dan alasan ilmiah yang jelas.',
    attribution: 'Dosen',
    field: 'Pendidikan',
  },
  {
    quote: 'Saya merasa didampingi, bukan ditugasi. Setiap diskusi meningkatkan pemahaman saya tentang penelitian kualitatif.',
    attribution: 'Peneliti Independen',
    field: 'Kesehatan',
  },
];

export default function Testimonials() {
  const ref = useScrollReveal({ y: 20, duration: 0.8 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" ref={ref} className="bg-stilus-ivory py-[140px] lg:py-[140px]">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p data-reveal className="font-mono-tech text-[11px] uppercase tracking-[3px] text-[#525252] mb-6">
            06 — Pengalaman Klien
          </p>
          <h2 data-reveal className="font-display text-[32px] lg:text-[42px] font-medium text-stilus-ink leading-[1.1]">
            Pengalaman yang Dibangun melalui Proses
          </h2>
        </div>

        {/* Testimonial Slider */}
        <div data-reveal className="relative min-h-[250px]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col items-center text-center transition-all duration-700 ${
                i === active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <blockquote className="font-display text-[22px] lg:text-[32px] font-normal italic text-stilus-ink leading-[1.4] max-w-[700px] mb-8">
                "{t.quote}"
              </blockquote>
              <p className="font-body text-[14px] font-medium text-[#525252]">
                {t.attribution} · Bidang {t.field}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-[4px] rounded-full transition-all duration-300 cursor-pointer border-none ${
                i === active ? 'w-8 bg-stilus-ink' : 'w-8 bg-stilus-ink/20 hover:bg-stilus-ink/40'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
