'use server'

import { generateText } from './openaiClient'

import { IMessage, ContentFormat, ContentLength } from './interfaces'

const generateLessonContentLength = (contentLength: ContentLength): string => {
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

const generateMemeContentLength = (contentLength: ContentLength): string => {
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

const generateMemeContentTopic = (topic: string): string =>
  `Create a description of a visual meme using nerdy technology terms and jargons, for a topic titled ${topic}, in`

const generateLessonContent = (
  topic: string,
  contentLength: ContentLength,
): string =>
  `${generateLessonContentTopic(topic)} ${generateLessonContentLength(contentLength)}`

const generateMemeContent = (
  topic: string,
  contentLength: ContentLength,
): string =>
  `${generateMemeContentTopic(topic)} ${generateMemeContentLength(contentLength)}`

const generateUserContent = (
  topic: string,
  contentFormat: ContentFormat,
  contentLength: ContentLength,
): string => {
  switch (contentFormat) {
    case ContentFormat.Lesson:
      return generateLessonContent(topic, contentLength)
    case ContentFormat.Meme:
      return generateMemeContent(topic, contentLength)
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
