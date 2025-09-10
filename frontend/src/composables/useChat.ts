import { ref } from 'vue'

interface Message {
  id: number
  sender: string
  text: string
}

export function useChat() {
  const messages = ref<Message[]>([
    { id: 1, sender: 'Bot', text: 'Hallo! Ik kan vragen beantwoorden over de Koningsspelen.' }
  ])
  
  const currentMessage = ref('')
  const isLoading = ref(false)

  const sendMessage = async () => {
    if (!currentMessage.value.trim() || isLoading.value) return
    
    // Add user message
    messages.value.push({
      id: Date.now(),
      sender: 'Jij',
      text: currentMessage.value
    })
    
    const userMessage = currentMessage.value
    currentMessage.value = ''
    isLoading.value = true
    
    try {
      // Call Hono backend
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      messages.value.push({
        id: Date.now() + 1,
        sender: 'Bot',
        text: data.response
      })
    } catch (error) {
      console.error('Chat error:', error)
      messages.value.push({
        id: Date.now() + 1,
        sender: 'Bot',
        text: 'Sorry, er ging iets mis met de verbinding. Probeer het opnieuw.'
      })
    } finally {
      isLoading.value = false
    }
  }

  return {
    messages,
    currentMessage,
    isLoading,
    sendMessage
  }
}
