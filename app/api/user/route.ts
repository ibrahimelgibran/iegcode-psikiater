import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { encryptPassword, decryptPassword } from '@/utils/hash'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { userId, name, email, imageUrl } = await request.json()

    console.log('Received data:', { userId, name, email, imageUrl }) // Tambahkan logging ini

    if (!userId || !name || !email || !imageUrl) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    })

    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    const result = await prisma.user.create({
      data: {
        userId: userId,
        name: encryptPassword(name),
        email: encryptPassword(email),
        imageUrl: encryptPassword(imageUrl),
      },
    })

    return NextResponse.json({ message: 'User created' })
  } catch (error: any) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
