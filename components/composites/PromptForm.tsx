'use client'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Button, Input, Select } from '@/components/primitives'
import Suggestions from './Suggestions'

import { ContentFormat, ContentLength, type IPrompt } from '@/services'

const formatOptions = [
  { value: ContentFormat.Lesson, label: 'Lessons' },
  { value: ContentFormat.Poem, label: 'Poems' },
  { value: ContentFormat.Meme, label: 'Memes' },
  { value: ContentFormat.VisualMeme, label: 'Visual Memes' },
]

const lengthOptions = [
  { value: ContentLength.Short, label: 'Short' },
  { value: ContentLength.Standard, label: 'Standard' },
  { value: ContentLength.Long, label: 'Long' },
]

interface Props {
  suggestions: string[]
  onSubmit: SubmitHandler<IPrompt>
}

const PromptForm = ({ onSubmit, suggestions }: Props) => {
  const {
    register,
    watch,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IPrompt>({
    defaultValues: {
      topic: '',
      format: '' as ContentFormat,
      length: '' as ContentLength,
    },
  })

  const watchFormat = watch('format')
  const isVisualMeme = watchFormat === ContentFormat.VisualMeme

  const handleSuggestionSelection = (suggestion: string) => {
    setValue('topic', suggestion)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-w-64 w-full flex flex-col gap-2 justify-center"
    >
      <Suggestions
        suggestions={suggestions}
        onClick={handleSuggestionSelection}
      />
      <Input
        {...register('topic', { required: true, maxLength: 32 })}
        type="text"
        placeholder="Write a topic..."
      />
      <Controller
        control={control}
        name="format"
        rules={{ required: true }}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            ref={ref}
            onChange={(value) => onChange(value)}
            value={value}
            options={formatOptions}
            placeholder="Pick a format..."
          />
        )}
      />
      {!isVisualMeme && (
        <Controller
          control={control}
          name="length"
          rules={{ required: true }}
          render={({ field: { onChange, value, ref } }) => (
            <Select
              ref={ref}
              onChange={(value) => onChange(value)}
              value={value}
              options={lengthOptions}
              placeholder="Choose response size..."
            />
          )}
        />
      )}
      <div>
        <Button type="submit">Compose</Button>
      </div>
    </form>
  )
}

export default PromptForm
