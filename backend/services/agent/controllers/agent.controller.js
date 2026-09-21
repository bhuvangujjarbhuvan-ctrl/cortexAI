import axios from "axios"
import { graph } from "../graph/graph.js"

export const agent = async(req, res)=>{
    try{
        const {prompt,conversationID}=req.body
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`,{conversationId: conversationID,role:"user",content:prompt})
        const result = await graph.invoke({
            prompt,
            conversationId: conversationID
        })
        return res.status(200).json(result.aiResponse)
    }
        catch(error){
            return res.status(500).json({message:`agent error ${error}`})
        }
    }