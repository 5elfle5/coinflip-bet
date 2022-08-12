import * as anchor from "@project-serum/anchor";
import * as assert from "assert";
const { SystemProgram } = anchor.web3;

let _flipResult;

describe("coinflip-bet", () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);

  it("Creates and initializes an account in a single atomic transaction (simplified)", async () => {
    const program = anchor.workspace.CoinflipBet;
    const flipResult = anchor.web3.Keypair.generate();
    await program.rpc.initialize(new anchor.BN(1234), {
      accounts: {
        flipResult: flipResult.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [flipResult],
    });
    const account = await program.account.flipResult.fetch(flipResult.publicKey);
    assert.ok(account.roll.eq(new anchor.BN(1234)));
    _flipResult = flipResult;
  });

  it("Updates a previously created account", async () => {
    const flipResult = _flipResult;

    // #region update-test

    // The program to execute.
    const program = anchor.workspace.CoinflipBet;

    // Invoke the update rpc.
    await program.rpc.update({
      accounts: {
        flipResult: flipResult.publicKey,
      },
    });

    // Fetch the newly updated account.
    const account = await program.account.flipResult.fetch(flipResult.publicKey);

    console.log("account data");
    console.log(account.roll);
    console.log(account.won);
  });
});