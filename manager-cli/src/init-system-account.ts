import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { Connection, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from '@solana/web3.js';
import * as IDL from '../../target/idl/coinflip_bet.json';
import * as anchor from "@project-serum/anchor";
require('dotenv').config();
const PROGRAM_ID = process.env.PROGRAM_ID ?? '';
  
async function run() {
  const connection = new Connection('http://127.0.0.1:8899');
  const wallet = NodeWallet.local();
  const programId = new PublicKey(PROGRAM_ID);
  const [systemAccount,] = await PublicKey.findProgramAddress(
    [Buffer.from("system-account"), wallet.publicKey.toBuffer()],
    programId
  );

  const provider = new anchor.AnchorProvider(
    connection,
    // @ts-ignore
    wallet,
    anchor.AnchorProvider.defaultOptions()
  );
  // @ts-ignore
  const program = new anchor.Program(IDL, programId, provider);
  console.log(`wager ${systemAccount}; wallet ${wallet.publicKey}`);
  await program.methods.initSystem()
  .accounts(
    {
      systemAccount,
      manager: wallet.publicKey,
      systemProgram: SystemProgram.programId,
    }
  )
  .signers(
    [wallet.payer]
  )
  .rpc();
}

run().then(
  () => process.exit(),
  err => {
    console.error(err);
    process.exit(-1);
  },
);
