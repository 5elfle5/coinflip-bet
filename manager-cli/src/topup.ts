import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from '@solana/web3.js';
require('dotenv').config();
  
async function main() {
  const connection = new Connection('http://127.0.0.1:8899');
  const wallet = NodeWallet.local();
  const programId = new PublicKey("Ae1cbcDnNocF6yUSzMTr4wsMZDwhkj8sHfnM9ScYASn2");
  const [wagerPubkey,] = await PublicKey.findProgramAddress([Buffer.from("wager"), wallet.publicKey.toBuffer()], programId);
  const transferTransaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: wagerPubkey,
      lamports: 100000000,
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