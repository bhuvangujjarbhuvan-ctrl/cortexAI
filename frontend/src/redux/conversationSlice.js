import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
    name:"conversation",
    initialState:{
        conversations:[],

    },
    reducers:{
        setConversations:(state,action)=>{
            state.conversations=action.payload
        },
        addCoversation:(state,action)=>{
            state.conversations.unshift(action.payload)
        }

    }
})
export const{setConversations, addCoversation} = conversationSlice.actions
export default conversationSlice.reducer