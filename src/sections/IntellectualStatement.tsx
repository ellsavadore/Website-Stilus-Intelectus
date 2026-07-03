import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function IntellectualStatement() {
  const ref = useScrollReveal({ y: 30, duration: 1 });

  return (
    <section ref={ref} className="bg-stilus-black py-[140px] lg:py-[140px] md:py-[100px]">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 text-center">
        <p data-reveal className="font-mono-tech text-[12px] text-stilus-crimson mb-6">
          01
        </p>
        <blockquote data-reveal className="font-display text-[28px] md:text-[36px] lg:text-[42px] font-medium text-stilus-soft leading-[1.3] tracking-[-0.5px] mb-10">
          "Penelitian yang baik tidak hanya membutuhkan data. Ia membutuhkan pertanyaan yang tepat, metode yang teruji, dan argumentasi yang dapat dipertanggungjawabkan."
        </blockquote>
        <div data-reveal className="w-[60px] h-[1px] bg-white/25 mx-auto mb-10" />
        <p data-reveal className="font-body text-[16px] lg:text-[18px] font-normal text-stilus-gray max-w-[640px] mx-auto leading-[1.7]">
          Stilus Intellectus hadir sebagai mitra diskusi dan pendamping riset untuk membantu setiap gagasan berkembang menjadi karya akademik yang lebih tajam, terstruktur, dan bermakna.
        </p>
      </div>
    </section>
  );
}
