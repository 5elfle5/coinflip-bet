import { Keypair, Connection } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider, setProvider } from "@coral-xyz/anchor";
import * as fs from 'fs';
import type { Coinflipbet } from "../../anchor/target/types/coinflipbet";
import idl from "../../anchor/target/idl/coinflipbet.json";

const connection = new Connection("http://localhost:8899", "confirmed");

const main = async () => {
  const keypairData = JSON.parse(fs.readFileSync('/home/andy/dev/coinflip-bet/init-script/keys.json', 'utf-8'));
  const keypair = Keypair.fromSecretKey(Uint8Array.from(keypairData));
  const wallet = new Wallet(keypair);
  const provider = new AnchorProvider(connection, wallet, { commitment: 'confirmed' });
  setProvider(provider);
  const program = new Program(idl as Coinflipbet, provider);
  await program.methods
    .initialize()
    .accounts({
      payer: keypair.publicKey,
    })
    .signers([keypair])
    .rpc();
};

main().catch((err) => console.error("An error occurred:", err));
