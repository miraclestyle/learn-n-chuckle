'use server'
import { ElevenLabsClient } from 'elevenlabs'
import { Readable } from 'stream'

import { saveFile } from '@/services/supabaseClient'

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
})

const removeBrackets = (text: string): string =>
  text.replace(/[\[\(].*?[\]\)]|\*\*.*?\*\*/g, '')


const sendRequest = async (text: string): Promise<Readable> => {
  const audio = await client.generate({
    text,
    voice: 'George',
    model_id: 'eleven_turbo_v2_5',
    voice_settings: {
      stability: 0.4,
      similarity_boost: 0.7,
      style: 0.7,
      use_speaker_boost: true,
    },
  })

  return audio
}

const speechGenerator = async (text: string): Promise<string> => {
  const formattedText = removeBrackets(text)
  const file = await sendRequest(formattedText)
  const filePath = await saveFile(file)
  return filePath
}

export default speechGenerator
