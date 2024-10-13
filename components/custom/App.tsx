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

import { useAI } from '@/hooks'

const App = () => {
  const [file, setFile] = useState<string | null>(null)
  const {
    generate,
    text,
    audio,
    image,
    isGenerating,
    isGeneratingImage,
    isGeneratingText,
    isGeneratingSpeech,
    playAudio,
    stopAudio,
  } = useAI()

  console.log('App image:', image)

  const defaultMessage =
    'Please enter a topic, select a format, and click button Compose.'

  const generatingMessage = 'Processing...'

  return (
    <Backdrop>
      <Container>
        <Heading level={1}>Learn And Chuckle</Heading>
        <PromptForm onSubmit={(data) => generate(data)} />
        <Content>
          {!isGenerating && !text && <Text>{defaultMessage}</Text>}
          {isGenerating && <Text>{generatingMessage}</Text>}
          {!isGeneratingText && text && <Text>{text}</Text>}
          {!isGeneratingImage && image && (
            <Image src={image} alt="Image" width={512} height={512} priority />
          )}

          {!isGeneratingSpeech && text && !audio && <Button onClick={playAudio}>Play</Button>}
          {!isGeneratingSpeech && audio && <Button onClick={stopAudio}>Stop</Button>}
          {audio && (
            <Audio src={audio} autoPlay onEnded={() => setFile(null)} />
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
