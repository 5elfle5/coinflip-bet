import { useWallet } from '@solana/wallet-adapter-react'
import { Wager } from './wager'
import { ExplorerLink } from '../cluster/explorer-link'
import { useWager } from '@/custom-hooks/coinflip/use-wager'
import { CoinflipBet } from './coinflip-bet'
import { AppHero } from '../ui/app-hero'
import { ellipsify } from '../ui/ellipsify'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export default function CoinflipbetFeature() {
  const { publicKey } = useWallet()
  const { programId } = useWager()

  return publicKey ? (
    <div>
      <AppHero
        title="Coinflipbet"
        subtitle={
          'Create a new account by clicking the "Create" button. The state of a account is stored on-chain and can be manipulated by calling the program\'s methods (bet, flip, and close).'
        }
      >
        <p className="mb-6">
          <ExplorerLink path={`account/${programId}`} label={ellipsify(programId.toString())} />
        </p>
        <Wager />
      </AppHero>
      <CoinflipBet />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero">
        <div className="hero-content text-center">
          <WalletMultiButton />
        </div>
      </div>
    </div>
  )
}
