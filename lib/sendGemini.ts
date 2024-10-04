'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

// The below function is used to send a message to the gemini api and the output can be controlled using the tokens passed to it
const sendGemini = async (message: string, tokens: number) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: { maxOutputTokens: tokens },
  })

  try {
    const result = await model.generateContent(message)

    const response = result.response

    const text = response.text()

    return text
  } catch (error) {
    return 'Unable to generate output'
  }
}

export default sendGemini
