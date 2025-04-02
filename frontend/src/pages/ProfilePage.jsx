import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera, Mail, User } from 'lucide-react'
import profile from '../assets/profile.png'

export const ProfilePage = () => {

    const {authUser, UpdateProfile, isUpdatingProfile} = useAuthStore()
    const [selectedImg, setSelectedImage] = useState(null);
    

    const handleImageUpload = async(e) => {
        const file = e.target.files[0]
        if(!file) return; 

        const reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onload= async() => {
            const base64Image = reader.result
            setSelectedImage(base64Image);
            await UpdateProfile({profilePic: base64Image})
        }

    }

  return (
    <div className="pt-10">
    <div className="max-w-2xl mx-auto p-4 py-8">
      <div className="bg-base-300 rounded-xl p-6 space-y-8">
        <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={ selectedImg || authUser.profilePic || profile}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>


           <div>
                <div className='flex items-center text-sm gap-1'>
                    <User className='w-4'/>
                    <p>Name</p>
                </div>
                <div className='flex p-2 mt-2 border-solid border-2 border-primary/20 rounded-md '>{authUser.name}</div>
           </div>
          
           <div>
                <div className='flex items-center text-sm gap-1'>
                    <Mail className='w-4'/>
                    <p>Email</p>
                </div>
                <div className='flex p-2 mt-2 border-solid border-2 border-primary/20 rounded-md '>{authUser.email}</div>
           </div>


      
      </div>
    </div>
  </div>
  )
}
