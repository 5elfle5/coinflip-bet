import { useWager } from '@/custom-hooks/coinflip/use-wager'

export function Wager() {
  const { createWager, closeWager } = useWager()

  return (
    <div>
      <button
        className="btn btn-xs lg:btn-md btn-primary"
        onClick={() => createWager.mutateAsync()}
        disabled={createWager.isPending}
      >
        Create {createWager.isPending && '...'}
      </button>
      <button
        className="btn btn-xs lg:btn-md btn-primary ml-2"
        onClick={() => closeWager.mutateAsync()}
        disabled={closeWager.isPending}
      >
        Close {closeWager.isPending && '...'}
      </button>
    </div>
  )
}
