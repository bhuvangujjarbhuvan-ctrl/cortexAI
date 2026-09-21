import api from "../../utils/axios"

export const createConversation = async()=>{
    try{
        const {data}=await api.get('/api/chat/create-coverstion')
        return data
    }
    catch(error){
        console.log(error)
        return []
    }
}
    