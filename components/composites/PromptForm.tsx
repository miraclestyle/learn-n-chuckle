'use client'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Button, Input, Select } from '@/components/primitives'

import { ContentFormat, type IPrompt } from '@/services'

const options = [
  { value: ContentFormat.Lesson, label: 'Lessons' },
  { value: ContentFormat.Meme, label: 'Memes' },
]

interface Props {
  onSubmit: SubmitHandler<IPrompt>
}

const PromptForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IPrompt>({
    defaultValues: { topic: '', format: '' as ContentFormat },
  })

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
            options={options}
            placeholder="Select format..."
          />
        )}
      />
      <Button type="submit">Compose</Button>
    </form>
  )
}

export default PromptForm
