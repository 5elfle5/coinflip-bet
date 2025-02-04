import { PublicKey } from '@solana/web3.js'
import { useMemo, useState } from 'react'
import { ExplorerLink } from '../cluster/explorer-link'
import { useCoinflip } from '@/custom-hooks/coinflip/use-coinflip'
import { ellipsify } from '../ui/ellipsify';
import { SelectSide } from '../ui/select-side';

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
      return 'place-your-bet';
    }
    if ((betPlaced === 'true') && (!flipped || flipped === 'false')) {
      setBetDisabled(() => true);
      setFlipDisabled(() => false);
      return 'flip-the-coin';
    }
    if (won === 'true') {
      setBetDisabled(() => false);
      setFlipDisabled(() => true);
      return 'heads';
    }
    setBetDisabled(() => false);
    setFlipDisabled(() => true);
    return 'tails';
  } , [won, betPlaced, flipped] )
  const [isHeads, setIsHeads] = useState(false);

  return accountQuery.isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <div className="card card-bordered border-base-300 border-4 text-neutral-content">
      <div className="card-body items-center text-center">
        <div className="space-y-6">
            {/* {betState} */}
            <div className='flex'>
              <SelectSide isHeads={isHeads} setIsHeads={setIsHeads} />
              <button
                className="btn btn-xs lg:btn-md btn-outline ml-4 self-center"
                onClick={() => betMutation.mutateAsync()}
                disabled={betMutation.isPending || betDisabled}
              >
                Bet
              </button>

            </div>
            <div className='flex'>
              <div id="coin" className={betState}>
                <div className="side-a"></div>
                <div className="side-b"></div>
              </div>
              <button
                className="btn btn-xs lg:btn-md btn-outline self-center"
                onClick={() => flipMutation.mutateAsync()}
                disabled={flipMutation.isPending || flipDisabled}
              >
                Flip
              </button>

            </div>
          <div className="card-actions justify-around">
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