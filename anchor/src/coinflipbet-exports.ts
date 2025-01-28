// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import CoinflipbetIDL from '../target/idl/coinflipbet.json'
import type { Coinflipbet } from '../target/types/coinflipbet'

// Re-export the generated IDL and type
export { Coinflipbet, CoinflipbetIDL }

// The programId is imported from the program IDL.
export const COINFLIPBET_PROGRAM_ID = new PublicKey(CoinflipbetIDL.address)

// This is a helper function to get the Coinflipbet Anchor program.
export function getCoinflipbetProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...CoinflipbetIDL, address: address ? address.toBase58() : CoinflipbetIDL.address } as Coinflipbet, provider)
}

// This is a helper function to get the program ID for the Coinflipbet program depending on the cluster.
export function getCoinflipbetProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Coinflipbet program on devnet and testnet.
      return new PublicKey('7PFuMxE8XdCY1RyKkfrqE29pHcdveHJ9sQV63rxCM8xx')
    case 'mainnet-beta':
    default:
      return COINFLIPBET_PROGRAM_ID
  }
}
