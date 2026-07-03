import { getDb } from "../api/queries/connection";
import { services, testimonials, faqs, articleCategories } from "./schema";

async function seed() {
  const db = getDb();
  console.log("Seeding database...");

  // Seed services
  const existingServices = await db.select().from(services);
  if (existingServices.length === 0) {
    await db.insert(services).values([
      { title: "Pendampingan Skripsi, Tesis & Disertasi", slug: "pendampingan-skripsi-tesis-disertasi", shortDescription: "Pendampingan menyeluruh dari perumusan masalah hingga sidang.", icon: "BookOpen", displayOrder: 1 },
      { title: "Penyuntingan Artikel & Publikasi Jurnal", slug: "penyuntingan-artikel-publikasi", shortDescription: "Penyuntingan dan persiapan naskah sesuai standar jurnal target.", icon: "FileText", displayOrder: 2 },
      { title: "Analisis Data Statistik", slug: "analisis-data-statistik", shortDescription: "Pendampingan analisis data kuantitatif dengan berbagai software.", icon: "BarChart2", displayOrder: 3 },
      { title: "Penelitian Kualitatif", slug: "penelitian-kualitatif", shortDescription: "Bimbingan metodologi dan analisis penelitian kualitatif.", icon: "Users", displayOrder: 4 },
      { title: "Systematic Literature Review", slug: "systematic-literature-review", shortDescription: "Pendampingan penyusunan tinjauan literatur sistematis.", icon: "Search", displayOrder: 5 },
      { title: "Pemeriksaan Naskah Akademik", slug: "pemeriksaan-naskah", shortDescription: "Review dan evaluasi menyeluruh terhadap naskah akademik.", icon: "ClipboardCheck", displayOrder: 6 },
      { title: "Konsultasi Metodologi", slug: "konsultasi-metodologi", shortDescription: "Diskusi dan konsultasi pemilihan metode penelitian.", icon: "Compass", displayOrder: 7 },
      { title: "Persiapan Seminar & Ujian", slug: "persiapan-seminar-ujian", shortDescription: "Persiapan presentasi dan materi untuk seminar dan ujian.", icon: "Mic", displayOrder: 8 },
    ]);
    console.log("Services seeded.");
  }

  // Seed testimonials
  const existingTestimonials = await db.select().from(testimonials);
  if (existingTestimonials.length === 0) {
    await db.insert(testimonials).values([
      { quote: "Pendampingan membantu saya memahami kelemahan metodologi penelitian, bukan sekadar memperbaiki naskah. Penjelasan diberikan secara runtut dan mudah dipahami.", educationLevel: "Magister", field: "Manajemen", serviceType: "Pendampingan Tesis", isAnonymous: true, isPublished: true, displayOrder: 1 },
      { quote: "Interpretasi hasil statistik dijelaskan sesuai konteks penelitian, sehingga saya dapat mempertanggungjawabkan hasil analisis saat ujian.", educationLevel: "Doktoral", field: "Ilmu Sosial", serviceType: "Analisis Data", isAnonymous: true, isPublished: true, displayOrder: 2 },
      { quote: "Proses revisi artikel jurnal sangat terstruktur. Setiap saran disertai dengan referensi dan alasan ilmiah yang jelas.", educationLevel: "Dosen", field: "Pendidikan", serviceType: "Penyuntingan Artikel", isAnonymous: true, isPublished: true, displayOrder: 3 },
      { quote: "Saya merasa didampingi, bukan ditugasi. Setiap diskusi meningkatkan pemahaman saya tentang penelitian kualitatif.", educationLevel: "S1", field: "Kesehatan", serviceType: "Penelitian Kualitatif", isAnonymous: true, isPublished: true, displayOrder: 4 },
    ]);
    console.log("Testimonials seeded.");
  }

  // Seed FAQs
  const existingFaqs = await db.select().from(faqs);
  if (existingFaqs.length === 0) {
    await db.insert(faqs).values([
      { question: "Apakah layanan tersedia untuk S1, S2, dan S3?", answer: "Ya. Layanan kami mencakup ketiga jenjang pendidikan dengan pendampingan yang disesuaikan dengan kompleksitas dan karakteristik riset pada masing-masing jenjang.", category: "Umum", displayOrder: 1, isActive: true },
      { question: "Apakah data dan dokumen dijaga kerahasiaannya?", answer: "Sangat. Kerahasiaan adalah prinsip utama kami. Seluruh dokumen dan data klien diperlakukan secara profesional dan tidak akan dibagikan kepada pihak mana pun.", category: "Privasi", displayOrder: 2, isActive: true },
      { question: "Apakah tersedia pendampingan analisis statistik?", answer: "Ya. Kami menyediakan pendampingan untuk berbagai metode analisis statistik menggunakan software seperti SPSS, AMOS, SmartPLS, R, dan Python.", category: "Layanan", displayOrder: 3, isActive: true },
      { question: "Apakah dapat membantu proses publikasi jurnal?", answer: "Kami membantu penyuntingan naskah, penyesuaian format, dan persiapan dokumen sesuai standar jurnal target. Namun, kami tidak menjamin penerimaan publikasi.", category: "Layanan", displayOrder: 4, isActive: true },
      { question: "Bagaimana mekanisme konsultasi?", answer: "Konsultasi dapat dilakukan secara daring melalui video call atau chat. Jadwal disesuaikan dengan kesepakatan bersama.", category: "Proses", displayOrder: 5, isActive: true },
      { question: "Apakah Stilus Intellectus menjamin kelulusan atau publikasi?", answer: "Tidak. Kami menyediakan pendampingan dan konsultasi, bukan jaminan. Keberhasilan akademik tetap menjadi tanggung jawab penuh klien.", category: "Etika", displayOrder: 6, isActive: true },
      { question: "Apakah konsultasi dapat dilakukan secara daring?", answer: "Ya, seluruh layanan kami tersedia secara daring untuk memudahkan akses dari berbagai lokasi.", category: "Proses", displayOrder: 7, isActive: true },
      { question: "Berapa lama proses pendampingan biasanya?", answer: "Durasi bervariasi tergantung jenis layanan, kompleksitas, dan tahapan penelitian. Kami akan membahas estimasi waktu saat konsultasi awal.", category: "Proses", displayOrder: 8, isActive: true },
    ]);
    console.log("FAQs seeded.");
  }

  // Seed article categories
  const existingCategories = await db.select().from(articleCategories);
  if (existingCategories.length === 0) {
    await db.insert(articleCategories).values([
      { name: "Metodologi Penelitian", slug: "metodologi-penelitian" },
      { name: "Analisis Data", slug: "analisis-data" },
      { name: "Penelitian Kualitatif", slug: "penelitian-kualitatif" },
      { name: "Statistik", slug: "statistik" },
      { name: "Publikasi Jurnal", slug: "publikasi-jurnal" },
      { name: "Literature Review", slug: "literature-review" },
      { name: "Penulisan Akademik", slug: "penulisan-akademik" },
      { name: "Etika Akademik", slug: "etika-akademik" },
    ]);
    console.log("Article categories seeded.");
  }

  console.log("Seeding complete!");
}

seed().catch(console.error);
