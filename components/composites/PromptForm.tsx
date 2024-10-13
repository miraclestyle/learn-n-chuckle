'use client'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Button, Input, Select } from '@/components/primitives'

import { ContentFormat, ContentLength, type IPrompt } from '@/services'

const formatOptions = [
  { value: ContentFormat.Lesson, label: 'Lessons' },
  { value: ContentFormat.Poem, label: 'Poem' },
  { value: ContentFormat.Meme, label: 'Memes' },
  { value: ContentFormat.VisualMeme, label: 'Visual Memes' },
]

const lengthOptions = [
  { value: ContentLength.Short, label: 'Short' },
  { value: ContentLength.Standard, label: 'Standard' },
  { value: ContentLength.Long, label: 'Long' },
]

interface Props {
  onSubmit: SubmitHandler<IPrompt>
}

const PromptForm = ({ onSubmit }: Props) => {
  const {
    register,
    watch,
    handleSubmit,
    control,
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-w-64 w-full flex flex-col gap-2"
    >
      <Input
        {...register('topic', { required: true, maxLength: 32 })}
        type="text"
        placeholder="Write topic..."
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
            placeholder="Select format..."
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
              placeholder="Select length..."
            />
          )}
        />
      )}
      <Button type="submit">Compose</Button>
    </form>
  )
}

export default PromptForm
