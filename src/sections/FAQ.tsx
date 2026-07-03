import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'Apakah layanan tersedia untuk S1, S2, dan S3?', a: 'Ya. Layanan kami mencakup ketiga jenjang pendidikan dengan pendampingan yang disesuaikan dengan kompleksitas dan karakteristik riset pada masing-masing jenjang.' },
  { q: 'Apakah data dan dokumen dijaga kerahasiaannya?', a: 'Sangat. Kerahasiaan adalah prinsip utama kami. Seluruh dokumen dan data klien diperlakukan secara profesional dan tidak akan dibagikan kepada pihak mana pun.' },
  { q: 'Apakah tersedia pendampingan analisis statistik?', a: 'Ya. Kami menyediakan pendampingan untuk berbagai metode analisis statistik menggunakan software seperti SPSS, AMOS, SmartPLS, R, dan Python.' },
  { q: 'Apakah dapat membantu proses publikasi jurnal?', a: 'Kami membantu penyuntingan naskah, penyesuaian format, dan persiapan dokumen sesuai standar jurnal target. Namun, kami tidak menjamin penerimaan publikasi.' },
  { q: 'Bagaimana mekanisme konsultasi?', a: 'Konsultasi dapat dilakukan secara daring melalui video call atau chat. Jadwal disesuaikan dengan kesepakatan bersama.' },
  { q: 'Apakah Stilus Intellectus menjamin kelulusan atau publikasi?', a: 'Tidak. Kami menyediakan pendampingan dan konsultasi, bukan jaminan. Keberhasilan akademik tetap menjadi tanggung jawab penuh klien.' },
  { q: 'Apakah konsultasi dapat dilakukan secara daring?', a: 'Ya, seluruh layanan kami tersedia secara daring untuk memudahkan akses dari berbagai lokasi.' },
  { q: 'Berapa lama proses pendampingan biasanya?', a: 'Durasi bervariasi tergantung jenis layanan, kompleksitas, dan tahapan penelitian. Kami akan membahas estimasi waktu saat konsultasi awal.' },
];

function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-white/[0.12]">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer bg-transparent border-none group"
        aria-expanded={isOpen}
      >
        <span className="font-body text-[16px] font-medium text-stilus-soft group-hover:text-stilus-white transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-stilus-muted flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}
      >
        <p className="font-body text-[16px] font-normal text-stilus-gray leading-[1.7]">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const ref = useScrollReveal({ y: 16, duration: 0.6, stagger: 0.05 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="bg-stilus-black py-[140px] lg:py-[140px]">
      <div className="max-w-[800px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p data-reveal className="font-mono-tech text-[11px] uppercase tracking-[3px] text-stilus-muted mb-6">
            07 — Pertanyaan Umum
          </p>
          <h2 data-reveal className="font-display text-[32px] lg:text-[42px] font-medium text-stilus-white leading-[1.1]">
            FAQ
          </h2>
        </div>

        {/* FAQ List */}
        <div>
          {faqs.map((faq, i) => (
            <div key={i} data-reveal>
              <FAQItem
                question={faq.q}
                answer={faq.a}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
