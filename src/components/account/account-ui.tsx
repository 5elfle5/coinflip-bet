import { useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { useCluster } from '../cluster/cluster-data-access'
import {
  useGetBalance,
  useRequestAirdrop,
} from './account-data-access'

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
export function AccountChecker() {
  const { publicKey } = useWallet()
  if (!publicKey) {
    return null
  }
  return <AccountBalanceCheck address={publicKey} />
}
export function AccountBalanceCheck({ address }: { address: PublicKey }) {
  const { cluster } = useCluster()
  const mutation = useRequestAirdrop({ address })
  const query = useGetBalance({ address })

  if (query.isLoading) {
    return null
  }
  if (query.isError || !query.data) {
    return (
      <div className="alert alert-warning text-warning-content/80 rounded-none flex justify-center">
        <span>
          You are connected to <strong>{cluster.name}</strong> but your account is not found on this cluster.
        </span>
        <button
          className="btn btn-xs btn-neutral"
          onClick={() => mutation.mutateAsync(1).catch((err) => console.log(err))}
        >
          Request Airdrop
        </button>
      </div>
    )
  }
  return null
}

function BalanceSol({ balance }: { balance: number }) {
  return <span>{Math.round((balance / LAMPORTS_PER_SOL) * 100000) / 100000}</span>
}
