import Image from 'next/image'
import { Card } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className="mt-10 flex flex-col gap-3 items-center">
      <Card className="p-10 flex flex-col gap-3 items-center">
        <Image
          src="/wellbeing.png"
          alt="IegMood Logo"
          width={100}
          height={100}
        />
        <p className="mt-3 text-center font-bold">
          Kekurangan Profesional Kesehatan Mental di Indonesia dan Solusi
          Inovatif IegMood
        </p>
        <p className="mt-5">
          Jakarta, Indonesia - Kekurangan profesional kesehatan mental di
          Indonesia telah menjadi masalah serius. Menurut data terbaru,
          Indonesia memiliki hanya sekitar 0,75 psikiater per 100.000 penduduk,
          jauh di bawah rekomendasi Organisasi Kesehatan Dunia (WHO) yang
          menyarankan minimal 3 psikiater per 100.000 penduduk. 🧠 Kekurangan
          ini mempertegas kebutuhan mendesak akan solusi inovatif untuk
          meningkatkan aksesibilitas dan dukungan dalam perawatan kesehatan
          mental.
        </p>
        <p>
          Untuk mengatasi masalah ini, aplikasi IegMood hadir sebagai solusi
          inovatif. IegMood memungkinkan pelacakan depresi harian 📊 menggunakan
          tes PHQ-9, yang merupakan alat yang diakui secara internasional untuk
          menilai gejala depresi. Aplikasi ini menawarkan umpan balik yang
          dipersonalisasi 🤖 melalui model Gemini, memberikan saran dan dukungan
          yang disesuaikan dengan penilaian harian pengguna.
        </p>
        <p>
          Selain itu, IegMood memfasilitasi pemantauan psikiatrik yang lebih
          terjangkau 🩺. Dengan fitur yang memungkinkan satu psikiater untuk
          memantau beberapa pasien secara jarak jauh, IegMood mengurangi biaya
          konsultasi dan meningkatkan efisiensi psikiater dalam mengelola banyak
          pasien. Ini bertujuan untuk membuat perawatan kesehatan mental lebih
          terjangkau dan efektif.
        </p>
        <p>
          IegMood berkomitmen untuk memberikan dukungan yang tepat waktu melalui
          peringatan kondisi kritis 🚨 dan saran yang dipersonalisasi 💬. Dengan
          memanfaatkan teknologi, IegMood berharap dapat menjembatani
          kesenjangan antara kebutuhan kesehatan mental dan sumber daya yang
          tersedia di Indonesia, serta membangun komunitas yang mendukung 🤝 dan
          meningkatkan efektivitas perawatan kesehatan mental di seluruh negeri.
          🌍
        </p>
      </Card>
      <br />
    </div>
  )
}
