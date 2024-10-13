'use server'

import { IMessage } from './interfaces'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

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

export const generateText = async (message: IMessage): Promise<string> => {
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

export const generateImage = async (prompt: string): Promise<string> => {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1024x1024",
  });

  const content = response.data[0].url || '';
  return content
}