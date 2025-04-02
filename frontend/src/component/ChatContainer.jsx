import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { ChatHeader } from './ChatHeader';
import { InputMessage } from './InputMessage';
import { ChatBox } from './ChatBox';

export const ChatContainer = () => {

    
    
  return (
    

    <div className='flex flex-col justify-between h-full'>
       <ChatHeader/>
        <ChatBox/>
        <div>

            <InputMessage/>
        
        </div>
       
    </div>
  )
}
