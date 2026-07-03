export default function Footer() {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-stilus-black border-t border-white/[0.12]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1 - Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src="/images/logo-si.png" alt="SI" className="h-8 w-auto" />
              <span className="font-display text-[32px] font-semibold text-stilus-white">SI</span>
            </div>
            <p className="font-body text-[14px] font-semibold text-stilus-soft">Stilus Intellectus</p>
            <p className="font-body text-[13px] text-stilus-muted mb-4">Goresan Intelektual</p>
            <p className="font-body text-[14px] text-stilus-muted leading-[1.6] max-w-[280px]">
              Pendampingan akademik dan konsultasi riset untuk mahasiswa, peneliti, dan akademisi.
            </p>
          </div>

          {/* Column 2 - Navigation */}
          <div>
            <p className="font-body text-[13px] font-semibold uppercase tracking-[1px] text-stilus-muted mb-5">
              Navigasi
            </p>
            <ul className="space-y-3">
              {[
                { label: 'Layanan', href: '#services' },
                { label: 'Metode', href: '#tools' },
                { label: 'Proses', href: '#philosophy' },
                { label: 'Testimoni', href: '#testimonials' },
                { label: 'FAQ', href: '#faq' },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="font-body text-[15px] text-stilus-gray hover:text-stilus-white transition-colors cursor-pointer bg-transparent border-none"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <p className="font-body text-[13px] font-semibold uppercase tracking-[1px] text-stilus-muted mb-5">
              Kontak
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/6285536601150"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[15px] text-stilus-gray hover:text-stilus-white transition-colors"
                >
                  WhatsApp: 085536601150
                </a>
              </li>
              <li className="font-body text-[15px] text-stilus-gray">Email: salmanalhidamkara666@gmail.com</li>
              <li className="font-body text-[15px] text-stilus-gray">Konsultasi Daring</li>
            </ul>
            <p className="font-body text-[13px] text-stilus-muted mt-4">
              Senin–Jumat, 09.00–18.00 WIB
            </p>
          </div>

          {/* Column 4 - Legal */}
          <div>
            <p className="font-body text-[13px] font-semibold uppercase tracking-[1px] text-stilus-muted mb-5">
              Informasi
            </p>
            <ul className="space-y-3">
              <li className="font-body text-[15px] text-stilus-gray">Kebijakan Privasi</li>
              <li className="font-body text-[15px] text-stilus-gray">Syarat Layanan</li>
              <li className="font-body text-[15px] text-stilus-gray">Etika Akademik</li>
              <li className="font-body text-[15px] text-stilus-gray">Disclaimer</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-12 pt-6 border-t border-white/[0.08]">
          <p className="font-body text-[12px] text-stilus-muted">
            © 2025 Stilus Intellectus. Seluruh hak cipta dilindungi.
          </p>
          <p className="font-body text-[12px] text-stilus-muted mt-2 sm:mt-0">
            Privasi terjaga · Etika akademik · Kualitas terdepan
          </p>
        </div>

        {/* Watermark */}
        <div className="flex justify-center mt-8 pointer-events-none select-none">
          <span className="font-display text-[200px] font-semibold text-white/[0.03] leading-none">
            SI
          </span>
        </div>
      </div>
    </footer>
  );
}
