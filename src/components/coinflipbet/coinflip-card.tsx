import { PublicKey } from '@solana/web3.js'
import { useMemo } from 'react'
import { ExplorerLink } from '../cluster/explorer-link'
import { useCoinflip } from '@/custom-hooks/coinflip/use-coinflip'
import { ellipsify } from '../ui/ellipsify';

export function CoinflipCard({ account }: { account: PublicKey }) {
  const { accountQuery, betMutation, flipMutation, closeMutation } = useCoinflip({
    account,
  });

  const count = useMemo(() => accountQuery.data?.won.toString(), [accountQuery.data?.won.toString()])

  return accountQuery.isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <div className="card card-bordered border-base-300 border-4 text-neutral-content">
      <div className="card-body items-center text-center">
        <div className="space-y-6">
          <h2 className="card-title justify-center text-3xl cursor-pointer" onClick={() => accountQuery.refetch()}>
            {count}
          </h2>
          <div className="card-actions justify-around">
            <button
              className="btn btn-xs lg:btn-md btn-outline"
              onClick={() => betMutation.mutateAsync()}
              disabled={betMutation.isPending}
            >
              Bet
            </button>
            <button
              className="btn btn-xs lg:btn-md btn-outline"
              onClick={() => flipMutation.mutateAsync()}
              disabled={flipMutation.isPending}
            >
              Flip
            </button>
          </div>
          <div className="text-center space-y-4">
            <p>
              <ExplorerLink path={`account/${account}`} label={ellipsify(account.toString())} />
            </p>
            <button
              className="btn btn-xs btn-secondary btn-outline"
              onClick={() => {
                if (!window.confirm('Are you sure you want to close this account?')) {
                  return
                }
                return closeMutation.mutateAsync()
              }}
              disabled={closeMutation.isPending}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}