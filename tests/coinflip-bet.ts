import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { CoinflipBet } from "../target/types/coinflip_bet";

describe("coinflip-bet", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.CoinflipBet as Program<CoinflipBet>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
