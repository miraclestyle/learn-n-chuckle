import { useState } from 'react'
import { imageGenerator } from '@/services'
import { useMutation } from '@tanstack/react-query'

const useImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const mutationFn = async (prompt: string) => {
    const result = await imageGenerator(prompt)
    if (result.length === 0) return null
    setImageUrl(result)
    return result
  }

  const { mutateAsync: generateImage, isPending: isGeneratingImage } =
    useMutation({
      mutationFn,
    })

  return {
    imageUrl,
    generateImage,
    isGeneratingImage,
  }
}

export default useImageGenerator
