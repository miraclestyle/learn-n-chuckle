import { useState } from 'react'
import { textGenerator, type IPrompt } from '@/services'
import { useMutation } from '@tanstack/react-query'

const useTextGenerator = () => {
  const [message, setMessage] = useState<string | null>(null)

  const mutationFn = async (input: IPrompt) => {
    const { topic, format } = input
    const result = await textGenerator(topic, format)
    setMessage(result)
    return result
  }

  const { mutateAsync: generateMessage, isPending: isGenerating } = useMutation(
    {
      mutationFn,
    },
  )

  return {
    message,
    generateMessage,
    isGenerating,
  }
}

export default useTextGenerator
