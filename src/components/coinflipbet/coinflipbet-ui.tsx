import { PublicKey } from '@solana/web3.js'
import { useMemo } from 'react'
import { ExplorerLink } from '../cluster/cluster-ui'
import { ellipsify } from '../ui/ui-layout'
import { useCoinflipbetProgram, useCoinflipbetProgramAccount } from './coinflipbet-data-access'

export function Wager() {
  const { createWager, closeWager } = useCoinflipbetProgram()

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

export function CoinflipBet() {
  const { accounts, getProgramAccount } = useCoinflipbetProgram()

  if (getProgramAccount.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }
  if (!getProgramAccount.data?.value) {
    return (
      <div className="alert alert-info flex justify-center">
        <span>Program account not found. Make sure you have deployed the program and are on the correct cluster.</span>
      </div>
    )
  }
  return (
    <div className={'space-y-6'}>
      {accounts.isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : accounts.data?.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {accounts.data?.map((account) => (
            <CoinflipbetCard key={account.publicKey.toString()} account={account.publicKey} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className={'text-2xl'}>No accounts</h2>
          No accounts found. Create one above to get started.
        </div>
      )}
    </div>
  )
}

function CoinflipbetCard({ account }: { account: PublicKey }) {
  const { accountQuery, incrementMutation, decrementMutation, closeMutation } = useCoinflipbetProgramAccount({
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
              onClick={() => incrementMutation.mutateAsync()}
              disabled={incrementMutation.isPending}
            >
              Bet
            </button>
            <button
              className="btn btn-xs lg:btn-md btn-outline"
              onClick={() => decrementMutation.mutateAsync()}
              disabled={decrementMutation.isPending}
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
