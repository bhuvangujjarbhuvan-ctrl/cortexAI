import { StateGraph } from "@langchain/langgraph";
import { router } from "./router";
import { chatAgent } from "../agents/chat.agent";
import { codingAgent } from "../agents/coding.agent";
import { visionAgent } from "../agents/vision.agent";
import { pptAgent } from "../agents/ppt.agent";
import { pdfAgent } from "../agents/pdf.agent";
import { searchAgent } from "../agents/search.agent";

const workflow= new StateGraph(agentState)

workflow.addNode("router",router)
workflow.addNode("chat",chatAgent)
workflow.addNode("coding",codingAgent)
workflow.addNode("vision",visionAgent)
workflow.addNode("ppt",pptAgent)
workflow.addNode("pdf",pdfAgent)
workflow.addNode("search",searchAgent)

workflow.addEdge("__start__","router")

workflow.addConditionalEdges("router",(state)=>{
    switch (state.agent){
        case "chat":
            return "chat";

        case "coding":
            return "coding";

        case "vision":
            return "vision";

        case "ppt":
            return "ppt";

        case "pdf":
            return "pdf";

        case "search":
            return "search";

        default:
            return "chat";
    }
},{
    chat:"chat",
    coding:"coding",
    vision:"vision",
    ppt:"ppt",
    pdf:"pdf",
    search:"search"
}
)

workflow.addEdge("search","chat")
workflow.addEdge("chat","__end__")
workflow.addEdge("coding","__end__")
workflow.addEdge("vision","__end__")
workflow.addEdge("ppt","__end__")
workflow.addEdge("pdf","__end__")

export const graph=workflow.compile()