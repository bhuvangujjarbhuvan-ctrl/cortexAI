import React from 'react'
import { auth, googleProvider, browserPopupRedirectResolver } from '../utils/firebase'
import { signInWithPopup } from 'firebase/auth'
import axios from 'axios'

function App() {

  const handleLogin = async (token) => {
    try {
      const { data } = await axios.post('http://localhost:8000/auth/google', { token }, { withCredentials: true })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const googleLogin = async () => {
    // Pass browserPopupRedirectResolver to avoid COOP window.closed error
    const data = await signInWithPopup(auth, googleProvider, browserPopupRedirectResolver)
    const token = await data.user.getIdToken()
    console.log(token)                         // Firebase ID token ✅
     await handleLogin(token)
    console.log(data)                          // UserCredentialImpl ✅
  };

  return (
    <div className='w-full h-screen bg-black flex items-center justify-center'>
      <button className='w-50 h-24 bg-white' onClick={googleLogin}>
        continue with google
      </button>
    </div>
  )
}

export default App