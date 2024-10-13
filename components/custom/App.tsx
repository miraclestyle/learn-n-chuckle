'use client'

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
  Background,
} from '@/components/primitives'
import { PromptForm } from '@/components/composites'

import { useAI } from '@/hooks'

const App = () => {
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

  const defaultMessage =
    'Please enter a topic, select a format, and click button Compose.'

  const generatingMessage = 'Brainstorming...'

  const isNoImage = !isGeneratingImage && image === null

  const suggestions = [
    'LPU vs GPU',
    'Explain LLM',
    'Predictive vs Generative',
    'Prompt Engineering',
    'Explain Decentralized Finance',
    'Explain Soverign AI',
  ]

  return (
    <Background>
      <Backdrop>
        <Container>
          <Heading level={1}>Learn And Chuckle</Heading>
          <PromptForm
            onSubmit={(data) => generate(data)}
            suggestions={suggestions}
          />
          <Content>
            {isNoImage && !isGeneratingText && text && <Text>{text}</Text>}

            {!isGeneratingImage && image && (
              <Image
                src={image}
                alt="Image"
                width={512}
                height={512}
                priority
              />
            )}

            {isNoImage && !isGenerating && text && !audio && (
              <Button onClick={playAudio}>Play</Button>
            )}
            {isNoImage && !isGenerating && audio && (
              <Button onClick={stopAudio}>Stop</Button>
            )}
            {isNoImage && audio && (
              <Audio src={audio} autoPlay onEnded={stopAudio} />
            )}

            {!isGenerating && !text && <Text>{defaultMessage}</Text>}
            {isGenerating && <Text>{generatingMessage}</Text>}
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
    </Background>
  )
}

export default App
