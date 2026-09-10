import React from 'react'
import { auth, googleProvider, browserPopupRedirectResolver } from '../../utils/firebase'
import { signInWithPopup } from 'firebase/auth'
import api from '../../utils/axios'
import { FaGoogle } from "react-icons/fa";

function Home() {
    const handleLogin = async (token) => {
        try {
            const { data } = await api.post('/auth/login', { token }, { withCredentials: true })
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
        <div className='h-screen flex bg-[#0d0f14] text-white overflow-hidden'>
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur'>
                <div className='w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-[17px] font-semibold text-slate-100 tracking-tight'>welcome to cortexAI</h2>
                        <p className='text-[13px] text-slate-500'>please login to continue using the app.</p>
                    </div>
                    <button className='w-full flex items-center justify-center gap-3 py-[11px] rounded-xl text-sm font-medium text-black/90 bg-white 
                    hover:bg-gray-200 transition-all duration-150 cursor-pointer' onClick={googleLogin}>
                        <FaGoogle size={15} />
                        continue with google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home