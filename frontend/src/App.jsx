import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'

import { Navbar } from './component/navbar'
import { HomePage } from './pages/HomePage'
import { SignUpPage } from './pages/SignUpPage'
import { LoginPage } from './pages/LoginPage'
import { SettingsPage } from './pages/SettingsPage'
import { ProfilePage } from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from './store/useThemeStore'


import {Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast'


function App() {
  const {theme} = useThemeStore();
  const {checkAuth, authUser, isCheckingAuth} = useAuthStore();

  useEffect(()=> {
    checkAuth()
  }, [checkAuth])
  

  if (isCheckingAuth && !authUser) {
    return(
      <div className='flex justify-center items-center h-screen'>
        <Loader className='animate-spin size-10'/>
      </div>
    )
  } 

  return (
    <div data-theme={theme} className='p-8 w-screen h-full'>
      <Navbar/>
      <Routes>
          <Route path='/' element={ authUser? <HomePage/> : <Navigate to='/login'/> }/>
          <Route path='/signup' element={ !authUser? <SignUpPage/> : <Navigate to='/'/> }/>
          <Route path='/login' element={ !authUser? <LoginPage/> : <Navigate to='/'/> }/>
          <Route path='/settings' element={<SettingsPage/> }/>
          <Route path='/profile' element={ authUser? <ProfilePage/> : <Navigate to='/login'/> }/>
      </Routes>
      <Toaster
    position="bottom-center"
    reverseOrder={false}
      />
    </div>
     
  )
}

export default App
