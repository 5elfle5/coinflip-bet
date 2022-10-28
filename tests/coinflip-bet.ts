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
    // const program = workspace.CoinflipBet;
    const userKeys = Keypair.generate();
    const managerKeys = Keypair.fromSecretKey(new Uint8Array(JSON.parse(MANAGER)));
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
    // await program.rpc.initSystem({
    //   accounts: {
    //     systemAccount,
    //     manager: managerKeys.publicKey,
    //     systemProgram: SystemProgram.programId,
    //   },
    //   signers: [managerKeys],
    // });
    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: managerKeys.publicKey,
        toPubkey: systemAccount,
        lamports: 100000,
      }),
      // SystemProgram.transfer({
      //   fromPubkey: managerKeys.publicKey,
      //   toPubkey: userKeys.publicKey,
      //   lamports: 100000,
      // }),
    );
    let connection = new Connection('http://127.0.0.1:8899');
    await sendAndConfirmTransaction(connection, tx, [managerKeys]);

    // const [wager,] = await PublicKey.findProgramAddress(
    //   [Buffer.from('wager'), userKeys.publicKey.toBuffer()],
    //   program.programId,
    // );
    // const betArgs = {
    //   side: 'heads',
    //   lamports: new BN(1000),
    // }
    // await program.rpc.bet(betArgs, {
    //   accounts: {
    //     wager,
    //     user: userKeys.publicKey,
    //     systemAccount,
    //     systemProgram: SystemProgram.programId,
    //   },
    //   signers: [userKeys]
    // });

    // const flipResult = _flipResult;
    // const program = workspace.CoinflipBet;
    // await program.rpc.update({
    //   accounts: {
    //     flipResult: flipResult.publicKey,
    //   },
    // });
    // const account = await program.account.flipResult.fetch(flipResult.publicKey);
    // console.log("account data");
    // console.log(account.roll);
    // console.log(account.won);
  });
});
