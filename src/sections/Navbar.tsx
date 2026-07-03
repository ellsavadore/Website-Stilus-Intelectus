import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Layanan', href: '#services' },
  { label: 'Metode', href: '#tools' },
  { label: 'Keunggulan', href: '#philosophy' },
  { label: 'Testimoni', href: '#testimonials' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-stilus-black/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.35)]'
            : 'bg-transparent'
        }`}
        style={{ height: 80 }}
      >
        <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <a href="#hero" onClick={() => handleNavClick('#hero')} className="flex items-center gap-3">
            <img src="/images/logo-si.png" alt="SI" className="h-8 w-auto" />
            <span className="font-body text-[15px] font-semibold text-stilus-white tracking-[0.24em] uppercase hidden sm:block">
              Stilus Intellectus
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-body text-[15px] font-semibold text-stilus-gray uppercase tracking-[0.18em] transition-all duration-300 hover:text-white hover:tracking-[0.24em] cursor-pointer bg-transparent border-none"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <a
              href="https://wa.me/6285536601150"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[14px] font-semibold bg-gradient-to-r from-stilus-crimson via-stilus-crimson/95 to-stilus-crimson-hover text-white px-6 py-2.5 rounded-full shadow-[0_24px_84px_rgba(171,56,86,0.24)] ring-1 ring-white/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_32px_96px_rgba(171,56,86,0.32)] flex items-center gap-2"
            >
              Konsultasi
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-stilus-white p-2 cursor-pointer bg-stilus-white/5 rounded-full border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-stilus-black/95 backdrop-blur-3xl text-center text-white">
          <div className="flex justify-end p-6">
            <button
              onClick={() => setMobileOpen(false)}
              className="text-stilus-white p-2 cursor-pointer bg-stilus-white/5 rounded-full border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-8 px-8 pb-10">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-display text-[3rem] font-semibold text-white tracking-[0.24em] uppercase transition-all duration-300 hover:text-stilus-crimson hover:-translate-y-1 cursor-pointer bg-transparent border-none"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://wa.me/6285536601150"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full max-w-xs mx-auto font-body text-[15px] font-semibold bg-gradient-to-r from-stilus-crimson via-stilus-crimson/95 to-stilus-crimson-hover text-white px-8 py-4 rounded-full shadow-[0_24px_84px_rgba(171,56,86,0.24)] ring-1 ring-white/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_32px_96px_rgba(171,56,86,0.32)] inline-flex items-center justify-center gap-2"
            >
              Mulai Konsultasi
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
