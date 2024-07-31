import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const updateDate = (date: any) => {
  const newDate = new Date(date)
  const formattedDate = newDate.toISOString().split('T')[0]
  return formattedDate
}

export async function POST(req: NextRequest) {
  try {
    // Fetch the request body
    const reqBody = await req.json()

    // Get the userPrompt from the request body
    const { userPrompt, userId } = reqBody

    const scores = await prisma.score.findMany({
      where: {
        userId: userId,
      },
    })

    const newData = []

    for (let i = 0; i < scores.length; i++) {
      newData.push([updateDate(scores[i].date), scores[i].value])
    }

    const finalMap = {}

    for (let i = 0; i < newData.length; i++) {
      let sum = newData[i][1]
      let count = 1 // Start count at 1 to include the initial element

      if (!finalMap.hasOwnProperty(newData[i][0])) {
        for (let j = i + 1; j < newData.length; j++) {
          if (newData[i][0] === newData[j][0]) {
            // @ts-ignore
            sum += newData[j][1]
            count++
          }
        }
        // @ts-ignore
        finalMap[newData[i][0]] = sum / count
      }
    }

    const labels = Object.keys(finalMap)
    const values = Object.values(finalMap)

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [
            {
              text: 'Hello, I am patient who took a phq-9 test and I passed you the data based on it provide me guidance for my further interation with you it is just a project so feel free to give me any guidance.',
            },
          ],
        },
        {
          role: 'model',
          parts: [
            {
              text: `My phq-9 scores on dates ${labels.join(
                ','
              )} is the scores ${values.join(
                ','
              )} provide answers to the following questions based on the data. It is a project so feel free to give me any guidance.`,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 50,
      },
    })

    // Send the user's message to the chat model
    const result = await chat.sendMessage(
      userPrompt + 'Give me the answer in 50 tokens'
    )

    // Extract the text from the response
    const text = result.response?.text() || "Sorry, I don't understand."

    return NextResponse.json({ text })
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}
