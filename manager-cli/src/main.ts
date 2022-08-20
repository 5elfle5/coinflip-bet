import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { Connection, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from '@solana/web3.js';
import * as IDL from '../../target/idl/coinflip_bet.json';
import * as anchor from "@project-serum/anchor";
require('dotenv').config();
  
async function main() {
  const connection = new Connection('http://127.0.0.1:8899');
  const wallet = NodeWallet.local();
  const programId = new PublicKey("4SmSWTXY3MXgXW35rRfvfgEpZLASPeAbFcF87kyqjhNu");
  const wagerPubkey = await PublicKey.createWithSeed(wallet.publicKey, "wager", SystemProgram.programId)

  // const space = 9;
  // const rentExemptionAmount = await connection.getMinimumBalanceForRentExemption(space);
  // const createAccountParams = {
  //   fromPubkey: wallet.publicKey,
  //   basePubkey: wallet.publicKey,
  //   seed: "wager",
  //   newAccountPubkey: wagerPubkey,
  //   lamports: rentExemptionAmount,
  //   space,
  //   programId: SystemProgram.programId,
  // }
  // const createAccountTransaction = new Transaction().add(
  //   SystemProgram.createAccountWithSeed(createAccountParams)
  // );
  // let blockhash = await connection.getRecentBlockhash('finalized');
  // createAccountTransaction.recentBlockhash = blockhash.blockhash;
  // createAccountTransaction.feePayer = wallet.publicKey;
  // const tx = await wallet.signTransaction(createAccountTransaction);
  // await sendAndConfirmTransaction(connection, tx, [
  //   wallet.payer
  // ]);

  const provider = new anchor.AnchorProvider(
    connection,
    // @ts-ignore
    wallet,
    anchor.AnchorProvider.defaultOptions()
  );
  // @ts-ignore
  const program = new anchor.Program(IDL, programId, provider);
  console.log(`wager ${wagerPubkey}; wallet ${wallet.publicKey}`);
  await program.methods.initialize()
  .accounts(
    {
      wager: wagerPubkey,
      user: wallet.publicKey,
      systemProgram: SystemProgram.programId,
    }
  )
  .signers(
    [wallet.payer]
  )
  .rpc();
}

main().then(
  () => process.exit(),
  err => {
    console.error(err);
    process.exit(-1);
  },
);