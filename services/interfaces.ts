export enum ContentFormat {
  Lesson = 'lesson',
  Poem = 'poem',
  Meme = 'meme',
  VisualMeme = 'visualMeme',
}

export enum ContentLength {
  Short = 'short',
  Standard = 'standard',
  Long = 'long',
}

export interface IMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface IPrompt {
  topic: string
  format: ContentFormat
  length: ContentLength
}
