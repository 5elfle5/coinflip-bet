import { useWallet } from '@solana/wallet-adapter-react'
import { AccountBalanceCheck } from './account-balance-check'

export function AccountChecker() {
  const { publicKey } = useWallet()
  if (!publicKey) {
    return null
  }
  return <AccountBalanceCheck address={publicKey} />
}
