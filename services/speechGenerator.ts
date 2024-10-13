'use server'

import { generateSpeach } from './elevenLabsClient'
import { saveFile } from '@/services/supabaseClient'

const removeBrackets = (text: string): string =>
  text.replace(/[\[\(].*?[\]\)]|\*\*.*?\*\*/g, '')

const speechGenerator = async (text: string): Promise<string> => {
  const formattedText = removeBrackets(text)
  const file = await generateSpeach(formattedText)
  const filePath = await saveFile(file)
  return filePath
}

export default speechGenerator
