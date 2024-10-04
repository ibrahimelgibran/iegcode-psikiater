'use client'
import { useEffect, useState } from 'react'
import MobileNavbar from './MobileNavbar'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const Navbar = () => {
  const [activeTab, setActiveTab] = useState(1)
  const [width, setWidth] = useState(1000)

  useEffect(() => {
    setWidth(window.innerWidth)
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    })
    return () => {
      window.removeEventListener('resize', () => {
        setWidth(window.innerWidth)
      })
    }
  }, [])

  return (
    <div>
      {width > 880 ? (
        <>
          <nav className="flex items-center justify-between p-4 px-10">
            <Link
              href="/"
              onClick={() => setActiveTab(1)}
              className="flex items-center font-black text-2xl hover:scale-105 transition-all ease-in-out duration-300"
            >
              <h1 className="text-blue-500 text-5xl max-laptop:text-5xl">I</h1>
              <h1 className="text-4xl max-laptop:text-3xl">eg</h1>
              <h1 className="text-blue-500 text-5xl max-laptop:text-5xl">M</h1>
              <h1 className="text-4xl max-laptop:text-3xl">ood</h1>
            </Link>
            <div className="flex gap-10 font-bold relative">
              <Link
                href="/"
                onClick={() => setActiveTab(1)}
                className="hover:text-blue-500 transition-all ease-in-out duration-300 hover:scale-105"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setActiveTab(2)}
                className="hover:text-blue-500 transition-all ease-in-out duration-300 hover:scale-105"
              >
                About
              </Link>
              <Link
                href="/services"
                onClick={() => setActiveTab(3)}
                className="hover:text-blue-500 transition-all ease-in-out duration-300 hover:scale-105"
              >
                Services
              </Link>
              {/* <Link
                href="/doctor"
                onClick={() => setActiveTab(4)}
                className="hover:text-blue-500 transition-all ease-in-out duration-300 hover:scale-105"
              >
                Doctor
              </Link> */}
              <div
                className={`absolute w-12 h-1 bg-blue-500 top-6 transition-all ease-in-out duration-300 ${
                  (activeTab == 1 && 'left-0') ||
                  (activeTab == 2 && 'left-[87px]') ||
                  (activeTab == 3 && 'left-[180px]') ||
                  (activeTab == 4 && 'left-[275px]')
                }`}
              ></div>
            </div>
            <div className="flex gap-10 items-center font-bold">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Link
                  href="/sign-up"
                  className="p-3 bg-blue-600 rounded-md text-white hover:text-blue-600 hover:bg-white border-2 border-blue-600 transition-all ease-in-out duration-300"
                >
                  Daftar Sekarang
                </Link>
              </SignedOut>

              <Link
                href="/contact"
                className="p-3 bg-blue-600 rounded-md text-white hover:text-blue-600 hover:bg-white border-2 border-blue-600 transition-all ease-in-out duration-300"
              >
                Contact
              </Link>
            </div>
          </nav>
        </>
      ) : (
        <>
          <MobileNavbar />
        </>
      )}
    </div>
  )
}

export default Navbar
