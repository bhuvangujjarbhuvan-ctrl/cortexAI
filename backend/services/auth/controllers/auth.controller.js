import { getAuth } from "firebase-admin/auth"
import { app } from "../config/firebase.js"
import User from "../models/user.model.js"
import redis from "../../../shared/redis/redis.js"
import crypto from "crypto"

export const login = async (req, res) => {
  try {
    const { token } = req.body
    const decoded = await getAuth(app).verifyIdToken(token)
    let user = await User.findOne({
      firebaseUid: decoded.uid
    })

    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture
      })
    }

    const sessionId = crypto.randomUUID()
    await redis.set(`session-${sessionId}`, JSON.stringify({ userId: user._id, name: user.name, email: user.email, avatar: user.avatar }), "EX", 7 * 24 * 60 * 60)



    // Storing the session in Redis (User ID as value)
    await redis.set(sessionId, user._id.toString())

    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: false, // Since he is running locally
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.status(200).json(user)
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export const logout = async (req, res) => {
  try {
    const sessionId = req.cookies?.session
    await redis.del(`session-${sessionId}`)
    res.clearCookie("session")
    res.status(200).json({ message: "Logout successful" })
  } catch (error) {
    console.error("Logout error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}