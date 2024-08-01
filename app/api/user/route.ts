import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { encryptPassword, decryptPassword } from '@/utils/hash'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  // parsing userId from request json
  const { userId, name, email, imageUrl } = await request.json()

  // find user by userId
  const user = await prisma.user.findUnique({
    where: {
      userId: userId,
    },
  })

  // if user exists return user already exists
  if (user) {
    return NextResponse.json('User already exists')
  }

  //   creating the user
  const result = await prisma.user.create({
    data: {
      userId: userId,
      name: encryptPassword(name),
      email: encryptPassword(email),
      imageUrl: encryptPassword(imageUrl),
    },
  })

  return NextResponse.json('User created')
}

export async function GET() {
  const users = await prisma.user.findMany()
  const decryptedUsers = users.map((user) => {
    return {
      userId: user.userId,
      name: decryptPassword(user.name as string),
      email: decryptPassword(user.email as string),
      imageUrl: decryptPassword(user.imageUrl as string),
    }
  })
  return NextResponse.json(decryptedUsers)
}
