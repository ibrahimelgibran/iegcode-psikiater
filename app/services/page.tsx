'use client'

import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { useState } from 'react'

export default function ServicesPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  return (
    <div className="flex flex-wrap gap-10 items-center justify-center my-10">
      <Card className="w-[350px] h-[350px] flex flex-col gap-4 p-5">
        <Image
          src="/services/homepage.png"
          alt="phq"
          width={400}
          height={400}
          className="cursor-pointer w-full h-52"
        />
        <p className="font-semibold">Rumah dari aplikasi kesehatan mental.</p>
      </Card>
      <Card className="w-[350px] h-[350px] flex flex-col gap-4 p-5">
        <Image
          src="/services/auth-create.png"
          alt="gemini explain"
          width={400}
          height={400}
          className="cursor-pointer w-full h-52"
        />
        <p className="font-semibold">
          Menerapkan otentikasi yang sangat kuat dalam aplikasi.
        </p>
      </Card>
      <Card className="w-[350px] h-[350px] flex flex-col gap-4 p-5">
        <Image
          src="/services/auth-home1.png"
          alt="gemini message"
          width={400}
          height={200}
          className="cursor-pointer w-full h-52"
        />
        <p className="font-semibold">
          Setelah otentikasi, pengguna dapat mengubah datanya dari tombol
          Pengguna.
        </p>
      </Card>
      <Card className="w-[350px] h-[350px] flex flex-col gap-4 p-5">
        <Image
          src="/services/aboutus.png"
          alt="personalized response"
          width={400}
          height={400}
          className="cursor-pointer w-full h-52"
        />
        <p className="font-semibold">
          Halaman ini menceritakan rincian tentang proyek tersebut.
        </p>
      </Card>
      <Card className="w-[350px] h-[350px] flex flex-col gap-4 p-5">
        <Image
          src="/services/explain1.png"
          alt="clerk auth"
          width={400}
          height={400}
          className="cursor-pointer w-full h-52"
        />
        <p className="font-semibold">
          Elemen ini digunakan untuk mengikuti tes dari pengguna untuk melacak
          depresinya.
        </p>
      </Card>
      <Card className="w-[350px] h-[350px] flex flex-col gap-4 p-5">
        <Image
          src="/services/response.png"
          alt="clerk auth"
          width={400}
          height={400}
          className="cursor-pointer w-full h-52"
        />
        <p className="font-semibold">
          Setelah selesai test, anda akan mendapatkan feedback saran dan
          kritikan dari Ai.
        </p>
      </Card>
      <Card className="w-[350px] h-[350px] flex flex-col gap-4 p-5">
        <Image
          src="/services/contactus.png"
          alt="complete analysis"
          width={400}
          height={400}
          className="cursor-pointer w-full h-52"
        />
        <p className="font-semibold">
          Formulir ini digunakan untuk menghubungi jika terjadi keadaan darurat.
        </p>
      </Card>
      <Card className="w-[350px] h-[350px] flex flex-col gap-4 p-5">
        <Image
          src="/services/doctorr.png"
          alt="contact form"
          width={400}
          height={400}
          className="cursor-pointer w-full h-52"
        />
        <p className="font-semibold">
          Halaman ini hanya dapat diakses oleh para profesional yang dapat
          melacak semua pasien menggunakan aplikasi.
        </p>
      </Card>
      <Card className="w-[350px] h-[350px] flex flex-col gap-4 p-5">
        <Image
          src="/services/gemini-ai.png"
          alt="clerk auth"
          width={400}
          height={400}
          className="cursor-pointer w-full h-52"
        />
        <p className="font-semibold">
          Anda dapat mengajukan pertanyaan gemini dari elemen ini.
        </p>
      </Card>
      <Card className="w-[350px] h-[350px] flex flex-col gap-4 p-5">
        <Image
          src="/services/service.png"
          alt="mental track"
          width={400}
          height={400}
          className="cursor-pointer w-full h-52"
        />
        <p className="font-semibold">
          Halaman ini menunjukkan layanan dan fitur aplikasi.
        </p>
      </Card>
    </div>
  )
}
