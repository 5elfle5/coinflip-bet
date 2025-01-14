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
    await program.methods
      .initialize()
      .accounts({
        coinflipbet: coinflipbetKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([coinflipbetKeypair])
      .rpc()

    const currentCount = await program.account.coinflipbet.fetch(coinflipbetKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Coinflipbet', async () => {
    await program.methods.increment().accounts({ coinflipbet: coinflipbetKeypair.publicKey }).rpc()

    const currentCount = await program.account.coinflipbet.fetch(coinflipbetKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Coinflipbet Again', async () => {
    await program.methods.increment().accounts({ coinflipbet: coinflipbetKeypair.publicKey }).rpc()

    const currentCount = await program.account.coinflipbet.fetch(coinflipbetKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Coinflipbet', async () => {
    await program.methods.decrement().accounts({ coinflipbet: coinflipbetKeypair.publicKey }).rpc()

    const currentCount = await program.account.coinflipbet.fetch(coinflipbetKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set coinflipbet value', async () => {
    await program.methods.set(42).accounts({ coinflipbet: coinflipbetKeypair.publicKey }).rpc()

    const currentCount = await program.account.coinflipbet.fetch(coinflipbetKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the coinflipbet account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        coinflipbet: coinflipbetKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.coinflipbet.fetchNullable(coinflipbetKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
