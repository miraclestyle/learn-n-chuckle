import { Button } from '@/components/primitives'

interface Props {
  suggestions: string[]
  onClick: (prompt: string) => void
}

const Suggestions = ({ suggestions, onClick }: Props) => (
  <div className="flex flex-row flex-wrap gap-2 justify-center">
    {suggestions.map((suggestion) => (
      <Button key={suggestion} onClick={() => onClick(suggestion)}>
        {suggestion}
      </Button>
    ))}
  </div>
)

export default Suggestions
