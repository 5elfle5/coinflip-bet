import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Navigate } from 'react-router'

export default function AccountListFeature() {
  const { publicKey } = useWallet()

  if (publicKey) {
    return <Navigate to={`/account/${publicKey.toString()}`} replace />
  }

  return (
    <div className="hero">
      <div className="hero-content text-center">
        <WalletMultiButton />
      </div>
    </div>
  )
}
