import { MessageSquare } from 'lucide-react'
import React from 'react'

export const NoChatSelected = () => {
  return (
    <div className='flex flex-col gap-2  justify-center items-center'>
        <MessageSquare className='text-primary size-8'/>
        <h3>
            Welcome to Chatty!
        </h3>
        <p>Select a conversation from the sidebar to start chatting</p>
    </div>
  )
}
