import CoinflipbetFeature from '../coinflipbet/coinflipbet-feature'
import { AccountBalance } from './account-balance'
import { ExplorerLink } from '../cluster/explorer-link'
import { AppHero } from '../ui/app-hero'
import { ellipsify } from '../ui/ellipsify'
import { useWallet } from '@solana/wallet-adapter-react'

export default function AccountDetailFeature() {
  const { publicKey } = useWallet();
  if (!publicKey) {
    return <div>Error loading account</div>
  }

  return (
    <div>
      <AppHero
        title={<AccountBalance address={publicKey} />}
        subtitle={
          <div className="my-4">
            <ExplorerLink path={`account/${publicKey}`} label={ellipsify(publicKey.toString())} />
          </div>
        }
      >
      </AppHero>
      <CoinflipbetFeature />
    </div>
  )
}
