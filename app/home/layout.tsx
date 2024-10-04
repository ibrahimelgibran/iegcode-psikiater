import { SignedIn } from '@clerk/nextjs'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SignedIn>
      <div className="px-10">{children}</div>
    </SignedIn>
  )
}
