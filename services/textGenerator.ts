'use server'

import { generateText } from './openaiClient'

import { IMessage, ContentFormat, ContentLength } from './interfaces'

const generateContentLength = (contentLength: ContentLength): string => {
  switch (contentLength) {
    case ContentLength.Long:
      return '80 to 100 words'
    case ContentLength.Standard:
      return '60 to 80 words'
    case ContentLength.Short:
      return '40 to 60 words'
    default:
      throw new Error('Invalid content length')
  }
}

const generateLessonContentTopic = (topic: string): string =>
  `Create a lesson with catchy punchlines using nerdy technology terms and jargons that rhyme, for a topic titled ${topic}, in`

const generatePoemContentTopic = (topic: string): string =>
  `Create a poem with catchy punchlines using nerdy technology terms and jargons that rhyme, for a topic titled ${topic}, in`

const generateMemeContentTopic = (topic: string): string =>
  `Create a meme using nerdy technology terms and jargons, for a topic titled ${topic}, in`

const generateVisualMemeContentTopic = (topic: string): string =>
  `Create a description of a visual meme using nerdy technology terms and jargons, for a topic titled ${topic}, in 60 to 80 words`


const generateUserContent = (
  topic: string,
  contentFormat: ContentFormat,
  contentLength: ContentLength,
): string => {
  switch (contentFormat) {
    case ContentFormat.Lesson:
      return `${generateLessonContentTopic(topic)} ${generateContentLength(contentLength)}`
    case ContentFormat.Poem:
      return `${generatePoemContentTopic(topic)} ${generateContentLength(contentLength)}`
    case ContentFormat.Meme:
      return `${generateMemeContentTopic(topic)} ${generateContentLength(contentLength)}`
    case ContentFormat.VisualMeme:
      return generateVisualMemeContentTopic(topic)
    default:
      throw new Error('Invalid content type')
  }
}

const generateMessage = (content: string): IMessage => ({
  role: 'user',
  content,
})

const textGenerator = async (
  topic: string,
  contentFormat: ContentFormat,
  contentLength: ContentLength,
): Promise<string> => {
  const userContent = generateUserContent(topic, contentFormat, contentLength)
  const message = generateMessage(userContent)
  const result = await generateText(message)
  return result
}

export default textGenerator
