import { Keypair, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider, setProvider, BN } from "@coral-xyz/anchor";
import * as fs from 'fs';
import type { Coinflipbet } from "../anchor/target/types/coinflipbet";
import idl from "../anchor/target/idl/coinflipbet.json";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
// const connection = new Connection("http://localhost:8899", "confirmed");

const main = async () => {
  const keypairData = JSON.parse(fs.readFileSync('/Users/andrej/dev/coinflip-bet/scripts/keys.json', 'utf-8'));
  const keypair = Keypair.fromSecretKey(Uint8Array.from(keypairData));
  const wallet = new Wallet(keypair);
  const provider = new AnchorProvider(connection, wallet, { commitment: 'confirmed' });
  setProvider(provider);
  const program = new Program(idl as Coinflipbet, provider);
  // const [latestBlockhash, signature] = await Promise.all([
  //   connection.getLatestBlockhash(),
  //   connection.requestAirdrop(wallet.publicKey, 3 * LAMPORTS_PER_SOL),
  // ])

  // await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed')
  // console.log('added 3 SOL to master wallet')
  const blockhash = connection.getLatestBlockhash();
  const init = program.methods
    .initialize()
    .accounts({
      payer: keypair.publicKey,
    })
    .signers([keypair])
    .rpc();
  await Promise.all([blockhash, init])
  console.log('initialized bankroll');

  // await program.methods
  //   .topup(new BN(200000000))
  //   .accounts({
  //     payer: wallet.publicKey
  //   })
  //   .signers([keypair])
  //   .rpc();
  // console.log('added 2 SOL to bankroll');
};

main().catch((err) => console.error("An error occurred:", err));
