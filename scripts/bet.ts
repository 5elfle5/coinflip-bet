import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider, setProvider } from "@coral-xyz/anchor";
import * as fs from 'fs';
import type { Coinflipbet } from "../anchor/target/types/coinflipbet";
import idl from "../anchor/target/idl/coinflipbet.json";

// const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const connection = new Connection("http://localhost:8899", "confirmed");

const getRoll = (milliseconds: number) => {
  return ((milliseconds + 7789) * 997) % 100;
};

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

  // await connection.getLatestBlockhash();
  const milliseconds = new Date().getTime();
  const rolls = [];
  let seriesLength = 0;
  let seriesIndex = -1;
  for (let i = milliseconds; i < milliseconds + 100; i++) {
    const roll = getRoll(i);
    if (roll < 49) {
      seriesLength++;
    }
    if (roll >= 49) {
      seriesLength = 0;
    }
    if (seriesLength > 9) {
      seriesIndex = i - 10;
      break;
    }
    rolls.push(roll);
  }
  
  if (seriesIndex >= 0) {
    await delay(seriesIndex);
    await program.methods
      .bet(0)
      .accounts({ payer, wager })
      .rpc();
    console.log('made a bet on 0');
  }
};

main().catch((err) => console.error("An error occurred:", err));
