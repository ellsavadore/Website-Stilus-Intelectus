import { useScrollReveal } from '@/hooks/useScrollReveal';
import { XCircle } from 'lucide-react';

const commitments = [
  'Tidak menjanjikan kelulusan',
  'Tidak menjamin penerimaan jurnal',
  'Tidak menggantikan tanggung jawab akademik',
];

export default function EthicalCommitment() {
  const ref = useScrollReveal({ y: 20, duration: 0.8, stagger: 0.1 });

  return (
    <section ref={ref} className="bg-stilus-ivory py-[100px] lg:py-[100px]">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 text-center">
        <h2 data-reveal className="font-display text-[28px] lg:text-[36px] font-medium text-stilus-ink leading-[1.2] mb-6">
          Pendampingan yang Menjaga Integritas Akademik
        </h2>
        <p data-reveal className="font-body text-[16px] font-normal text-[#525252] max-w-[640px] mx-auto leading-[1.7] mb-12">
          Stilus Intellectus berfokus pada konsultasi, asistensi metodologi, penguatan analisis, penyuntingan ilmiah, dan pengembangan kompetensi klien. Setiap pengguna tetap bertanggung jawab terhadap isi, orisinalitas, penggunaan data, dan keputusan akademiknya.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {commitments.map((commitment, i) => (
            <div key={i} data-reveal className="flex flex-col items-center gap-3">
              <XCircle className="w-6 h-6 text-stilus-crimson" />
              <p className="font-body text-[14px] font-medium text-stilus-ink">{commitment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
