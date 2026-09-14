import { getModel } from "../config/llmModels"

export const router=async(state)=>{
    const llm=await getModel("router")
    const prompt=`you are an agent router.
    
    Available Agents:
    1. chat
    2. coding
    3. vision
    4. ppt
    5. pdf
    6. search

    Rules:

    chat:
    General conversation,
    explanation,
    learning,
    questions.

    search:
    current events,
    latest informations,
    news, 
    recent development,
    internet loopkup.

    coding:
    Code generation
    code debugging
    code explanation
    code optimization

    ppt:
    Presentation creation
    slide generation
    content organization
    design suggestion

    pdf:
    Document summarization
    text extraction
    content analysis
    information retrieval from PDF

    vision:
    Image analysis
    object detection
    image interpretation
    visual question answering
    generate images
    create images

    return only one word:
    chat
    search
    coding
    pdf
    ppt
    vision


    user Query:
    ${state.prompt}
    `
    const response= await llm.invoke(prompt)
    console.log(response)
    return {...state,agent: response.content.trim().toLowerCase()}
}