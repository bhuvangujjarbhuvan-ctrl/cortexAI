import React, { useEffect } from 'react'
import { auth, googleProvider, browserPopupRedirectResolver } from '../utils/firebase'
import { signInWithPopup } from 'firebase/auth'

import Home from './pages/Home'
import getCurrentUser from './features/getCurrent.User.js'

function App() {
  useEffect(() => {
    const getUser = async () => { await getCurrentUser() }
    getUser()
  }, [])
  return (
    <>
      <Home />
    </>
  )
}

export default App