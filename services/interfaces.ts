export enum ContentFormat {
  Lesson = 'lesson',
  Meme = 'meme',
}

export interface IMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface IPrompt {
  topic: string
  format: ContentFormat
}
