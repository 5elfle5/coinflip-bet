import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Navigate } from 'react-router'

export default function AccountListFeature() {
  const { publicKey } = useWallet()

  if (publicKey) {
    return <Navigate to={`/coinflip`} replace />
  }

  return (
    <>
      <div>
        <h1 className='text-4xl text-center pt-8'>How to play</h1>
        <div className='py-8'>
          <ul className='list-inside list-disc'>
            <li>Go to <a href='https://chromewebstore.google.com/' className='underline'>chrome store</a> and install Solflare wallet extension</li>
            <li>Create wallet</li>
            <li>Go to Solflare settings and set network to devnet</li>
            <li>Copy your wallet address</li>
            <li>Go to <a href="https://faucet.quicknode.com/solana/devnet" className='underline'>quicknode</a> or other faucet to receive 1 SOL to your wallet on devnet</li>
            <li>Select wallet by pressing the button below</li>
          </ul>
        </div>
      </div>
      <div className="hero">
        <div className="hero-content text-center">
          <WalletMultiButton />
        </div>
      </div>
    </>
  )
}
