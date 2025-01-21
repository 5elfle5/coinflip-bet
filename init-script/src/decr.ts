
import { Keypair, Connection, PublicKey } from "@solana/web3.js";
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
  const [bankroll,] = PublicKey.findProgramAddressSync(
    [Buffer.from("bankroll"), wallet.publicKey.toBuffer()],
    program.programId
  );

  await program.methods
    .decrement()
    .accounts({
      bankroll
    })
    .signers([keypair])
    .rpc();
  const br = await program.account.bankroll.fetch(bankroll);
  console.log(JSON.stringify(br));
};

main().catch((err) => console.error("An error occurred:", err));
