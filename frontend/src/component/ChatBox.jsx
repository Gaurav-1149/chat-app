import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import ProfilePic from '../assets/profile.png'


export const ChatBox = () => {

    const {messages, selectedUser, isMessagesLoading, getMessages, subscribeToMessages, unsubscribeToMessages} = useChatStore();
        const {authUser} = useAuthStore();
        const msgEndRef = useRef(null);
        
        
        useEffect(() => {
             getMessages(selectedUser._id)
             subscribeToMessages()

             return() => unsubscribeToMessages();
        }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeToMessages])

        useEffect(() => {
            if(msgEndRef.current && messages) {
                msgEndRef.current.scrollIntoView({behavior:'smooth'});
            }
        }, [messages])
        

  return (

    <div className='flex  p-4 space-y-4 overflow-y-scroll flex-col '>
                {messages.map((message) => (
                    
                    
                    <div 
                    key={message._id}   
                    className={`chat ${message.senderId ===authUser._id? 'chat-end' : 'chat-start'}`}
                    ref={msgEndRef}
                    >
                        
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    src= {message.senderId ===authUser._id? authUser.profilePic || ProfilePic : selectedUser.profilePic || ProfilePic}/>
                            </div>
                        </div>
                        {message.image && (
                            <img src={message.image} alt="Attachment" className='rounded-xl h-20 w-auto my-1'/>
                        )}
                            {message.text && (
                        <div className="chat-bubble text-wrap">
                                <p>{message.text}</p>
                        </div>
                                )}
                        
                    </div>
                ))}
            </div>
)
}
