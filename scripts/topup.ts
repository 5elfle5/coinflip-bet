
import { Keypair, Connection } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider, setProvider, BN } from "@coral-xyz/anchor";
import * as fs from 'fs';
import type { Coinflipbet } from "../anchor/target/types/coinflipbet";
import idl from "../anchor/target/idl/coinflipbet.json";

const connection = new Connection("http://localhost:8899", "confirmed");

const main = async () => {
  const keypairData = JSON.parse(fs.readFileSync('/Users/andrej/.config/solana/id.json', 'utf-8'));
  const keypair = Keypair.fromSecretKey(Uint8Array.from(keypairData));
  const wallet = new Wallet(keypair);
  const provider = new AnchorProvider(connection, wallet, { commitment: 'confirmed' });
  setProvider(provider);
  const program = new Program(idl as Coinflipbet, provider);

  await program.methods
    .topup(new BN(1000000000))
    .accounts({
      payer: wallet.publicKey
    })
    .signers([keypair])
    .rpc();
  console.log('added 1 SOL to bankroll');
};

main().catch((err) => console.error("An error occurred:", err));
