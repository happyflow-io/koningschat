import { ref } from 'vue'

interface Message {
  id: number
  sender: string
  text: string
  sources?: Array<{title: string, url: string}>
  isStreaming?: boolean
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
      // Create bot message for streaming
      const botMessage: Message = {
        id: Date.now() + 1,
        sender: 'Bot',
        text: '',
        isStreaming: true
      }
      
      messages.value.push(botMessage)
      isLoading.value = false
      
      // Start fetch streaming
      const response = await fetch('http://localhost:3001/api/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      
      if (!reader) {
        throw new Error('No response body')
      }
      
      while (true) {
        const { done, value } = await reader.read()
        
        if (done) break
        
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              
              if (data.type === 'chunk') {
                botMessage.text += data.content
                // Force reactivity
                messages.value = [...messages.value]
              } else if (data.type === 'sources') {
                botMessage.sources = data.sources
              } else if (data.type === 'end') {
                botMessage.isStreaming = false
                return
              } else if (data.type === 'error') {
                botMessage.text = data.error
                botMessage.isStreaming = false
                return
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
      
    } catch (error) {
      console.error('Chat error:', error)
      isLoading.value = false
      
      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: 'Bot',
        text: 'Sorry, er ging iets mis met de verbinding. Probeer het opnieuw.'
      }
      
      messages.value.push(errorMessage)
    }
  }

  return {
    messages,
    currentMessage,
    isLoading,
    sendMessage
  }
}
