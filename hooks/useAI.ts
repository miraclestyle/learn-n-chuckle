import { useTextGenerator, useSpeechGenerator, useImageGenerator } from '.'
import { useState } from 'react'
import { IPrompt, ContentFormat } from '@/services'

const useAI = () => {
  const [audio, setAudio] = useState<string | null>(null)
  const { text, generateText, isGeneratingText } = useTextGenerator()
  const { audioUrl, generateSpeech, isGeneratingSpeech } = useSpeechGenerator()
  const {
    imageUrl: image,
    generateImage,
    isGeneratingImage,
  } = useImageGenerator()

  const playAudio = () => {
    setAudio(audioUrl)
  }

  const stopAudio = () => {
    setAudio(null)
  }

  const generate = async (data: IPrompt) => {
    const { format } = data
    const content = await generateText(data)
    if (format === ContentFormat.VisualMeme) {
      await generateImage(content)
    } else {
      // await generateSpeech(content)
    }


  }

  const isGenerating =
    isGeneratingText || isGeneratingSpeech || isGeneratingImage

  return {
    text,
    image,
    audio,
    isGenerating,
    isGeneratingText,
    isGeneratingSpeech,
    isGeneratingImage,
    playAudio,
    stopAudio,
    generate,
  }
}

export default useAI
