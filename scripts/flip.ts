import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider, setProvider } from "@coral-xyz/anchor";
import * as fs from 'fs';
import type { Coinflipbet } from "../anchor/target/types/coinflipbet";
import idl from "../anchor/target/idl/coinflipbet.json";

// const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const connection = new Connection("http://localhost:8899", "confirmed");

const main = async () => {
  const keypairData = JSON.parse(fs.readFileSync('/Users/andrej/.config/solana/id.json', 'utf-8'));
  const keypair = Keypair.fromSecretKey(Uint8Array.from(keypairData));
  const wallet = new Wallet(keypair);
  const provider = new AnchorProvider(connection, wallet, { commitment: 'confirmed' });
  setProvider(provider);
  const program = new Program(idl as Coinflipbet, provider);
  const payer = keypair.publicKey;
  const [wager,] = PublicKey.findProgramAddressSync(
    [Buffer.from('wager'), payer.toBuffer()],
    program.programId
  );

  await connection.getLatestBlockhash();
  await program.methods
    .flip()
    .accounts({ payer, wager })
    .rpc();
  console.log('flipped the coin');
};

main().catch((err) => console.error("An error occurred:", err));

