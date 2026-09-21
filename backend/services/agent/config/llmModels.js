import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

let groq;
let gemini;

export const getModel = async(agent)=>{
    if(!groq){
        groq = new ChatGroq({
            model: "llama-3.1-70b-versatile", // Using a valid open source model for Groq
            temperature: 0,
            maxTokens: undefined,
            maxRetries: 2,
        })
    }
    if(!gemini){
        gemini = new ChatGoogleGenerativeAI({
            model: "gemini-1.5-pro",
            temperature: 0,
            maxRetries: 2,
        })
    }

    switch (agent){
        case "chat":
            return groq;
        case "coding":
            return gemini;
        case "vision":
            return gemini;
        case "ppt":
            return gemini;
        case "pdf":
            return groq;
        case "search":
            return groq;
        default:
            return groq;
    }
}

