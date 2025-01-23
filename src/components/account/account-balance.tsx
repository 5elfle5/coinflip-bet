import { PublicKey } from '@solana/web3.js'
import { useGetBalance } from '@/custom-hooks/account/use-get-balance'
import { BalanceSol } from './balance-sol'

export function AccountBalance({ address }: { address: PublicKey }) {
  const query = useGetBalance({ address })

  return (
    <div>
      <h1 className="text-3xl font-bold cursor-pointer" onClick={() => query.refetch()}>
        {query.data ? <BalanceSol balance={query.data} /> : '...'} SOL
      </h1>
    </div>
  )
}
