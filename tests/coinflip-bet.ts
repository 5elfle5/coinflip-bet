import { AnchorProvider, BN, Program, setProvider, workspace } from '@project-serum/anchor';
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  Connection,
  sendAndConfirmTransaction,
  clusterApiUrl,
} from '@solana/web3.js';
import * as IDL from '../target/idl/coinflip_bet.json';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

require('dotenv').config();
const MANAGER = process.env.MANAGER ?? '';
const PROGRAM_ID = process.env.PROGRAM_ID ?? '';

describe("coinflip-bet", () => {
  const provider = AnchorProvider.local();
  setProvider(provider);

  it("runs bet", async () => {
    const programId = new PublicKey(PROGRAM_ID);
    //@ts-ignore
    const program = new Program(IDL, programId, provider);
    const connection = new Connection('http://127.0.0.1:8899');
    const managerKeys = Keypair.fromSecretKey(new Uint8Array(JSON.parse(MANAGER)));
    console.log(9);
    const airdropSignature = await connection.requestAirdrop(
      managerKeys.publicKey,
      100000000
    );
    console.log(8);
    await connection.confirmTransaction(airdropSignature);
    console.log(1);
    const [systemAccount,] = await PublicKey.findProgramAddress(
      [Buffer.from("system-account"), managerKeys.publicKey.toBuffer()],
      program.programId
    );
    await program.methods.initSystem()
    .accounts(
      {
        systemAccount,
        manager: managerKeys.publicKey,
        systemProgram: SystemProgram.programId,
      }
    )
    .signers(
      [managerKeys]
    )
    .rpc();
    console.log(2);
    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: managerKeys.publicKey,
        toPubkey: systemAccount,
        lamports: 100000,
      }),
    );
    await sendAndConfirmTransaction(connection, tx, [managerKeys]);
    console.log(3);

  });
});
