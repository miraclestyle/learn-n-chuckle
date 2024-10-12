'use server'

import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

import { IMessage, ContentFormat } from './interfaces'

const generateLessonContent = (topic: string): string =>
  `Create a lesson with catchy punchlines using nerdy technology terms and jargons that rhyme, for a topic titled ${topic}, in 80 to 100 words.`

const generateMemeContent = (topic: string): string =>
  `Create a meme using nerdy technology terms and jargons, for a topic titled ${topic}, in 90 to 110 words.`

const generateUserContent = (
  topic: string,
  contentFormat: ContentFormat,
): string => {
  switch (contentFormat) {
    case ContentFormat.Lesson:
      return generateLessonContent(topic)
    case ContentFormat.Meme:
      return generateMemeContent(topic)
    default:
      throw new Error('Invalid content type')
  }
}

const generateMessage = (content: string): IMessage => ({
  role: 'user',
  content,
})

const getLastAssistantTextMessage = async (threadId: string) => {
  const messages = await openai.beta.threads.messages.list(threadId)
  const assistantMessages = messages.data.filter(
    (message) => message.role === 'assistant',
  )
  const lastAssistantMessage = assistantMessages.pop()
  if (lastAssistantMessage?.content[0].type !== 'text') {
    throw new Error(
      `Last message is not text. Message type: ${lastAssistantMessage?.content[0].type}`,
    )
  }
  return lastAssistantMessage.content[0].text.value
}

const sendRequest = async (message: IMessage): Promise<string> => {
  if (!process.env.ASSISTANT_ID) {
    throw new Error('Missing Assistant ID')
  }

  const assistant = { assistant_id: process.env.ASSISTANT_ID }
  const thread = await openai.beta.threads.create({ messages: [message] })
  const run = await openai.beta.threads.runs.createAndPoll(thread.id, assistant)

  if (run.status !== 'completed') {
    throw new Error(`Run status is not completed. Status: ${run.status}`)
  }

  const content = await getLastAssistantTextMessage(thread.id)
  return content
}

const textGenerator = async (
  topic: string,
  contentFormat: ContentFormat,
): Promise<string> => {
  const userContent = generateUserContent(topic, contentFormat)
  const message = generateMessage(userContent)
  const result = await sendRequest(message)
  return result
}

export default textGenerator
