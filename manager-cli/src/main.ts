import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { Connection, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from '@solana/web3.js';
import * as IDL from '../../target/idl/coinflip_bet.json';
import * as anchor from "@project-serum/anchor";
require('dotenv').config();
  
async function main() {
  const connection = new Connection('http://127.0.0.1:8899');
  const wallet = NodeWallet.local();
  const programId = new PublicKey("4SmSWTXY3MXgXW35rRfvfgEpZLASPeAbFcF87kyqjhNu");
  const [wagerPubkey,] = await PublicKey.findProgramAddress([Buffer.from("wager"), wallet.publicKey.toBuffer()], programId);

  const provider = new anchor.AnchorProvider(
    connection,
    // @ts-ignore
    wallet,
    anchor.AnchorProvider.defaultOptions()
  );
  // @ts-ignore
  const program = new anchor.Program(IDL, programId, provider);
  console.log(`wager ${wagerPubkey}; wallet ${wallet.publicKey}`);
  // await program.methods.initialize()
  // .accounts(
  //   {
  //     wager: wagerPubkey,
  //     user: wallet.publicKey,
  //     systemProgram: SystemProgram.programId,
  //   }
  // )
  // .signers(
  //   [wallet.payer]
  // )
  // .rpc();

  const transferTransaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: wagerPubkey,
      lamports: 1000000000,
    })
  );
  let blockhash = await connection.getRecentBlockhash("finalized");
  transferTransaction.recentBlockhash = blockhash.blockhash;
  transferTransaction.feePayer = wallet.publicKey;
  const tx = await wallet.signTransaction(transferTransaction);
  await sendAndConfirmTransaction(connection, tx, [wallet.payer]);
}

main().then(
  () => process.exit(),
  err => {
    console.error(err);
    process.exit(-1);
  },
);