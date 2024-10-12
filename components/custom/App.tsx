'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Heading,
  Text,
  Footer,
  Container,
  Content,
  Backdrop,
  Button,
  Audio,
} from '@/components/primitives'
import { PromptForm } from '@/components/composites'
import { IPrompt } from '@/services'

import { useTextGenerator, useSpeechGenerator } from '@/hooks'

const App = () => {
  const [file, setFile] = useState<string | null>(null)
  const { text, generateText, isGeneratingText } = useTextGenerator()
  const { audioUrl, generateSpeech, isGeneratingSpeech, resetUrl } =
    useSpeechGenerator()

  const generate = async (data: IPrompt) => {
    const content = await generateText(data)
    await generateSpeech(content)
  }

  const defaultMessage =
    'Please enter a topic, select a format, and click button Compose.'

  const generatingMessage = 'Processing...'

  console.log('Home message:', text)

  return (
    <Backdrop>
      <Container>
        <Heading level={1}>Tech Comedy Central</Heading>
        <PromptForm onSubmit={(data) => generate(data)} />
        <Content>
          {isGeneratingText && <Text>{generatingMessage}</Text>}
          {!isGeneratingText && !text && <Text>{defaultMessage}</Text>}
          {!isGeneratingText && text && <Text>{text}</Text>}
          {!isGeneratingText && !isGeneratingSpeech && text && audioUrl && !file && (
            <Button onClick={() => setFile(audioUrl)}>Play</Button>
          )}
          {!isGeneratingText && !isGeneratingSpeech && text && audioUrl && file && (
            <Button onClick={() => setFile(null)}>Stop</Button>
          )}
          {file && (
            <Audio src={file} autoPlay onEnded={() => setFile(null)} />
          )}
        </Content>
        <Footer>Happy Prompting, Happy Roasting! from Promptlys !</Footer>
        <Image
          className="dark:invert"
          src="https://msfpfmwdawonueqaevru.supabase.co/storage/v1/object/public/img/promptlys-150.png"
          alt="Promptlys logo"
          width={64}
          height={64}
          priority
        />
      </Container>
    </Backdrop>
  )
}

export default App
