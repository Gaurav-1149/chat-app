import { Image, Send, X } from 'lucide-react'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useChatStore } from '../store/useChatStore';

                                          
export const InputMessage = () => {    
    
    const[text, setText] = useState("");
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null)
    const {sendMessage} = useChatStore();

    const handleImageChange= (e)=> {
        const file = e.target.files[0]
        if(!file.type.startsWith('image/')){
            toast.error('Please select an image')
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
    }

        const removeImage = () => {
            setImagePreview(null);
            if(fileInputRef.current) fileInputRef.current.value = "";
          }

        const handleSendMessages = async(e) => {
            e.preventDefault();
            if (!text.trim() && !imagePreview) return;

            try {
                await sendMessage({
                  text: text.trim(),
                  image: imagePreview,
                });
          
                setText("");
                setImagePreview(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              } catch (error) {
                console.error("Failed to send message:", error);
              }

        }
    
  return (

    <div>

        {imagePreview && (
            <div className="mb-3 flex items-center gap-2">
            <div className="relative">
                <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                />
                <button
                onClick={removeImage}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
                flex items-center justify-center"
                type="button"
                >
                <X className="size-3" />
                </button>
            </div>
            </div>
        )}

    <div className='p-2 flex min-w-full justify-between gap-4 '>
        <form  className='flex items-center w-full gap-4'>
            <input 
            className='p-2 rounded-full w-full bg-transparent border-base-300 border-2 '
            type="text"
            placeholder='Type a message...'
            value={text}
            onChange={(e) => setText(e.target.value)}
            onSubmit={handleSendMessages}
            />

            <label htmlFor="image-upload">
            <input type="file"
            id='image-upload'
            className='hidden'
            accept="image/*"
            onChange={handleImageChange}
            />
            <Image onClick={() => fileInputRef.current?.click()}/>
            </label>
            
            
        </form>
       <button
            type='submit'
           
           onClick={handleSendMessages}
            >
                <Send/>
            </button>
    </div>
 
                </div>
  )
}
