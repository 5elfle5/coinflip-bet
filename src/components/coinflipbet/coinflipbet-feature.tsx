import { useWallet } from '@solana/wallet-adapter-react'
import { ExplorerLink } from '../cluster/cluster-ui'
import { WalletButton } from '../solana/solana-provider'
import { AppHero, ellipsify } from '../ui/ui-layout'
import { useCoinflipbetProgram } from './coinflipbet-data-access'
import { CoinflipbetCreate, CoinflipbetList } from './coinflipbet-ui'

export default function CoinflipbetFeature() {
  const { publicKey } = useWallet()
  const { programId } = useCoinflipbetProgram()

  return publicKey ? (
    <div>
      <AppHero
        title="Coinflipbet"
        subtitle={
          'Create a new account by clicking the "Create" button. The state of a account is stored on-chain and can be manipulated by calling the program\'s methods (increment, decrement, set, and close).'
        }
      >
        <p className="mb-6">
          <ExplorerLink path={`account/${programId}`} label={ellipsify(programId.toString())} />
        </p>
        <CoinflipbetCreate />
      </AppHero>
      <CoinflipbetList />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  )
}
