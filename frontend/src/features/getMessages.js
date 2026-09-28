import api from '../../utils/axios.js'

async function getMessages(id) {
try {
      const {data}=await api.post(`/api/chat/get-messages/${id}`)
      return data
} catch (error) {
    console.log(error)
    return []
}
}

export default getMessages