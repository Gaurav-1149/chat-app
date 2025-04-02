import { Users } from 'lucide-react'
import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import profile from '../assets/profile.png'


export const Sidebar = () => {

    const {users, getUsers, selectedUser, setSelectedUser, isUsersLoading} = useChatStore()

    useEffect(()=> {
        getUsers()
    },[getUsers])

  return (
    <div className='h-full w-1/3 py-6 pl-6 overflow-y-scroll'>
        <div className='flex gap-2'>
            <Users/>
            <p className='font-bold'>Contacts</p>
        </div>
            <div className='flex flex-col py-3 justify-start  '>
                {users.map((user) => (
                    <button
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className={` flex items-center rounded-xl ${selectedUser=== user ? 'bg-base-200' : ""}`}
                    >
                    <div className='flex items-center px-4 py-3'>
                        <img 
                        className='rounded-full w-10 h-10 flex justify-center items-center text-primary-content' 
                        src={user.profilePic || profile}
                        />
                        <div className='flex flex-col items-start px-2 '>
                            <div>{user.name}</div>
                            <div className='text-xs font-light'>Online</div>
                        </div>
                    </div>
                    </button>
                ))}
            </div>
    </div>
  )
}
