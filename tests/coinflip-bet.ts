import * as anchor from "@project-serum/anchor";
import { Keypair, PublicKey } from '@solana/web3.js';
import * as assert from "assert";
const { SystemProgram } = anchor.web3;

require('dotenv').config();
const MANAGER = process.env.MANAGER ?? '';

describe("coinflip-bet", () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);

  it("Creates and initializes an account in a single atomic transaction (simplified)", async () => {
    const program = anchor.workspace.CoinflipBet;
    const managerKeys = Keypair.fromSecretKey(new Uint8Array(JSON.parse(MANAGER)));

    const [systemAccount,] = await PublicKey.findProgramAddress(
      [Buffer.from("system-account"), managerKeys.publicKey.toBuffer()],
      program.programId
    );
    await program.rpc.initSystem({
      accounts: {
        systemAccount,
        manager: managerKeys.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [managerKeys],
    });
    // const account = await program.account.flipResult.fetch(flipResult.publicKey);
    // assert.ok(account.roll.eq(new anchor.BN(1234)));
    // _flipResult = flipResult;
  });

  it("Updates a previously created account", async () => {
  //   const flipResult = _flipResult;
  //   const program = anchor.workspace.CoinflipBet;
  //   await program.rpc.update({
  //     accounts: {
  //       flipResult: flipResult.publicKey,
  //     },
  //   });
  //   const account = await program.account.flipResult.fetch(flipResult.publicKey);
  //   console.log("account data");
  //   console.log(account.roll);
  //   console.log(account.won);
  });
});