import { useWager } from '@/custom-hooks/coinflip/use-wager'

export function Wager() {
  const { createWager } = useWager()

  return (
    <div>
      <button
        className="btn btn-xs lg:btn-md btn-primary"
        onClick={() => createWager.mutateAsync()}
        disabled={createWager.isPending}
      >
        Create {createWager.isPending && '...'}
      </button>
    </div>
  )
}
