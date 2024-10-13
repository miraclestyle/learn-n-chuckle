'use server'

import { ElevenLabsClient } from 'elevenlabs'
import { Readable } from 'stream'

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
})

export const generateSpeach = async (text: string): Promise<Readable> => {
  const audio = await client.generate({
    text,
    voice: 'George',
    model_id: 'eleven_turbo_v2_5',
    voice_settings: {
      stability: 0.3,
      similarity_boost: 0.7,
      style: 1.0,
      use_speaker_boost: true,
    },
  })

  return audio
}
