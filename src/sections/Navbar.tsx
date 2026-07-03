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
            ? 'bg-stilus-black/92 backdrop-blur-xl border-b border-white/[0.08]'
            : 'bg-transparent'
        }`}
        style={{ height: 80 }}
      >
        <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <a href="#hero" onClick={() => handleNavClick('#hero')} className="flex items-center gap-3">
            <img src="/images/logo-si.png" alt="SI" className="h-8 w-auto" />
            <span className="font-body text-[15px] font-semibold text-stilus-white tracking-wide hidden sm:block">
              Stilus Intellectus
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-body text-[15px] font-medium text-stilus-gray hover:text-stilus-white transition-colors duration-200 underline-stilus cursor-pointer bg-transparent border-none"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <a
              href="https://wa.me/62855366011"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[14px] font-semibold bg-stilus-white text-stilus-black px-6 py-2.5 rounded-full hover:bg-stilus-soft transition-colors duration-200 flex items-center gap-2"
            >
              Konsultasi
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-stilus-white p-2 cursor-pointer bg-transparent border-none"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-stilus-black flex flex-col">
          <div className="flex justify-end p-6">
            <button
              onClick={() => setMobileOpen(false)}
              className="text-stilus-white p-2 cursor-pointer bg-transparent border-none"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-8 -mt-12">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-display text-4xl font-medium text-stilus-white hover:text-stilus-accent transition-colors cursor-pointer bg-transparent border-none"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://wa.me/62855366011"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 font-body text-[15px] font-semibold bg-stilus-crimson text-stilus-white px-8 py-4 rounded-full hover:bg-stilus-crimson-hover transition-colors flex items-center gap-2"
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
