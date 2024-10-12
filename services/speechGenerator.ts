'use server'
import { ElevenLabsClient } from 'elevenlabs'
import { writeFile } from 'fs/promises'
import { Readable } from 'stream'

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
})

const removeBrackets = (text: string): string =>
  text.replace(/[\[\(].*?[\]\)]|\*\*.*?\*\*/g, '')

const saveFile = async (file: Readable) => {
  const fileName = `speech_${Date.now()}.mp3`
  const filePath = `${process.env.AUDIO_DIR}/${fileName}`
  await writeFile(filePath, file, 'binary')
  return filePath
}

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
