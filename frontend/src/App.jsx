import React from 'react'
import { auth, googleProvider, browserPopupRedirectResolver } from '../utils/firebase'
import { signInWithPopup } from 'firebase/auth'

import Home from './pages/Home'

function App() {

  return (
    <>
      <Home />
    </>
  )
}

export default App