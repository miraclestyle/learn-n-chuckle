export enum ContentFormat {
  Lesson = 'lesson',
  Meme = 'meme',
}

export interface IMessage {
  role: 'user' | 'assistant'
  content: string
}
