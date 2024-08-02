'use client'

import { CarouselComponent } from '@/components/Carousal'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

export default function Home() {
  const { userId } = useAuth()
  const { user } = useUser()

  useEffect(() => {
    if (userId != null && user != null) {
      const sendRequest = async () => {
        const result = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({
            userId,
            name: user.fullName,
            email: user.primaryEmailAddress?.emailAddress,
            imageUrl: user.imageUrl
              ? user.imageUrl
              : 'https://picsum.photos/200',
          }),
        })
      }
      sendRequest()
    }
  }, [userId, user])

  return (
    <>
      <main className="flex-1 px-10 flex justify-between items-center mt-20 max-tablet:flex-col-reverse max-tablet:gap-10 mb-10 ml-20">
        <div className="flex flex-col gap-10 max-tablet:ml-14 max-mobile:max-w-72 max-mobile:ml-0">
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden">
              <h1 className="font-bold text-6xl max-desktop:text-5xl max-laptop:text-4xl animate-moveUp transition-all ease-in-out duration-700">
                Lacak Anda
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="font-bold text-6xl max-desktop:text-5xl max-laptop:text-4xl animate-moveUp transition-all ease-in-out duration-700 text-blue-600">
                Kesehatan <span className="text-black">mental</span>
              </h1>
            </div>
          </div>
          <div className="overflow-hidden">
            <h1 className="font-medium text-xl max-laptop:text-lg animate-moveDown transition-all ease-in-out duration-700 max-w-lg max-laptop:max-w-sm">
              <p>
                Aplikasi untuk membantu psikiater memantau kesehatan mental
                Anda.
              </p>
            </h1>
          </div>
          <Link href="/home">
            <button className="p-3 bg-blue-500 rounded-md hover:text-blue-500 text-white hover:bg-white border-2 border-blue-500 transition-all ease-in-out duration-300 font-bold">
              Get Started
            </button>
          </Link>
        </div>
        <div className="flex justify-center items-center mr-10 max-tablet:mr-0">
          <CarouselComponent />
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>
            <Link
              href="/privacy-policy"
              className="text-white-400 hover:underline font-bold"
            >
              made with ❤️ by
            </Link>{' '}
            <Link
              href="https://www.iegcode.com"
              className="text-blue-400 hover:underline font-bold"
            >
              iegcode
            </Link>
          </p>
        </div>
      </footer>
    </>
  )
}
