import { clusterApiUrl, Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import * as fs from 'fs';
import type { Coinflipbet } from "../../anchor/target/types/coinflipbet";
import idl from "../../anchor/target/idl/coinflipbet.json";
 
const connection = new Connection("http://localhost:8899", "confirmed");

const loadKeypairFromFile = (filePath: string): Keypair => {
  const keypairData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const keypair = Keypair.fromSecretKey(Uint8Array.from(keypairData));
  return keypair;
};
 
const main = async () => {
  const program = new Program(idl as Coinflipbet, {
    connection,
  });
  const keypairFile = '../keys.json';
  const keypair = loadKeypairFromFile(keypairFile);

  console.log('Public Key:', keypair.publicKey.toBase58());
  const [bankroll,] = PublicKey.findProgramAddressSync(
    [Buffer.from("bankroll"), program.programId.toBuffer()],
    program.programId
  );
  const systemProgram = SystemProgram.programId;
  const payer = keypair.publicKey;
  program.methods.initialize().accounts({
    payer,
    bankroll,
    systemProgram
  })
  .signers([keypair])
  .rpc();
};

main().catch((err) => console.error('An error occurred:', err));