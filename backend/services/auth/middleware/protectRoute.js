import redis from "../../../shared/redis/redis.js";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const sessionId = req.cookies?.sessionId;
    
    if (!sessionId) {
      return res.status(401).json({ message: "Unauthorized: No session provided" });
    }

    const userId = await redis.get(`session:${sessionId}`);
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Invalid or expired session" });
    }

    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
