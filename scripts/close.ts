import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider, setProvider } from "@coral-xyz/anchor";
import * as fs from 'fs';
import type { Coinflipbet } from "../anchor/target/types/coinflipbet";
import idl from "../anchor/target/idl/coinflipbet.json";

// const connection = new Connection("http://localhost:8899", "confirmed");
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const main = async () => {
  const keypairData = JSON.parse(fs.readFileSync('/Users/andrej/dev/coinflip-bet/scripts/keys.json', 'utf-8'));
  const keypair = Keypair.fromSecretKey(Uint8Array.from(keypairData));
  const wallet = new Wallet(keypair);
  const provider = new AnchorProvider(connection, wallet, { commitment: 'confirmed' });
  setProvider(provider);
  const program = new Program(idl as Coinflipbet, provider);

  const [bankroll,] = PublicKey.findProgramAddressSync(
    [Buffer.from('bankroll'), new PublicKey(idl.address).toBuffer()],
    program.programId
  );
  console.log(bankroll.toString());
  await connection.getLatestBlockhash();
  await program.methods
    .closeBankroll()
    .accounts({
      payer: wallet.publicKey,
      bankroll,
    })
    .signers([keypair])
    .rpc();
  console.log('closed bankroll');
};

main().catch((err) => console.error("An error occurred:", err));
