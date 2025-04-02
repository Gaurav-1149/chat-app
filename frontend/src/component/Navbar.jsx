import React from 'react'

import {useAuthStore} from '../store/useAuthStore' 
import { LogOut, MessageSquare, Settings, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useChatStore } from '../store/useChatStore'


export const Navbar = () => {

    const {Logout, authUser} = useAuthStore()
    const {setSelectedUser} = useChatStore()




  return (
    <div className='flex justify-between items-center'>
        <Link to='/' className='flex gap-1 items-center '>
            <div className=' rounded-xl bg-primary/10 flex justify-center items-center group-hover:bg-primary/20 transition-colors'>
            <MessageSquare className='text-primary size-6'/>
            </div>
            Chatty
        </Link>
        <div className='flex gap-7'>
            <Link to='/settings' className='flex gap-1'>
                <Settings/>
                Settings
            </Link>
            {authUser? 
            <div className='flex gap-7'>
                <Link to='/profile' className='flex gap-1'>
                    <UserRound/>
                    Profile
                </Link>
                <button className='flex gap-1' onClick={Logout}>
                    <LogOut />
                    Logout
                </button>
            </div> : '' }
            
        </div>
    </div>
  )
}
  