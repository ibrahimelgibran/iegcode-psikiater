'use client'

import Image from 'next/image'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import { BeatLoader } from 'react-spinners'

export default function Contact() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  // create a function to validate the email
  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  // create a function to validate the name
  const validateName = (name: string) => {
    const re = /^[a-zA-Z ]{2,30}$/
    return re.test(name)
  }

  // The below function is used to validate the form
  const validateForm = () => {
    if (!validateName(name)) {
      toast.error('Please enter the valid name')
      return false
    }
    if (!validateEmail(email)) {
      toast.error('Please enter the valid email')
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        setLoading(true)

        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            message,
          }),
        })

        try {
          const response = await fetch('/api/hello', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
            }),
          })
        } catch (error) {
          console.log('')
        }

        const data = await response.json()

        setLoading(false)

        if (data.error) {
          toast.error(data.error)
          return
        }

        toast.success('Message sent successfully')
      } catch (error) {
        toast.error('Something went wrong please try again later')
      }
    }
  }

  return (
    <div className="text-extrabold flex flex-col lg:flex-row lg:justify-around items-center overflow-x-hidden mt-10 lg:mt-10 mb-10">
      <Toaster />
      <div className="flex flex-col lg:justify-around lg:gap-40 lg:h-3/4 items-center mb-20 lg:mb-0 gap-10">
        <div className="flex flex-col gap-5">
          <h1 className="text-5xl font-black text-center">Contact us</h1>
          <p className="text-lg w-80 text-center">
            Isi formulir dan saya akan menghubungi Anda kembali dalam waktu 24
            jam
          </p>
        </div>
        {/* <div className="flex flex-col gap-5">
          <span className="flex gap-5 align-center">
            <Image
              src="/phone-contact.png"
              className="hover:scale-110 transition ease-in-out"
              alt="phone"
              width={25}
              height={25}
            />
            <p>+62 8587607605</p>
          </span>
          <span className="flex gap-5 align-center">
            <Image
              src="/gmail.png"
              className="hover:scale-110 transition ease-in-out"
              alt="email"
              width={25}
              height={25}
            />
            <p>iegcodeid@gmail.com</p>
          </span>
          <span className="flex gap-5 align-center">
            <Image
              src="/instagram.png"
              className="hover:scale-110 transition ease-in-out"
              alt="email"
              width={25}
              height={25}
            />
            <Link href="https://www.instagram.com/iegcode/">
              <p>iegcode</p>
            </Link>
          </span>
        </div> */}
        <div className="flex gap-10">
          <Link href="https://www.linkedin.com/in/ibrahimelgibran">
            <Image
              src="/linkedin-contact.png"
              className="hover:scale-110 transition ease-in-out"
              alt="linkedin"
              width={35}
              height={35}
            />
          </Link>
          <Link href="https://www.instagram.com/elgibran17/">
            <Image
              src="/instagram-contact.png"
              className="hover:scale-110 transition ease-in-out"
              alt="github"
              width={35}
              height={35}
            />
          </Link>
          <Link href="https://github.com/ibrahimelgibran/">
            <Image
              src="/github-contact.png"
              className="hover:scale-110 transition ease-in-out"
              alt="github"
              width={35}
              height={35}
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-7 h-3/4">
        <div className="flex justify-center">
          <Image
            src="/customer-service.png"
            className="hover:scale-110 transition ease-in-out mb-2 mt-10"
            alt="contact"
            width={70}
            height={80}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="text-input" className="font-bold">
            Name:
          </label>
          <input
            type="text"
            id="text-input"
            className="border outline-0 border-1 h-10 rounded-md p-2 font-normal w-80 focus:border-blue-500 focus:border-2"
            placeholder="Enter the name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email-input" className="font-bold">
            Email:
          </label>
          <input
            type="email"
            id="email-input"
            className="border outline-0 border-1 h-10 rounded-md p-2 font-normal w-80 focus:border-blue-500 focus:border-2"
            placeholder="Enter the email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="textarea-input" className="font-bold">
            Message:
          </label>
          {/* @ts-ignore */}
          <textarea
            name=""
            placeholder="Enter the message"
            id="textarea-input"
            cols={30}
            rows={10}
            className="border outline-0 border-1 h-40 rounded-md p-2 font-normal w-80 focus:border-blue-500 focus:border-2"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
            }}
          ></textarea>
        </div>
        <div>
          {/* @ts-ignore */}
          <button
            className="w-full font-bold bg-blue-500 text-white px-5 py-3 rounded-md border-2 transition border-blue-500 ease-in-out mb-10 lg:mb-0 hover:bg-white hover:text-blue-500"
            onClick={() => handleSubmit()}
          >
            {loading ? <BeatLoader size={8} color="white" /> : 'Send Message'}
          </button>
        </div>
      </div>
    </div>
  )
}
