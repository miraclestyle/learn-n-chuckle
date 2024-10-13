import { useState } from 'react'
import { textGenerator, type IPrompt } from '@/services'
import { useMutation } from '@tanstack/react-query'

const useTextGenerator = () => {
  const [text, setText] = useState<string | null>(null)

  const mutationFn = async (input: IPrompt) => {
    const { topic, format, length } = input
    const result = await textGenerator(topic, format, length)
    setText(result)
    return result
  }

  const { mutateAsync: generateText, isPending: isGeneratingText } =
    useMutation({
      mutationFn,
    })

  return {
    text,
    generateText,
    isGeneratingText,
  }
}

export default useTextGenerator
