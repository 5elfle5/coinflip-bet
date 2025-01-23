import { WalletButton } from '@/constants/wallet-button'
import { useWallet } from '@solana/wallet-adapter-react'
import { Navigate } from 'react-router'

export default function AccountListFeature() {
  const { publicKey } = useWallet()

  if (publicKey) {
    return <Navigate to={`/account/${publicKey.toString()}`} replace />
  }

  return (
    <div className="hero">
      <div className="hero-content text-center">
        <WalletButton />
      </div>
    </div>
  )
}
