// app/doctor/page.tsx (or page.js, depending on your setup)
'use client'

import dynamic from 'next/dynamic'
import 'chart.js/auto'
import { useEffect, useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import Markdown from 'react-markdown'
import { Card } from '@/components/ui/card'
import sendGemini from '@/lib/sendGemini'
import toast from 'react-hot-toast'
import { useAuth } from '@clerk/nextjs'

const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
})

const updateDate = (date: any) => {
  const newDate = new Date(date)
  const formattedDate = newDate.toISOString().split('T')[0]
  return formattedDate
}

const LineChart = () => {
  const [labels, setLabels] = useState<string[]>([])
  const [values, setValues] = useState<number[]>([])
  const [response, setResponse] = useState<string>('')
  const { userId } = useAuth()
  const chartRef = useRef(null)

  // The below function is used to download the image of the react-charts graph
  const downloadImage = () => {
    // @ts-ignore
    html2canvas(chartRef.current).then((canvas) => {
      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = 'chart.png'
      link.click()
    })
  }

  // The below function set's the response
  const slowResponse = (response: string) => {
    setResponse(response)
  }

  useEffect(() => {
    const fetchData = async () => {
      toast.dismiss()
      toast.loading('Loading data...')

      const response = await fetch('/api/graph', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId }),
      })

      const data = await response.json()

      if (data === 'error') {
        toast.dismiss()
        toast.error('An error occurred while fetching the data.')
        return
      } else {
        toast.dismiss()
        toast.success('Data loaded successfully!')
      }

      const newData = []

      for (let i = 0; i < data.length; i++) {
        newData.push([updateDate(data[i].date), data[i].value])
      }

      const finalMap: { [key: string]: number } = {}

      for (let i = 0; i < newData.length; i++) {
        let sum = newData[i][1]
        let count = 1 // Start count at 1 to include the initial element

        if (!finalMap.hasOwnProperty(newData[i][0])) {
          for (let j = i + 1; j < newData.length; j++) {
            if (newData[i][0] === newData[j][0]) {
              sum += newData[j][1]
              count++
            }
          }
          finalMap[newData[i][0]] = sum / count
        }
      }

      const labels1 = Object.keys(finalMap)
      const values1 = Object.values(finalMap)

      setLabels(labels1)
      // @ts-ignore
      setValues(values1)

      const prompt = `Berikut adalah skor penilaian PHQ-9 dari waktu ke waktu:
      Tanggal: ${labels1.join(', ')}
      Skor: ${values1.join(', ')}
      Bisakah Anda menjelaskan skor ini kepada pasien? Ini adalah proyek, jadi silakan beri saran jika ada.`

      const geminiResponse = await sendGemini(prompt, 1000)

      slowResponse(geminiResponse)
    }
    fetchData()
  }, [])

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Mood Score',
        data: values,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  }

  return (
    <main className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-between w-full">
        <div className="w-full flex flex-col items-center gap-10 mt-10">
          <h1 className="font-bold text-xl">Mood Analysis</h1>
          {/* <div ref={chartRef} className="w-full">
            <Line data={data} className="w-full max-h-96" />
          </div> */}
          {/* <button
            className="p-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-white hover:text-blue-500 border-2 border-blue-500 transition-all ease-in-out duration-300 w-full"
            onClick={downloadImage}
          >
            Download as PNG
          </button> */}
        </div>
        {response ? (
          <Card className="w-full p-8 font-semibold my-14">
            <Markdown>{response}</Markdown>
          </Card>
        ) : (
          <div className="flex items-center justify-center my-10">
            <div className="w-20 h-20 border-4 border-white rounded-full border-t-4 border-t-blue-500 border-b-blue-500 animate-rotate"></div>
          </div>
        )}
      </div>
    </main>
  )
}

export default LineChart
