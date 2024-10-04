'use client'

import { SignedIn, UserButton } from '@clerk/clerk-react'
import { SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

const MobileNavbar = () => {
  const [activeMenu, setActiveMenu] = useState(false)
  const navbarRef = useRef(null)

  useEffect(() => {
    if (activeMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [activeMenu])

  return (
    <div
      className={`relative z-10`}
      // @ts-ignore
      ref={navbarRef}
    >
      <nav className="p-4 px-10 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center font-black text-xl hover:scale-105 transition-all ease-in-out duration-300"
        >
          <h1 className="text-blue-500 text-4xl mr-1">I</h1>
          <h1 className="">eg</h1>
          <h1 className="text-blue-500 text-4xl mr-1">M</h1>
          <h1 className="">ood</h1>
        </Link>
        <div
          className="flex flex-col gap-1 cursor-pointer"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <div
            className={`w-8 h-1 origin-[33%_80%] bg-black ${
              activeMenu ? 'rotate-[45deg]' : ''
            } transition-all ease-in-out duration-300`}
          ></div>
          <div
            className={`w-8 h-1 bg-black ${
              activeMenu ? 'hidden' : ''
            } transition-all ease-in-out duration-300`}
          ></div>
          <div
            className={`w-8 h-1 bg-black origin-[33%_80%] ${
              activeMenu ? '-rotate-[45deg]' : ''
            } transition-all ease-in-out duration-300`}
          ></div>
        </div>
      </nav>
      <div
        className={`fixed top-0 h-screen w-[250px] bg-blue-500 ${
          activeMenu ? 'left-0' : 'left-[-300px]'
        } transition-all ease-in-out duration-700 flex items-center justify-center font-black text-lg text-white`}
      >
        <div className="flex flex-col gap-10 p-10">
          <div className="group">
            <Link
              href="/"
              className="hover:text-black transition-all ease-in-out duration-300"
              onClick={() => setActiveMenu(false)}
            >
              Home
            </Link>
            <div className="w-0 h-1 group-hover:w-full bg-black transition-all ease-in-out duration-700"></div>
          </div>
          <div className="group">
            <Link
              href="/about"
              className="hover:text-black transition-all ease-in-out duration-300"
              onClick={() => setActiveMenu(false)}
            >
              About
            </Link>
            <div className="w-0 h-1 group-hover:w-full bg-black transition-all ease-in-out duration-700"></div>
          </div>
          <div className="group">
            <Link
              href="/services"
              className="hover:text-black transition-all ease-in-out duration-300"
              onClick={() => setActiveMenu(false)}
            >
              Services
            </Link>
            <div className="w-0 h-1 group-hover:w-full bg-black transition-all ease-in-out duration-700"></div>
          </div>
          {/* <div className="group">
            <Link
              href="/doctor"
              className="hover:text-black transition-all ease-in-out duration-300"
              onClick={() => setActiveMenu(false)}
            >
              Doctor
            </Link>
            <div className="w-0 h-1 group-hover:w-full bg-black transition-all ease-in-out duration-700"></div>
          </div> */}
          <div className="group">
            <SignedOut>
              <Link
                href="/sign-up"
                className="hover:text-black transition-all ease-in-out duration-300"
                onClick={() => setActiveMenu(false)}
              >
                Daftar Sekarang
              </Link>
              <div className="w-0 h-1 group-hover:w-full bg-black transition-all ease-in-out duration-700"></div>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <div className="group">
            <Link
              href="/contact"
              className="hover:text-black transition-all ease-in-out duration-300"
              onClick={() => setActiveMenu(false)}
            >
              Contact Us
            </Link>
            <div className="w-0 h-1 group-hover:w-full bg-black transition-all ease-in-out duration-700"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNavbar
