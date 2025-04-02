import React from 'react'
import { useChatStore } from '../store/useChatStore'
import profile from '../assets/profile.png'
import { X } from 'lucide-react';



export const ChatHeader = () => {
    const {selectedUser, setSelectedUser} = useChatStore();
  return (
        <div className='flex items-center justify-between w-full pr-4'>
            
            <div className='flex flex-col py-3 justify-start w-60 '>
                
                    <div className='flex items-center px-4 py-3'>
                        <img 
                        className='rounded-full w-10 h-10 flex justify-center items-center text-primary-content' 
                        src={selectedUser.profilePic || profile}
                        />
                        <div className='flex flex-col items-start px-2 '>
                            <div>{selectedUser.name}</div>
                            <div className='text-xs font-light'>Online</div>
                        </div>
                    </div>
            </div>
            <X onClick={() => setSelectedUser(null)}/>
        </div>
  )
}
