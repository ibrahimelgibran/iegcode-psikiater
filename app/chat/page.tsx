'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/lib/hooks'
import { updateValue } from '@/lib/features/chat/chatSlice'
import { ChatMessage } from '@/lib/features/chat/chatSlice'
import { RootState } from '@/lib/store'
import toast from 'react-hot-toast'
import Image from 'next/image'
import Markdown from 'react-markdown'
import Loader from '@/components/Loader'
import { useAuth } from '@clerk/nextjs'

export default function ChatPage() {
  const [userImage, setUserImage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const { user } = useUser()
  const chatRef = useRef<HTMLDivElement>(null)
  const chat = useSelector((state: RootState) => state.chat.messages)
  const { userId } = useAuth()

  const dispatch = useAppDispatch()

  useEffect(() => {
    setUserImage(user?.imageUrl as string)
  }, [user])

  const addMessage = (data: ChatMessage) => {
    dispatch(updateValue(data))
  }

  const sendGeminiMessage = async (message: string) => {
    setLoading(true)
    toast.dismiss()
    toast.loading('Getting the response...')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPrompt: message,
          userId: userId,
        }),
      })

      const data = await response.json()

      if (data.error) {
        toast.dismiss()
        toast.error(data.error)
        return
      }

      const chatMessage: ChatMessage = {
        user: 'model',
        message: data.text,
      }

      addMessage(chatMessage)
      toast.dismiss()
      toast.success('Response Received!')
    } catch (error) {
      toast.dismiss()
      toast.error('An error occurred!')
    }

    setLoading(false)
  }

  const handleSubmit = async () => {
    if (message == '') {
      toast.error('message cannot be empty!')
      return
    }

    if (loading) {
      toast.error('A Request is in Process')
      return
    }

    const lastMessage = chatRef.current?.lastElementChild as HTMLDivElement
    lastMessage?.scrollIntoView({ behavior: 'smooth' })

    const data: ChatMessage = {
      user: user?.firstName as string,
      message: message as string,
    }

    addMessage(data)

    setMessage('')

    await sendGeminiMessage(message)
  }

  const handleChangeInput = (e: any) => {
    setMessage(e.target.value)
  }

  const handleKeyDown = (e: any) => {
    if (e.key == 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="my-10 h-[80vh]">
      <Card className="p-10 h-full w-full flex flex-col items-center justify-between">
        <div
          className="flex flex-col gap-2 w-full h-[70vh] overflow-y-scroll no-scrollbar"
          ref={chatRef}
        >
          {chat.map((message, index) => (
            <div
              key={index}
              className={`${
                message.user === 'model' ? 'text-left' : 'text-right'
              } w-full p-4`}
            >
              <Card className="inline-block p-4">
                <div className="flex gap-4">
                  <Image
                    src={message.user != 'model' ? userImage : '/chat.png'}
                    alt={message.user}
                    width={30}
                    height={30}
                    className="rounded-full"
                    style={{
                      width: '30px',
                      height: '30px',
                      objectFit: 'cover',
                    }}
                  />
                  <Markdown className="font-semibold">
                    {message.message}
                  </Markdown>
                </div>
              </Card>
            </div>
          ))}
        </div>
        <div className="flex gap-3 w-full">
          <input
            type="text"
            name=""
            id=""
            value={message}
            className="border-2 border-black rounded-md p-1 px-3 w-full"
            placeholder="Send Query ..."
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader /> : 'Submit'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
