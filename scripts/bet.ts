import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider, setProvider } from "@coral-xyz/anchor";
import * as fs from 'fs';
import type { Coinflipbet } from "../anchor/target/types/coinflipbet";
import idl from "../anchor/target/idl/coinflipbet.json";

// const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const connection = new Connection("http://localhost:8899", "confirmed");

function delay(delay: number) {
  return new Promise(function(resolve) {
      setTimeout(resolve, delay);
  });
}

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
  console.log(wager.toString());

  await connection.getLatestBlockhash();
  let milliseconds = new Date().getTime();
  const roll = ((milliseconds + 7789) * 997) % 100;
  const waitTime = 100 - roll;

  await delay(waitTime);
  
  milliseconds = new Date().getTime();
  await program.methods
    .bet(0)
    .accounts({ payer, wager })
    .rpc();
  console.log('made a bet on 0');
};

main().catch((err) => console.error("An error occurred:", err));
