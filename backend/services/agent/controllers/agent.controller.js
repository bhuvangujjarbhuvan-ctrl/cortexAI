import axios from "axios"
import { graph } from "../graph/graph"
import { conversation } from "../../chat/controllers/chat.controller"

export const agent = async(req, res)=>{
    try{
        const {prompt,conversationID}=req.body
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`,{conversationId,role:"user",content:prompt})
        const result = await graph.invoke({
            prompt,
            conversationId
        })
        result.aiResponse
        return res.status(200).json(responce)
    }
        catch(error){
            return res.status(500).json({message:`agent error ${error}`})
        }
    }