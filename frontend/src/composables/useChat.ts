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

  const typewriterEffect = (message: Message, fullText: string, sources?: Array<{title: string, url: string}>) => {
    return new Promise<void>((resolve) => {
      let currentIndex = 0
      message.isStreaming = true
      
      const typeNextChar = () => {
        if (currentIndex < fullText.length) {
          // Force reactivity by creating new string reference
          message.text = fullText.substring(0, currentIndex + 1)
          // Trigger reactivity manually
          messages.value = [...messages.value]
          currentIndex++
          setTimeout(typeNextChar, 50)
        } else {
          message.isStreaming = false
          message.sources = sources
          // Final reactivity trigger
          messages.value = [...messages.value]
          resolve()
        }
      }
      
      // Start immediately
      typeNextChar()
    })
  }

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
      
      // Stop loading and create bot message for streaming
      isLoading.value = false
      
      const botMessage: Message = {
        id: Date.now() + 1,
        sender: 'Bot',
        text: '',
        isStreaming: true
      }
      
      messages.value.push(botMessage)
      
      // Start typewriter effect
      await typewriterEffect(botMessage, data.response, data.sources)
      
    } catch (error) {
      console.error('Chat error:', error)
      isLoading.value = false
      
      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: 'Bot',
        text: '',
        isStreaming: true
      }
      
      messages.value.push(errorMessage)
      await typewriterEffect(errorMessage, 'Sorry, er ging iets mis met de verbinding. Probeer het opnieuw.')
    }
  }

  return {
    messages,
    currentMessage,
    isLoading,
    sendMessage
  }
}
