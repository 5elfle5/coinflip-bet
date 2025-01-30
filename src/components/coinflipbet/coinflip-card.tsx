import { PublicKey } from '@solana/web3.js'
import { useMemo, useState } from 'react'
import { ExplorerLink } from '../cluster/explorer-link'
import { useCoinflip } from '@/custom-hooks/coinflip/use-coinflip'
import { ellipsify } from '../ui/ellipsify';

export function CoinflipCard({ account }: { account: PublicKey }) {
  const { accountQuery, betMutation, flipMutation, closeMutation } = useCoinflip({
    account,
  });
  const [betDisabled, setBetDisabled] = useState(false);
  const [flipDisabled, setFlipDisabled] = useState(true);

  const won = useMemo(() => accountQuery.data?.won.toString(), [accountQuery.data?.won])
  const flipped = useMemo(() => accountQuery.data?.flipped.toString(), [accountQuery.data?.flipped]);
  const betPlaced = useMemo(() => accountQuery.data?.betPlaced.toString(), [accountQuery.data?.betPlaced]);
  const betState = useMemo(() => {
    if ((!betPlaced || betPlaced === 'false') && (!flipped || flipped === 'false')) {
      setBetDisabled(() => false);
      setFlipDisabled(() => true);
      return 'Place Your Bet';
    }
    if ((betPlaced === 'true') && (!flipped || flipped === 'false')) {
      setBetDisabled(() => true);
      setFlipDisabled(() => false);
      return 'Flip the coin';
    }
    if (won === 'true') {
      setBetDisabled(() => false);
      setFlipDisabled(() => true);
      return 'Won';
    }
    setBetDisabled(() => false);
    setFlipDisabled(() => true);
    return 'Lost';
  } , [won, betPlaced, flipped] )

  return accountQuery.isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <div className="card card-bordered border-base-300 border-4 text-neutral-content">
      <div className="card-body items-center text-center">
        <div className="space-y-6">
          <h2 className="card-title justify-center text-3xl cursor-pointer" onClick={() => accountQuery.refetch()}>
            {betState}
          </h2>
          <div className="card-actions justify-around">
            <button
              className="btn btn-xs lg:btn-md btn-outline"
              onClick={() => betMutation.mutateAsync()}
              disabled={betMutation.isPending || betDisabled}
            >
              Bet
            </button>
            <button
              className="btn btn-xs lg:btn-md btn-outline"
              onClick={() => flipMutation.mutateAsync()}
              disabled={flipMutation.isPending || flipDisabled}
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
                return closeMutation.mutateAsync();
              }}
              disabled={closeMutation.isPending || betPlaced === 'true'}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}