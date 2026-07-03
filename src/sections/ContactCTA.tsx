import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Phone, Mail, Clock, ArrowRight } from 'lucide-react';

export default function ContactCTA() {
  const ref = useScrollReveal({ y: 30, duration: 0.8, stagger: 0.15 });
  const whatsappUrl = 'https://wa.me/6285536601150';

  return (
    <section id="contact" ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.3) saturate(0.8)' }}
      >
        <source src="/videos/contact-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 stilus-gradient-overlay z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 py-[140px] lg:py-[160px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - Text */}
          <div>
            <p data-reveal className="font-mono-tech text-[11px] uppercase tracking-[3px] text-stilus-muted mb-6">
              08 — Konsultasi
            </p>
            <h2 data-reveal className="font-display text-[36px] lg:text-[52px] font-medium text-stilus-white leading-[1.1] mb-6">
              Setiap Karya Ilmiah Dimulai dari Gagasan yang Perlu Ditajamkan
            </h2>
            <p data-reveal className="font-body text-[16px] lg:text-[18px] font-normal text-stilus-gray leading-[1.7] max-w-[480px] mb-12">
              Diskusikan topik, metode, data, atau kendala penelitian Anda bersama Stilus Intellectus.
            </p>

            <div data-reveal className="space-y-5">
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-stilus-muted" />
                <span className="font-body text-[16px] text-stilus-soft">085536601150</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-stilus-muted" />
                <span className="font-body text-[16px] text-stilus-soft">salmanalhidamkara666@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="w-5 h-5 text-stilus-muted" />
                <span className="font-body text-[14px] text-stilus-muted">Senin–Jumat, 09.00–18.00 WIB</span>
              </div>
            </div>
          </div>

          {/* Right - WhatsApp CTA */}
          <div data-reveal>
            <div className="bg-[rgba(12,12,12,0.92)] backdrop-blur-2xl border border-white/[0.1] rounded-3xl p-10 text-center space-y-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stilus-crimson/10 text-stilus-crimson shadow-[0_8px_30px_rgba(171,56,86,0.18)]">
                <ArrowRight className="w-7 h-7" />
              </div>
              <h3 className="font-display text-[28px] font-medium text-stilus-white">
                Hubungi Kami lewat WhatsApp
              </h3>
              <p className="font-body text-[16px] text-stilus-gray leading-[1.8] max-w-[520px] mx-auto">
                Klik tombol di bawah untuk memulai obrolan langsung dengan tim Stilus Intellectus. Kami akan segera menanggapi kebutuhan konsultasi akademik Anda.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full font-body text-[15px] font-semibold bg-gradient-to-r from-stilus-crimson via-stilus-crimson/95 to-stilus-crimson-hover text-white px-6 py-4 rounded-full shadow-[0_24px_64px_rgba(171,56,86,0.28)] ring-1 ring-white/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_34px_90px_rgba(171,56,86,0.32)]"
              >
                Buka WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/[0.08] bg-white/5 p-6 text-left shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                  <p className="font-body text-[13px] text-stilus-muted uppercase tracking-[1px] mb-3">WhatsApp</p>
                  <p className="font-body text-[15px] text-stilus-white">085536601150</p>
                </div>
                <div className="rounded-3xl border border-white/[0.08] bg-white/5 p-6 text-left shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
                  <p className="font-body text-[13px] text-stilus-muted uppercase tracking-[1px] mb-3">Email</p>
                  <p className="font-body text-[14px] text-stilus-white break-words whitespace-normal">salmanalhidamkara666@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
