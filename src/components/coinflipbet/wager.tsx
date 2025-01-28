import { useWager } from '@/custom-hooks/coinflip/use-wager'

export function Wager() {
  const { createWager, accounts } = useWager()

  return (
    <div>
      {
        !accounts.data?.length && (
          <button
            className="btn btn-xs lg:btn-md btn-primary"
            onClick={() => createWager.mutateAsync()}
            disabled={createWager.isPending}
          >
            Create {createWager.isPending && '...'}
          </button>
        )
      }
    </div>
  )
}
