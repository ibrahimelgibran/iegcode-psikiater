import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { encryptPassword, decryptPassword } from '@/utils/hash'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { score, userId } = await request.json()

    console.log('Received request:', { score, userId })

    if (score && userId) {
      const result = await prisma.score.create({
        data: {
          value: encryptPassword(String(score)),
          userId: userId,
        },
      })

      console.log('Score created:', result)
      return NextResponse.json(result)
    }

    if (!score && userId) {
      const results = await prisma.score.findMany({
        where: {
          userId: userId,
        },
      })

      console.log('Scores fetched:', results)

      const decryptedResults = results.map((item) => ({
        ...item,
        value: Number(decryptPassword(item.value)),
      }))

      return NextResponse.json(decryptedResults)
    }

    return NextResponse.json('error')
  } catch (error: any) {
    console.error('Error in /api/graph:', error)
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
