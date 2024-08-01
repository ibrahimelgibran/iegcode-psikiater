import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter as FontSans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import StoreProvider from './StoreProvider'

import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IegMood',
  description: 'An application to monitor mental health',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased bg-white',
            fontSans.variable
          )}
        >
          <div className="pt-4 rounded-xl h-full w-ful">
            <StoreProvider>
              <Navbar />
              <Toaster />
              {children}
            </StoreProvider>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
