import { Annotation } from "@langchain/langgraph";
import { conversation } from "../../chat/controllers/chat.controller.js";


export const agentState = Annotation.Root({
    prompt: Annotation(),
    aiResponse: Annotation(),
    agent: Annotation(),
    conversationId: Annotation()
})