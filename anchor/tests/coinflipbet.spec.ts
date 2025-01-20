import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Coinflipbet} from '../target/types/coinflipbet'

describe('coinflipbet', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Coinflipbet as Program<Coinflipbet>

  const coinflipbetKeypair = Keypair.generate()

  it('Initialize Coinflipbet', async () => {
    expect(true).toBeTruthy()
  })
})
