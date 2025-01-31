import { useWager } from '@/custom-hooks/coinflip/use-wager'
import { CoinflipCard } from './coinflip-card'

export function CoinflipBet() {
  const { accounts, getProgramAccount } = useWager()

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
        <>
          {accounts.data?.map((account) => (
            <CoinflipCard key={account.publicKey.toString()} account={account.publicKey} />
          ))}
        </>
      ) : (
        <div className="text-center">
          <h2 className={'text-2xl'}>No accounts</h2>
          No accounts found. Create one above to get started.
        </div>
      )}
    </div>
  )
}