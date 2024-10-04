'use client'

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import 'chart.js/auto'
import html2canvas from 'html2canvas'
import toast from 'react-hot-toast'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// The below one is used to dynamically import the chart
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
})

// The below function is used to update time
const updateDate = (date: any) => {
  const newDate = new Date(date)
  const formattedDate = newDate.toISOString().split('T')[0]
  return formattedDate
}

export default function Page({ params }: { params: { userId: string } }) {
  const [labels, setLabels] = useState<string[]>([])
  const [values, setValues] = useState<number[]>([])
  const chartRef = useRef(null)

  // The below function is used to download the graph
  const downloadImage = () => {
    // @ts-ignore
    html2canvas(chartRef.current).then((canvas) => {
      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = 'chart.png'
      link.click()
    })
  }

  //  The below function picks up the userId from the url and parses it and makes a request to the backend to get all the scores
  useEffect(() => {
    const sendResult = async () => {
      toast.dismiss()
      toast.loading('Data Loading...')
      const result = await fetch(`/api/graph`, {
        method: 'POST',
        body: JSON.stringify({ userId: params.userId }),
      })
      const data = await result.json()

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

      const finalMap = {}

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
          // @ts-ignore
          finalMap[newData[i][0]] = sum / count
        }
      }

      const labels1 = Object.keys(finalMap)
      const values1 = Object.values(finalMap)

      setLabels(labels1)
      // @ts-ignore
      setValues(values1)
    }
    sendResult()
  }, [params])

  const dataG = {
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
    <main className="flex flex-col items-center justify-center w-full gap-8">
      <div className="flex flex-col items-center justify-between w-full">
        <div className="w-full flex flex-col items-center gap-10 mt-10">
          <h1 className="font-bold text-xl">Mood Analysis</h1>
          <div ref={chartRef} className="w-full">
            <Line data={dataG} className="w-full max-h-96" />
          </div>
          <button
            className="p-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-white hover:text-blue-500 border-2 border-blue-500 transition-all ease-in-out duration-300 w-full"
            onClick={downloadImage}
          >
            Download as PNG
          </button>
        </div>
      </div>
      <Table>
        <TableCaption>Mood Records</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {labels.map((label, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{label}</TableCell>
              <TableCell className="text-right">{values[index]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
