'use client'

import { Progress } from '@/components/ui/progress'
import { GeminiBot } from '@/components/Gemini-Interface'
import Quiz from '@/components/Quiz'
import { useSelector } from 'react-redux'

export default function Home() {
  // @ts-ignore
  const progress = useSelector((state: RootState) => state.counter.value)

  return (
    <main className="mt-16 flex justify-between max-[800px]:flex-col max-[800px]:gap-14">
      <div className="flex flex-col gap-4 w-[45%] max-[800px]:w-[100%]">
        <Progress value={progress} />
        <Quiz />
      </div>
      <div className="w-[45%] max-[800px]:w-[100%]">
        <GeminiBot />
      </div>
    </main>
  )
}
