import { useState } from 'react'
import { speechGenerator } from '@/services'
import { useMutation } from '@tanstack/react-query'

const useSpeachGenerator = () => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  const resetUrl = () => setAudioUrl(null)

  const mutationFn = async (text: string) => {
    const result = await speechGenerator(text)
    setAudioUrl(result)
    return result
  }

  const { mutateAsync: generateSpeech, isPending: isGeneratingSpeech } =
    useMutation({
      mutationFn,
    })

  return {
    audioUrl,
    generateSpeech,
    isGeneratingSpeech,
    resetUrl,
  }
}

export default useSpeachGenerator
