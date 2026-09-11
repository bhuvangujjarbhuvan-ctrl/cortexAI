import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth, googleProvider, browserPopupRedirectResolver } from '../utils/firebase'
import { signInWithPopup } from 'firebase/auth'

import Home from './pages/Home'
import getCurrentUser from './features/getCurrent.User.js'
import { setUserdata } from './redux/userSlice.js'

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    const getUser = async () => { 
      const data = await getCurrentUser() 
      dispatch(setUserdata(data))
    }
    getUser()
  }, [])
  return (
    <>
      <Home />
    </>
  )
}

export default App