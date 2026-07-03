import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      
      tl.fromTo(
        '.hero-eyebrow',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
      .fromTo(
        '.hero-headline span',
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out', stagger: 0.08 },
        '-=0.2'
      )
      .fromTo(
        '.hero-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        '.hero-cta',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 },
        '-=0.2'
      )
      .fromTo(
        '.hero-micro',
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.1'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.35) saturate(0.8)' }}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 stilus-gradient-left z-[1]" />
      <div className="absolute inset-0 stilus-gradient-overlay z-[1]" />

      {/* Monogram Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-[1] pointer-events-none select-none hidden lg:block">
        <span className="font-display text-[400px] font-500 text-white/[0.04] leading-none">
          SI
        </span>
      </div>

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-24 flex items-center"
        style={{ minHeight: '100vh', paddingTop: 80 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 w-full items-center">
          {/* Left Column - Text */}
          <div className="max-w-[600px]">
            <p className="hero-eyebrow font-mono-tech text-[11px] uppercase tracking-[3px] text-stilus-muted mb-6 opacity-0">
              Konsultasi Riset & Pendampingan Akademik
            </p>

            <h1 className="hero-headline font-display text-[46px] lg:text-[72px] font-medium text-stilus-white leading-[1.05] tracking-[-1px] mb-6">
              {'Goresan Intelektual untuk Karya Akademik yang Bernilai'.split(' ').map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em] opacity-0">{word}</span>
              ))}
            </h1>

            <p className="hero-sub font-body text-[16px] lg:text-[18px] font-normal text-stilus-gray max-w-[520px] leading-[1.7] mb-8 opacity-0">
              Stilus Intellectus mendampingi mahasiswa, peneliti, dan akademisi dalam menyusun metodologi, menganalisis data, menyempurnakan naskah, serta mempersiapkan publikasi ilmiah secara sistematis dan bertanggung jawab.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="https://wa.me/62855366011"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta opacity-0 font-body text-[15px] font-semibold bg-stilus-crimson text-stilus-white px-8 py-4 rounded-full hover:bg-stilus-crimson-hover transition-all duration-200 flex items-center gap-2"
              >
                Mulai Konsultasi Riset
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => handleNav('#services')}
                className="hero-cta opacity-0 font-body text-[15px] font-semibold bg-transparent text-stilus-white px-8 py-4 rounded-full border border-white/25 hover:border-white/55 transition-all duration-200 cursor-pointer"
              >
                Jelajahi Layanan
              </button>
            </div>

            <p className="hero-micro font-mono-tech text-[12px] text-stilus-muted opacity-0">
              Privasi terjaga · Pendampingan personal · Berbasis kaidah ilmiah
            </p>
          </div>


        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-[1px] h-8 bg-stilus-muted/40 animate-pulse" style={{ animationDuration: '2s' }} />
        <ChevronDown className="w-4 h-4 text-stilus-muted/60" />
      </div>
    </section>
  );
}
