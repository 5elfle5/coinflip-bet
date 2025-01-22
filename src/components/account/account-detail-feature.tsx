import { PublicKey } from '@solana/web3.js'
import { useMemo } from 'react'
import { useParams } from 'react-router'
import { ExplorerLink } from '../cluster/cluster-ui'
import { AppHero, ellipsify } from '../ui/ui-layout'
import { AccountBalance, AccountButtons } from './account-ui'

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
        <div className="my-4">
          <AccountButtons address={address} />
        </div>
      </AppHero>
    </div>
  )
}
