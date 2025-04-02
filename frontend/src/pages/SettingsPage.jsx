import React from 'react'
import { THEMES } from '../constant'
import { useThemeStore } from '../store/useThemeStore'

const PREVIEW_MESSAGES =  [
    {id:1, content: "Hey, How's it going", isSent:false },
    {id:2, content: "I'm doing great! Just working on some new features.", isSent:true }
 ]

export const SettingsPage = () => {

    

    const{theme, setTheme} = useThemeStore()

  return (
    <div className="pt-5">
        <div className="max-w-6xl mx-auto p-4 py-8">
            <div className='flex flex-col justify-start items-start'>
            <div className='text-xl font-bold'>Theme</div>
            <div className='text-sm font-light'>Choose a theme for your chat interface</div>
            </div>
            <div className='grid grid-cols-8 grid-rows-4 pt-8 gap-5'>

                {THEMES.map((e) => (
                    <button
                        key={e}
                        className={`p-2 rounded-xl ${theme===e? "bg-base-300" : "hover:bg-base-200"} `}
                        onClick={() => setTheme(e)}
                    >
                        <div className='h-8 rounded w-full overflow-hidden relative ' data-theme={e}>
                            <div className='flex justify-evenly gap-px p-1  '>
                                <div className='rounded bg-primary w-6 h-6'></div>
                                <div className='rounded bg-secondary w-6 h-6'></div>
                                <div className='rounded bg-accent w-6 h-6'></div>
                                <div className='rounded bg-neutral w-6 h-6'></div>
                            </div>
                        </div>
                        <div>
                            <span>
                                {e.charAt(0).toUpperCase() + e.slice(1)}
                            </span>
                        </div>
                    </button>
                ))}
               
            </div>

            <div>

            <div className='text-xl font-bold flex justify-start py-3 '>Preview</div>
            <div className='bg-base-300 h-auto w-full rounded-xl py-4 flex justify-center items-center '>
                <div className='p-4 bg-base-200 w-1/2 rounded-xl'>
                    <div className='flex items-center p-2'>
                        <div className='rounded-full bg-primary w-10 h-10 flex justify-center items-center text-primary-content'>
                            J
                        </div>
                        <div className='flex flex-col items-start px-2 '>
                            <div>John Doe</div>
                            <div className='text-sm font-light'>Online</div>
                        </div>
                    </div>
                    <div className='gap-2'>
                        <div className='bg-base-300 m-2 max-w-[80%] w-fit  p-3 rounded-xl flex flex-col gap-1 items-start '>
                            <div>
                            {PREVIEW_MESSAGES[0].content}
                            </div>
                            <div className='text-xs'>
                                12:00 PM
                            </div>
                        </div>
                        
                        <div className='flex justify-end'>
                            <div className='bg-primary text-primary-content m-2 max-w-[80%] w-fit  p-3 rounded-xl flex flex-col gap-1 items-end '>
                                <div>
                                {PREVIEW_MESSAGES[1].content}
                                </div>
                                <div className='text-xs'>
                                    12:00 PM
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>send</div>
                </div>
            </div>
            </div>

        </div>
    </div>
  )
}
