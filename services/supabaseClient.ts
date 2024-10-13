import { createClient } from '@supabase/supabase-js'
import { Readable } from 'stream'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_STORAGE = process.env.SUPABASE_STORAGE
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET
const SUPABASE_KEY = process.env.SUPABASE_KEY

const supabaseIsAvailable =
  SUPABASE_URL !== undefined &&
  SUPABASE_STORAGE !== undefined &&
  SUPABASE_BUCKET !== undefined &&
  SUPABASE_KEY !== undefined

const supabase = supabaseIsAvailable
  ? createClient(SUPABASE_URL!, SUPABASE_KEY!)
  : null

const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  const chunks: Buffer[] = []
  for await (const chunk of stream) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

export const saveFile = async (file: Readable) => {
  if (!supabaseIsAvailable) throw new Error('Supabase is not available')
  const fileName = `speech_${Date.now()}.mp3`
  const fileBuffer = await streamToBuffer(file)
  const { data, error } = await supabase!.storage
    .from(SUPABASE_BUCKET)
    .upload(fileName, fileBuffer, {
      cacheControl: '3600',
      upsert: false,
    })
  if (error) throw error
  return `${SUPABASE_STORAGE}/${data.fullPath}`
}
