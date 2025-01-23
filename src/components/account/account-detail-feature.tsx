import { PublicKey } from '@solana/web3.js'
import { useMemo } from 'react'
import { useParams } from 'react-router'
import CoinflipbetFeature from '../coinflipbet/coinflipbet-feature'
import { AccountBalance } from './account-balance'
import { ExplorerLink } from '../cluster/explorer-link'
import { AppHero } from '../ui/app-hero'
import { ellipsify } from '../ui/ellipsify'

export default function AccountDetailFeature() {
  const params = useParams() as { address?: string }
  const address = useMemo(() => {
    if (!params.address) {
      return
    }
    try {
      return new PublicKey(params.address)
    } catch (e) {
      console.log(`Invalid public key`, e)
    }
  }, [params])
  if (!address) {
    return <div>Error loading account</div>
  }

  return (
    <div>
      <AppHero
        title={<AccountBalance address={address} />}
        subtitle={
          <div className="my-4">
            <ExplorerLink path={`account/${address}`} label={ellipsify(address.toString())} />
          </div>
        }
      >
      </AppHero>
      <CoinflipbetFeature />
    </div>
  )
}
