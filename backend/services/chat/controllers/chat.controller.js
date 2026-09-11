export const conversation = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        console.log("userID: ", userId)
        const conversation = await Conversation.create({
            userId: userId
        })
        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json({ message: `conversation error ${error}` })
    }
}

export const getConversations = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        console.log("userID: ", userId)
        const conversation = await Conversation.find({
            userId: userId
        }).sort({ updatedAt: -1 })

        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json({ message: `get conversation error ${error}` })
    }
}

